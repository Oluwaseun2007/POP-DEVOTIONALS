import { adminDb } from './firebaseAdmin';
import { getTodayString } from './utils';

export async function autoPublishDueDevotionals() {
  const today = getTodayString();
  const snapshot = await adminDb
    .collection('devotionals')
    .where('status', '==', 'scheduled')
    .where('publicationDate', '<=', today)
    .get();

  const batch = adminDb.batch();
  let count = 0;

  snapshot.docs.forEach((doc) => {
    batch.update(doc.ref, {
      status: 'published',
      publishedAt: new Date(),
      updatedAt: new Date(),
    });
    count++;
  });

  if (count > 0) {
    await batch.commit();
    console.log(`Auto-published ${count} devotionals`);
  }

  return count;
}