import Link from 'next/link';
import { adminDb } from '@/lib/firebaseAdmin';
import { getTodayString } from '@/lib/utils';

export default async function ArchivePage() {
  const today = getTodayString();
  const snapshot = await adminDb
    .collection('devotionals')
    .orderBy('dayNumber', 'asc')
    .get();

  const devotionals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 font-serif">Devotional Archive</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devotionals.map((dev: any) => {
          const locked = dev.publicationDate > today;
          return (
            <div key={dev.id} className={`bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 ${locked ? 'opacity-60' : 'hover:shadow-md transition-shadow'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-primary">Day {dev.dayNumber}</span>
                {locked ? <span>🔒</span> : <span>📖</span>}
              </div>
              <h3 className="font-bold text-lg mb-2">{dev.title}</h3>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                <div>📖 {dev.biblePassage}</div>
                <div>🎵 {dev.songTitle}</div>
              </div>
              {locked ? (
                <div className="text-sm text-gray-500">Available on {dev.publicationDate}</div>
              ) : (
                <Link href={`/devotional/${dev.id}`} className="text-primary font-medium text-sm">
                  Read →
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}