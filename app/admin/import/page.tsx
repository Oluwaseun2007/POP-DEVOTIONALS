'use client';

import { useEffect, useState } from 'react';
import BulkImport from '@/components/BulkImport';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function BulkImportPage() {
  const [seriesList, setSeriesList] = useState<any[]>([]);
  const [selectedSeriesId, setSelectedSeriesId] = useState('');

  useEffect(() => {
    const fetchSeries = async () => {
      const snapshot = await getDocs(collection(db, 'series'));
      const series = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) }));
      setSeriesList(series);
      if (series.length > 0) setSelectedSeriesId(series[0].id);
    };
    fetchSeries();
  }, []);

  const selectedSeries = seriesList.find((s) => s.id === selectedSeriesId);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Bulk Import Devotionals</h1>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Series</label>
        <select
          value={selectedSeriesId}
          onChange={(e) => setSelectedSeriesId(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
        >
          {seriesList.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      {selectedSeries && (
        <BulkImport seriesId={selectedSeries.id} seriesStartDate={selectedSeries.startDate} />
      )}
    </div>
  );
}