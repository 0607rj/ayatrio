const path = require("node:path");
const { pathToFileURL } = require("node:url");

const backendEntryUrl = pathToFileURL(
  path.join(__dirname, "backend", "server.js")
).href;

import(backendEntryUrl).catch((error) => {
  console.error("Failed to start backend/server.js from the project root.");
  console.error(error);
  process.exit(1);
});
