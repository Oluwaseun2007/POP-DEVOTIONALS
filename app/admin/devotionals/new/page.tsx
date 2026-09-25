'use client';

import { useEffect, useState } from 'react';
import DevotionalForm from '@/components/DevotionalForm';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function NewDevotionalPage() {
  const [seriesList, setSeriesList] = useState<any[]>([]);

  useEffect(() => {
    const fetchSeries = async () => {
      const snapshot = await getDocs(collection(db, 'series'));
      setSeriesList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchSeries();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create New Devotional</h1>
      {seriesList.length > 0 ? (
        <DevotionalForm seriesList={seriesList} />
      ) : (
        <p>Loading series...</p>
      )}
    </div>
  );
}