import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { google } from "googleapis";
import User from "../models/User.model.js";
import {
  backendRoot,
  resolveFromBackendRoot,
} from "../config/loadEnv.js";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SERVICE_ACCOUNT_SOURCE = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
const MONGO_URI = process.env.MONGODB_URI;
const SHEET_TITLE = process.env.GOOGLE_SHEET_TITLE || "cookie_import";
const SHEET_RANGE = `${SHEET_TITLE}!A:ZZ`;
const parsedExportIntervalMinutes = Number.parseInt(
  process.env.SHEET_EXPORT_INTERVAL_MINUTES || "10",
  10
);
const EXPORT_INTERVAL_MINUTES =
  Number.isFinite(parsedExportIntervalMinutes) &&
  parsedExportIntervalMinutes > 0
    ? parsedExportIntervalMinutes
    : 10;
const EXPORT_INTERVAL_MS = EXPORT_INTERVAL_MINUTES * 60 * 1000;

let sheets = null;
let isRunning = false;
let intervalHandle = null;
let mongoConnectionOwned = false;
let exporterStarted = false;

function tryParseServiceAccount(source) {
  if (!source) {
    return null;
  }

  const trimmed = source.trim();

  if (!trimmed.startsWith("{")) {
    return null;
  }

  try {
    const parsed = JSON.parse(trimmed);

    return {
      ...parsed,
      private_key: parsed.private_key?.replace(/\\n/g, "\n"),
    };
  } catch {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_JSON must be a valid JSON string or a path to a JSON file.",
    );
  }
}

function getServiceAccountFilePath() {
  if (!SERVICE_ACCOUNT_SOURCE) {
    return null;
  }

  return resolveFromBackendRoot(SERVICE_ACCOUNT_SOURCE);
}

function getGoogleAuthOptions() {
  const credentials = tryParseServiceAccount(SERVICE_ACCOUNT_SOURCE);

  if (credentials) {
    return {
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    };
  }

  return {
    keyFile: getServiceAccountFilePath(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  };
}

function getMissingConfig() {
  const missing = [];

  if (!SHEET_ID) {
    missing.push("GOOGLE_SHEET_ID");
  }

  if (!SERVICE_ACCOUNT_SOURCE) {
    missing.push("GOOGLE_SERVICE_ACCOUNT_JSON");
  }

  if (!MONGO_URI) {
    missing.push("MONGODB_URI");
  }

  return missing;
}

function validateConfig() {
  const missing = getMissingConfig();

  if (missing.length) {
    throw new Error(`Missing ${missing.join(", ")}`);
  }

  if (tryParseServiceAccount(SERVICE_ACCOUNT_SOURCE)) {
    return;
  }

  const keyPath = getServiceAccountFilePath();

  if (!keyPath || !fs.existsSync(keyPath)) {
    throw new Error(
      `Google service account file not found at ${keyPath}. ` +
        `Set GOOGLE_SERVICE_ACCOUNT_JSON to raw JSON or to a file path relative to ${backendRoot}.`
    );
  }
}

function toISO(value) {
  if (!value) return "";

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function toDisplayText(value, fallback = "N/A") {
  if (value === null || value === undefined) {
    return fallback;
  }

  const text = String(value).trim();
  return text ? text : fallback;
}

function toDisplayDate(value) {
  const iso = toISO(value);
  if (!iso) {
    return "N/A";
  }

  const date = new Date(iso);
  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

function getProfileStatus(user) {
  const hasName = Boolean(user.name?.trim());
  const hasEmail = Boolean(user.email?.trim());
  const hasPhone = Boolean(user.phoneNumber?.trim());

  if (hasName && hasEmail && hasPhone) {
    return "Complete";
  }

  if (hasName || hasEmail || hasPhone) {
    return "Partial";
  }

  return "Missing";
}

function getTrackingStatus(user) {
  const visits = user.viewerMetrics?.visitCount ?? 0;
  const pages = user.viewerMetrics?.pagesNavigated ?? 0;
  const chats = user.viewerMetrics?.chatInteractions ?? 0;
  const score = typeof user.viewerScore === "number" ? user.viewerScore : 0;

  if (visits > 0 || pages > 0 || chats > 0 || score > 0) {
    return "Tracked";
  }

  return "No analytics yet";
}

function getEngagementBand(score) {
  if (typeof score !== "number" || score <= 0) {
    return "N/A";
  }

  if (score >= 75) {
    return "High";
  }

  if (score >= 35) {
    return "Medium";
  }

  return "Low";
}

function toDisplayNumber(value, fallback = "N/A") {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function normalizeStringList(values) {
  if (!Array.isArray(values)) {
    return [];
  }

  return Array.from(
    new Set(
      values
        .filter((value) => typeof value === "string")
        .map((value) => value.trim())
        .filter(Boolean)
    )
  );
}

function toTitleCase(value) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function derivePageTitleFromPath(pathname) {
  if (typeof pathname !== "string") {
    return "";
  }

  const normalizedPath = pathname.split("#")[0].split("?")[0].trim();

  if (!normalizedPath || normalizedPath === "/") {
    return "Home";
  }

  return normalizedPath
    .split("/")
    .filter(Boolean)
    .map((segment) =>
      toTitleCase(segment.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim())
    )
    .filter(Boolean)
    .join(" / ");
}

function getUniquePageTitles(user) {
  const explicitTitles = normalizeStringList(user.viewerMetrics?.uniquePageTitles);

  if (explicitTitles.length) {
    return explicitTitles.join(", ");
  }

  const derivedTitles = normalizeStringList(
    user.viewerMetrics?.uniquePagePaths
  ).map(derivePageTitleFromPath);

  return derivedTitles.length ? derivedTitles.join(", ") : "N/A";
}

async function ensureMongoConnection() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  console.log("Connecting to Mongo...");
  await mongoose.connect(MONGO_URI);
  mongoConnectionOwned = true;
  console.log("Mongo connected");
}

async function initSheetsClient() {
  if (sheets) {
    return;
  }

  console.log("Initializing Google Sheets client...");

  const auth = new google.auth.GoogleAuth(getGoogleAuthOptions());

  const authClient = await auth.getClient();

  sheets = google.sheets({
    version: "v4",
    auth: authClient,
  });

  console.log("Google Sheets client ready");
}

async function ensureSheetExists() {
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: SHEET_ID,
  });

  const existingSheet = spreadsheet.data.sheets?.find(
    (sheet) => sheet.properties?.title === SHEET_TITLE
  );
  const existingSheetId = existingSheet?.properties?.sheetId;

  if (existingSheetId !== undefined) {
    return existingSheetId;
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: {
      requests: [
        {
          addSheet: {
            properties: {
              title: SHEET_TITLE,
            },
          },
        },
      ],
    },
  });

  const refreshedSpreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: SHEET_ID,
  });

  const createdSheet = refreshedSpreadsheet.data.sheets?.find(
    (sheet) => sheet.properties?.title === SHEET_TITLE
  );
  const createdSheetId = createdSheet?.properties?.sheetId;

  if (createdSheetId === undefined) {
    throw new Error(`Unable to create or find sheet "${SHEET_TITLE}".`);
  }

  return createdSheetId;
}

async function formatSheet(header, sheetId) {
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: {
      requests: [
        {
          updateSheetProperties: {
            properties: {
              sheetId,
              gridProperties: {
                frozenRowCount: 1,
              },
            },
            fields: "gridProperties.frozenRowCount",
          },
        },
        {
          repeatCell: {
            range: {
              sheetId,
              startRowIndex: 0,
              endRowIndex: 1,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: {
                  red: 0.07,
                  green: 0.2,
                  blue: 0.29,
                },
                textFormat: {
                  bold: true,
                  foregroundColor: {
                    red: 1,
                    green: 1,
                    blue: 1,
                  },
                },
              },
            },
            fields:
              "userEnteredFormat(backgroundColor,textFormat.foregroundColor,textFormat.bold)",
          },
        },
        {
          autoResizeDimensions: {
            dimensions: {
              sheetId,
              dimension: "COLUMNS",
              startIndex: 0,
              endIndex: header.length,
            },
          },
        },
      ],
    },
  });
}

async function exportUsers() {
  if (isRunning) {
    console.log("Previous export still running - skipping this cycle.");
    return;
  }

  isRunning = true;

  try {
    console.log(`Starting export to "${SHEET_TITLE}"...`);

    const users = await User.find(
      {},
      {
        name: 1,
        email: 1,
        role: 1,
        phoneNumber: 1,
        courseInterestedIn: 1,
        lastLogin: 1,
        viewerScore: 1,
        "viewerMetrics.visitCount": 1,
        "viewerMetrics.pagesNavigated": 1,
        "viewerMetrics.uniquePagePaths": 1,
        "viewerMetrics.uniquePageTitles": 1,
        "viewerMetrics.chatInteractions": 1,
        "viewerMetrics.chatInteractions": 1,
        updatedAt: 1,
        createdAt: 1,
      }
    )
      .sort({ createdAt: -1, name: 1 })
      .lean();

    console.log("Users found:", users.length);

    const header = [
      "User ID",
      "Name",
      "Email",
      "Phone Number",
      "Course Interested In",
      "Role",
      "Profile Status",
      "Signed Up On",
      "Last Login",
      "Website Score",
      "Engagement Band",
      "Unique Page (list title of page)",
      "Chat Interaction",
    ];

    const rows = users.map((user) => {
      const score =
        typeof user.viewerScore === "number" ? user.viewerScore : 0;

      return [
        String(user._id || ""),
        toDisplayText(user.name),
        toDisplayText(user.email),
        toDisplayText(user.phoneNumber),
        toDisplayText(user.courseInterestedIn),
        toDisplayText(user.role),
        getProfileStatus(user),
        toDisplayDate(user.createdAt),
        toDisplayDate(user.lastLogin),
        toDisplayNumber(score),
        getEngagementBand(score),
        getUniquePageTitles(user),
        user.viewerMetrics?.chatInteractions ?? 0,
      ];
    });

    const sheetId = await ensureSheetExists();

    await sheets.spreadsheets.values.clear({
      spreadsheetId: SHEET_ID,
      range: SHEET_RANGE,
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_TITLE}!A1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [header, ...rows],
      },
    });

    await formatSheet(header, sheetId);

    console.log(
      `Exported ${rows.length} users to Google Sheet at ${new Date().toLocaleTimeString()}`
    );
  } catch (error) {
    console.error("Export failed:", error.message);
  } finally {
    isRunning = false;
  }
}

export async function startUserSheetExporter(options = {}) {
  const { runContinuously = true } = options;

  if (exporterStarted) {
    console.log("Google Sheets exporter already running.");
    return;
  }

  validateConfig();
  await ensureMongoConnection();
  await initSheetsClient();

  exporterStarted = true;

  await exportUsers();

  if (!runContinuously) {
    console.log("One-time Google Sheets export completed.");
    return;
  }

  intervalHandle = setInterval(() => {
    void exportUsers();
  }, EXPORT_INTERVAL_MS);

  console.log(
    `Scheduler started - exporting every ${EXPORT_INTERVAL_MINUTES} minutes.`
  );
}

export async function stopUserSheetExporter() {
  if (intervalHandle) {
    clearInterval(intervalHandle);
    intervalHandle = null;
  }

  exporterStarted = false;
  sheets = null;

  if (mongoConnectionOwned && mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
    mongoConnectionOwned = false;
  }
}

const currentFilePath = fileURLToPath(import.meta.url);
const isDirectRun =
  Boolean(process.argv[1]) && path.resolve(process.argv[1]) === currentFilePath;

if (isDirectRun) {
  const runOnce = process.argv.includes("--once");

  startUserSheetExporter({ runContinuously: !runOnce })
    .then(async () => {
      if (runOnce) {
        await stopUserSheetExporter();
        process.exit(0);
      }
    })
    .catch((error) => {
      console.error("Failed to start Google Sheets exporter:", error.message);
      process.exit(1);
    });

  process.on("SIGINT", () => {
    console.log("Shutting down...");

    void stopUserSheetExporter()
      .catch((error) => {
        console.error("Failed to stop Google Sheets exporter:", error.message);
      })
      .finally(() => {
        process.exit(0);
      });
  });
}
