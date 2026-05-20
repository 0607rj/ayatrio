import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

let firebaseAdmin;

try {
  // Check if we have service account info in env
  // We expect either a JSON string of the service account or individual fields
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      };

  if (
    serviceAccount.projectId &&
    serviceAccount.clientEmail &&
    serviceAccount.privateKey
  ) {
    if (!admin.apps.length) {
      firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log("✅ Firebase Admin initialized successfully");
    } else {
      firebaseAdmin = admin.app();
    }
  } else {
    console.warn(
      "⚠️ Firebase Admin service account info missing. OTP verification will fail.",
    );
  }
} catch (error) {
  console.error("❌ Firebase Admin initialization error:", error);
}

export default admin;