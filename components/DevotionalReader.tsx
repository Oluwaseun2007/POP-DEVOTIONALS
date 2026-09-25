import Link from 'next/link';
import { formatDateForDisplay } from '@/lib/utils';

export default function DevotionalReader({ devotional }: { devotional: any }) {
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/devotional/${devotional.id}`;
  const shareMessage = `Day ${devotional.dayNumber}: ${devotional.title} - POP Devotional Guide\n\n${shareUrl}`;

  return (
    <article className="max-w-3xl mx-auto">
      <header className="text-center mb-12">
        <div className="text-sm font-medium text-primary mb-4">DAY {devotional.dayNumber}</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
          {devotional.title}
        </h1>
        <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-300 mb-4">
          <div className="flex items-center justify-center gap-2">
            <span>📖</span>
            <span className="font-medium">{devotional.biblePassage}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>🎵</span>
            <span>Song: {devotional.songTitle} - {devotional.songArtist}</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">{formatDateForDisplay(devotional.publicationDate)}</div>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        {devotional.content.split('\n\n').map((para: string, i: number) => (
          <p key={i} className="mb-4">{para}</p>
        ))}
      </div>

      <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">❤️ Prayer</h2>
        <p className="leading-relaxed">{devotional.prayer}</p>
      </section>

      <section className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8 mb-12 border border-primary/20">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">✨ Declaration</h2>
        <p className="font-medium leading-relaxed">{devotional.declaration}</p>
      </section>

      <div className="flex justify-between items-center mb-8">
        <Link href="/archive" className="text-gray-600 dark:text-gray-300 hover:text-primary">
          ← Archive
        </Link>
        <div className="flex gap-3">
          <a href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`} target="_blank" className="text-green-600">WhatsApp</a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" className="text-blue-600">Facebook</a>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`} target="_blank" className="text-blue-400">X</a>
        </div>
      </div>
    </article>
  );
}