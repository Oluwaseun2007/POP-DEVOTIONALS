import { redirect } from 'next/navigation';
import { getTodayString } from '@/lib/utils';
import { adminDb } from '@/lib/firebaseAdmin';

export default async function TodayPage() {
  const today = getTodayString();
  const snapshot = await adminDb
    .collection('devotionals')
    .where('publicationDate', '==', today)
    .where('status', 'in', ['published', 'scheduled'])
    .limit(1)
    .get();

  if (snapshot.empty) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">No devotional for today yet.</h1>
        <p>Please check back later.</p>
      </div>
    );
  }
  const devotionalId = snapshot.docs[0].id;
  redirect(`/devotional/${devotionalId}`);
}