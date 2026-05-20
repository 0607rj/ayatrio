
if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = "B71C6CA9-5989-4F8A-8834-D5027CD271F2";
}

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase (prevent duplicate initialization in dev mode)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

/**
 * In LOCAL DEVELOPMENT, Firebase's reCAPTCHA token gets rejected with
 * auth/invalid-app-credential when the Google Cloud API key has HTTP referrer
 * restrictions that exclude localhost.
 *
 * Setting appVerificationDisabledForTesting = true tells Firebase to skip
 * reCAPTCHA verification entirely on this client.
 *
 * ⚠️  REQUIREMENT: You MUST use a Firebase test phone number when this is enabled.
 *     Add one at: Firebase Console → Authentication → Sign-in method → Phone numbers for testing
 *     Example: Phone +919999999999 / Code 123456
 *
 * This flag is only set when hostname is localhost — production is unaffected.
 */
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  auth.settings.appVerificationDisabledForTesting = true;
  console.log('[Firebase] ⚠️  appVerificationDisabledForTesting = true (localhost dev mode). Use a Firebase test phone number.');
}


/**
 * Creates an invisible reCAPTCHA verifier.
 *
 * IMPORTANT: The container div is created dynamically on document.body,
 * OUTSIDE React's component tree. This prevents the reCAPTCHA script
 * from losing its DOM reference when React Strict Mode unmounts/remounts
 * components (which causes "Cannot read properties of null (reading 'style')").
 */
export function setupRecaptcha(containerId: string = 'firebase-recaptcha-root'): RecaptchaVerifier {
  console.log('[Firebase setupRecaptcha] Setting up RecaptchaVerifier...');

  // Remove any previously appended container with this ID to avoid duplicates
  const existing = document.getElementById(containerId);
  if (existing) {
    console.log('[Firebase setupRecaptcha] Removing stale container from body.');
    existing.remove();
  }

  // Create a fresh container appended to document.body — OUTSIDE React's virtual DOM.
  // React cannot destroy or touch this element during re-renders or Strict Mode remounts.
  const container = document.createElement('div');
  container.id = containerId;
  container.style.position = 'absolute';
  container.style.bottom = '0';
  container.style.right = '0';
  document.body.appendChild(container);
  console.log('[Firebase setupRecaptcha] Container appended to document.body, ID:', containerId);

  try {
    // Pass the actual DOM element directly (not the ID string) for maximum reliability
    const verifier = new RecaptchaVerifier(auth, container, {
      size: 'invisible',
      callback: () => {
        console.log('[Firebase setupRecaptcha] reCAPTCHA solved successfully.');
      },
      'expired-callback': () => {
        console.warn('[Firebase setupRecaptcha] reCAPTCHA token expired.');
      },
    });
    console.log('[Firebase setupRecaptcha] RecaptchaVerifier created successfully.');
    return verifier;
  } catch (error) {
    console.error('[Firebase setupRecaptcha] Error creating RecaptchaVerifier:', error);
    container.remove(); // clean up if creation fails
    throw error;
  }
}

export default app;