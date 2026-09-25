'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { calculatePublicationDate } from '@/lib/utils';

interface DevotionalFormProps {
  devotional?: any;
  seriesList: any[];
  isEdit?: boolean;
}

export default function DevotionalForm({ devotional, seriesList, isEdit = false }: DevotionalFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    dayNumber: devotional?.dayNumber || 1,
    title: devotional?.title || '',
    biblePassage: devotional?.biblePassage || '',
    songTitle: devotional?.songTitle || '',
    songArtist: devotional?.songArtist || '',
    content: devotional?.content || '',
    prayer: devotional?.prayer || '',
    declaration: devotional?.declaration || '',
    seriesId: devotional?.seriesId || (seriesList[0]?.id || ''),
    status: devotional?.status || 'draft',
    author: devotional?.author || '',
    tags: devotional?.tags?.join(', ') || '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        dayNumber: Number(formData.dayNumber),
        title: formData.title,
        biblePassage: formData.biblePassage,
        songTitle: formData.songTitle,
        songArtist: formData.songArtist,
        content: formData.content,
        prayer: formData.prayer,
        declaration: formData.declaration,
        seriesId: formData.seriesId,
        status: formData.status,
        author: formData.author,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        updatedAt: new Date(),
      };

      if (isEdit && devotional?.id) {
        await updateDoc(doc(db, 'devotionals', devotional.id), data);
      } else {
        const publicationDate = calculatePublicationDate(
          seriesList.find(s => s.id === data.seriesId)?.startDate || new Date().toISOString().split('T')[0],
          data.dayNumber
        );
        await addDoc(collection(db, 'devotionals'), {
          ...data,
          publicationDate,
          createdAt: new Date(),
        });
      }
      router.push('/admin/devotionals');
      router.refresh();
    } catch (error) {
      console.error('Error saving devotional:', error);
      alert('Failed to save devotional');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Day Number</label>
          <input
            type="number"
            name="dayNumber"
            value={formData.dayNumber}
            onChange={handleChange}
            required
            min="1"
            max="365"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Bible Passage</label>
          <input
            type="text"
            name="biblePassage"
            value={formData.biblePassage}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Song Title</label>
            <input
              type="text"
              name="songTitle"
              value={formData.songTitle}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Song Artist</label>
            <input
              type="text"
              name="songArtist"
              value={formData.songArtist}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={10}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Prayer</label>
        <textarea
          name="prayer"
          value={formData.prayer}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Declaration</label>
        <textarea
          name="declaration"
          value={formData.declaration}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Series</label>
          <select
            name="seriesId"
            value={formData.seriesId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {seriesList.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark disabled:opacity-50"
      >
        {saving ? 'Saving...' : (isEdit ? 'Update Devotional' : 'Create Devotional')}
      </button>
    </form>
  );
}