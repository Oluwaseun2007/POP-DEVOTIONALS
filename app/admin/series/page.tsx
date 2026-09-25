'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

export default function SeriesManagementPage() {
  const [series, setSeries] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('');
  const [themeScripture, setThemeScripture] = useState('');
  const [startDate, setStartDate] = useState('');
  const [totalDays, setTotalDays] = useState(30);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    const snapshot = await getDocs(collection(db, 'series'));
    setSeries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name, theme, themeScripture, startDate, totalDays };
    if (editingId) {
      await updateDoc(doc(db, 'series', editingId), data);
    } else {
      await addDoc(collection(db, 'series'), data);
    }
    setEditingId(null);
    setName('');
    setTheme('');
    setThemeScripture('');
    setStartDate('');
    setTotalDays(30);
    fetchSeries();
  };

  const handleEdit = (s: any) => {
    setEditingId(s.id);
    setName(s.name);
    setTheme(s.theme);
    setThemeScripture(s.themeScripture);
    setStartDate(s.startDate);
    setTotalDays(s.totalDays);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this series?')) {
      await deleteDoc(doc(db, 'series', id));
      fetchSeries();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Series Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Series' : 'Add New Series'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <input type="text" value={theme} onChange={e => setTheme(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Theme Scripture</label>
              <input type="text" value={themeScripture} onChange={e => setThemeScripture(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Days</label>
              <input type="number" value={totalDays} onChange={e => setTotalDays(Number(e.target.value))} min="1" className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800" />
            </div>
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark">
              {editingId ? 'Update' : 'Create'}
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">All Series</h2>
          <div className="space-y-3">
            {series.map(s => (
              <div key={s.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <strong>{s.name}</strong>
                  <p className="text-sm text-gray-500">{s.startDate} - {s.totalDays} days</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(s)} className="text-primary">Edit</button>
                  <button onClick={() => handleDelete(s.id)} className="text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}