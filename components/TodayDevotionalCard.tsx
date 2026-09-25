import Link from 'next/link';
import { getTodayString } from '@/lib/utils';
import { adminDb } from '@/lib/firebaseAdmin';

interface Devotional {
  id: string;
  dayNumber: number;
  title: string;
  biblePassage: string;
  songTitle: string;
  songArtist: string;
  publicationDate: string;
  status: string;
}

export default async function TodayDevotionalCard() {
  const today = getTodayString();
  const snapshot = await adminDb
    .collection('devotionals')
    .where('publicationDate', '==', today)
    .where('status', 'in', ['published', 'scheduled'])
    .limit(1)
    .get();

  if (snapshot.empty) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No Devotional Available Today
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please check back later or explore previous devotionals.
          </p>
        </div>
      </div>
    );
  }

  const doc = snapshot.docs[0];
  const devotional = {
    id: doc.id,
    ...(doc.data() as Devotional),
  };

  return (
    <section className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary-dark p-6">
          <h2 className="text-2xl font-bold text-white">Today's Devotional</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="text-sm text-gray-500">
            Day {devotional.dayNumber} • {formatDateForDisplay(devotional.publicationDate)}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {devotional.title}
          </h3>
          <div className="text-gray-600 dark:text-gray-300">
            <div>📖 {devotional.biblePassage}</div>
            <div>🎵 {devotional.songTitle} - {devotional.songArtist}</div>
          </div>
          <Link
            href={`/devotional/${devotional.id}`}
            className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
          >
            Read Devotional →
          </Link>
        </div>
      </div>
    </section>
  );
}

function formatDateForDisplay(dateString: string) {
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}