import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import connectDB from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const businessEnvPath = path.resolve(__dirname, '../../.env');
const adminBackendEnvPath = path.resolve(
  __dirname,
  '../../../../Charters-Business-Admin/backend/.env'
);

dotenv.config({ path: businessEnvPath });
// Prefer Admin backend env values when both files define the same key.
dotenv.config({ path: adminBackendEnvPath, override: true });

const normalizeList = (value) => String(value || '')
  .split(',')
  .map((entry) => entry.trim())
  .filter(Boolean);

const parseSeedAdminsFromJson = () => {
  const raw = String(
    process.env.ADMIN_SEED_USERS_JSON ||
    process.env.CHARTERS_ADMIN_SEED_USERS_JSON ||
    ''
  ).trim();

  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((entry, index) => ({
        name: String(entry?.name || `Admin ${index + 1}`).trim(),
        email: String(entry?.email || '').trim(),
        password: String(entry?.password || '').trim(),
      }))
      .filter((entry) => entry.email);
  } catch {
    throw new Error('Invalid ADMIN_SEED_USERS_JSON / CHARTERS_ADMIN_SEED_USERS_JSON');
  }
};

const parseSeedAdminsFromCsv = () => {
  const emails = normalizeList(process.env.ADMIN_EMAILS);
  const passwords = normalizeList(process.env.ADMIN_PASSWORDS);
  const names = normalizeList(process.env.ADMIN_NAMES);

  if (emails.length === 0) return [];

  return emails.map((email, index) => ({
    name: names[index] || `Admin ${index + 1}`,
    email,
    password: passwords[index] || '',
  }));
};

const parseSeedAdminsFromSingle = () => {
  const email = String(process.env.ADMIN_EMAIL || '').trim();
  if (!email) return [];

  return [
    {
      name: String(process.env.ADMIN_NAME || 'Admin User').trim(),
      email,
      password: String(process.env.ADMIN_PASSWORD || '').trim(),
    },
  ];
};

const getSeedAdmins = () => {
  const fromJson = parseSeedAdminsFromJson();
  if (fromJson.length > 0) return fromJson;

  const fromCsv = parseSeedAdminsFromCsv();
  if (fromCsv.length > 0) return fromCsv;

  return parseSeedAdminsFromSingle();
};

const createOrPromoteAdmin = async (seed) => {
  const email = String(seed.email || '').toLowerCase();
  const name = String(seed.name || 'Admin User').trim() || 'Admin User';
  const password = String(seed.password || '').trim();

  if (!email) {
    throw new Error('Seed admin email is missing');
  }

  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    let changed = false;

    if (existingAdmin.role !== 'admin') {
      existingAdmin.role = 'admin';
      changed = true;
    }

    if (!existingAdmin.isActive) {
      existingAdmin.isActive = true;
      changed = true;
    }

    if (!existingAdmin.name && name) {
      existingAdmin.name = name;
      changed = true;
    }

    if (changed) {
      await existingAdmin.save();
      console.log(`Updated existing user to admin: ${email}`);
    } else {
      console.log(`Admin already active: ${email}`);
    }

    return { action: changed ? 'updated' : 'skipped', email };
  }

  if (!password) {
    throw new Error(`Password missing for new admin ${email}`);
  }

  await User.create({
    name,
    email,
    password,
    role: 'admin',
    isFirstLogin: false,
    isActive: true,
  });

  console.log(`Created new admin: ${email}`);
  return { action: 'created', email };
};

const createAdmins = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();

    const seeds = getSeedAdmins();
    if (seeds.length === 0) {
      throw new Error(
        'No admin seeds found. Set ADMIN_EMAIL/ADMIN_PASSWORD or ADMIN_EMAILS/ADMIN_PASSWORDS or ADMIN_SEED_USERS_JSON.'
      );
    }

    console.log(`Processing ${seeds.length} admin seed(s)...`);
    const summary = { created: 0, updated: 0, skipped: 0 };

    for (const seed of seeds) {
      const result = await createOrPromoteAdmin(seed);
      summary[result.action] += 1;
    }

    console.log('Admin seed completed successfully.');
    console.log(
      `Summary: created=${summary.created}, updated=${summary.updated}, skipped=${summary.skipped}`
    );
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admins:', error.message);
    process.exit(1);
  }
};

createAdmins();
