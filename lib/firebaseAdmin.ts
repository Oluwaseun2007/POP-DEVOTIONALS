import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

function getServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  }
  // Fallback to separate env vars (optional, but keep for compatibility)
  return {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };
}

const serviceAccount = getServiceAccount();
const app = getApps().length > 0 ? getApps()[0] : initializeApp({
  credential: cert(serviceAccount),
});

const adminDb = getFirestore(app);
const adminAuth = getAuth(app);

export { adminDb, adminAuth };