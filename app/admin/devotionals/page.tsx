'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link';

interface DevotionalItem {
  id: string;
  dayNumber: number;
  title: string;
  biblePassage: string;
  status: string;
  publicationDate: string;
}

export default function AdminDevotionalsList() {
  const [devotionals, setDevotionals] = useState<DevotionalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'devotionals'));
      const data = snapshot.docs.map((doc) => {
        const d = doc.data() as any;
        return {
          id: doc.id,
          dayNumber: d.dayNumber ?? 0,
          title: d.title ?? '',
          biblePassage: d.biblePassage ?? '',
          status: d.status ?? 'draft',
          publicationDate: d.publicationDate ?? '',
        };
      });
      data.sort((a, b) => a.dayNumber - b.dayNumber);
      setDevotionals(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this devotional?')) {
      await deleteDoc(doc(db, 'devotionals', id));
      setDevotionals((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const filtered = devotionals.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.dayNumber.toString().includes(search)
  );

  if (loading) return <div>Loading devotionals...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Devotionals</h1>
        <Link
          href="/admin/devotionals/new"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          New Devotional
        </Link>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by day or title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-3 text-left">Day</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Bible Passage</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Pub. Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((dev) => (
              <tr key={dev.id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3">{dev.dayNumber}</td>
                <td className="p-3">{dev.title}</td>
                <td className="p-3">{dev.biblePassage}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      dev.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : dev.status === 'scheduled'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {dev.status}
                  </span>
                </td>
                <td className="p-3">{dev.publicationDate}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/devotionals/${dev.id}/edit`}
                      className="text-primary hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(dev.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}