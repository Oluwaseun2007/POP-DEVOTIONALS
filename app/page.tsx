import Link from "next/link";
import TodayDevotionalCard from "@/components/TodayDevotionalCard";

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className="space-y-20">
      <section className="text-center py-24 px-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-8 border border-primary/20">
          <span className="text-xs font-semibold tracking-wide uppercase">
            Our Year of the Wind of the Spirit (RUACH ELOHIM) · Acts 2:2–4
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-3 font-serif">
          POP Devotional Guide
        </h1>

        <p className="text-lg md:text-xl font-medium text-primary mb-6 tracking-wide uppercase">
          30 Days of Intimacy with God
        </p>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          A journey of faith, transformation, and encounter with the Holy
          Spirit. Join us as we seek His face and grow in our understanding
          of His character.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/devotional/today"
            className="bg-primary text-white px-7 py-3 rounded-lg font-medium shadow-sm hover:bg-primary-dark hover:shadow-md transition-all"
          >
            Read Today's Devotional
          </Link>
          <Link
            href="/archive"
            className="px-7 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            View Archive
          </Link>
        </div>
      </section>

      <TodayDevotionalCard />

      <section className="max-w-3xl mx-auto text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 font-serif tracking-tight">
          Built for a Generation That Seeks Him
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto">
          Place of Pentecost (POP) is a community of young believers where
          faith is ignited, lives are transformed, and the world is impacted.
          This devotional guide is one of the ways we help young people grow
          in their walk with God.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center gap-1 mt-6 text-primary font-medium hover:underline underline-offset-4"
        >
          Learn more about POP <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}

