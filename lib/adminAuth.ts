import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

export async function verifyAdmin(uid: string): Promise<boolean> {
  console.log('🔎 verifyAdmin called with UID:', uid);

  try {
    const adminDocRef = doc(db, 'admins', uid);
    const adminDoc = await getDoc(adminDocRef);

    console.log('📄 Admin doc exists?', adminDoc.exists());
    console.log('📄 Admin doc data:', adminDoc.data());

    if (!adminDoc.exists()) {
      console.warn(
        '❌ No document in admins collection with ID:',
        uid,
        '→ You must create an admin doc with EXACTLY this UID.'
      );
      return false;
    }

    const data = adminDoc.data();
    console.log('✅ active field value:', data?.active, typeof data?.active);
    return data?.active === true;
  } catch (error) {
    console.error('⚠️ Error in verifyAdmin:', error);
    return false;
  }
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}