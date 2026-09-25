'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import StatsCard from '@/components/StatsCard';
import { getTodayString } from '@/lib/utils';
import Link from 'next/link';

interface Stats {
  total: number;
  published: number;
  scheduled: number;
  drafts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    published: 0,
    scheduled: 0,
    drafts: 0,
  });
  const [todayDevotional, setTodayDevotional] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'devotionals'));
        const all = snapshot.docs.map((doc) => {
          const data = doc.data() as any;
          return {
            id: doc.id,
            ...data,
          };
        });

        const total = all.length;
        const published = all.filter((d: any) => d.status === 'published').length;
        const scheduled = all.filter((d: any) => d.status === 'scheduled').length;
        const drafts = all.filter((d: any) => d.status === 'draft').length;
        setStats({ total, published, scheduled, drafts });

        const today = getTodayString();
        const todaySnap = await getDocs(
          query(collection(db, 'devotionals'), where('publicationDate', '==', today))
        );
        if (!todaySnap.empty) {
          const doc = todaySnap.docs[0];
          setTodayDevotional({ id: doc.id, ...(doc.data() as any) });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Devotionals" value={stats.total} icon={<span>📖</span>} color="primary" />
        <StatsCard title="Published" value={stats.published} icon={<span>✅</span>} color="green" />
        <StatsCard title="Scheduled" value={stats.scheduled} icon={<span>⏰</span>} color="yellow" />
        <StatsCard title="Drafts" value={stats.drafts} icon={<span>📝</span>} color="gray" />
      </div>

      {!todayDevotional && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 mb-6">
          <strong>Warning:</strong> No devotional scheduled for today. Please create one.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/devotionals/new" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md">
          <h3 className="font-bold mb-2">Create Devotional</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Add a new devotional entry</p>
        </Link>
        <Link href="/admin/import" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md">
          <h3 className="font-bold mb-2">Bulk Import</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Import multiple devotionals</p>
        </Link>
        <Link href="/admin/series" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md">
          <h3 className="font-bold mb-2">Manage Series</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Configure devotional series</p>
        </Link>
      </div>
    </div>
  );
}