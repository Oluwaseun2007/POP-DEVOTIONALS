'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  dayNumber: number;
  title: string;
  biblePassage: string;
  songTitle: string;
  songArtist: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 font-serif">Search</h1>
      <div className="max-w-2xl mx-auto mb-8 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search by topic, passage, song, author..."
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <button
          onClick={handleSearch}
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">Searching...</p>}

      {searched && !loading && results.length === 0 && (
        <p className="text-center text-gray-500">No results found.</p>
      )}

      <div className="space-y-4 max-w-2xl mx-auto">
        {results.map((dev) => (
          <Link
            key={dev.id}
            href={`/devotional/${dev.id}`}
            className="block bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md"
          >
            <div className="font-medium">Day {dev.dayNumber}: {dev.title}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {dev.biblePassage} | {dev.songTitle} - {dev.songArtist}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}