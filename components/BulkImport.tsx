'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { calculatePublicationDate } from '@/lib/utils';

export default function BulkImport({ seriesId, seriesStartDate }: { seriesId: string; seriesStartDate: string }) {
  const [fileContent, setFileContent] = useState('');
  const [format, setFormat] = useState<'json' | 'csv'>('json');
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ success: number; failed: number; errors: string[] } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    setImporting(true);
    setResult(null);
    try {
      let devotionals: any[] = [];
      if (format === 'json') {
        const parsed = JSON.parse(fileContent);
        devotionals = parsed.devotionals || parsed;
      } else {
        // Simple CSV parsing (assuming header row)
        const lines = fileContent.split('\n').filter(l => l.trim());
        if (lines.length < 2) throw new Error('CSV must have a header and at least one row');
        const headers = lines[0].split(',').map(h => h.trim());
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim());
          const obj: any = {};
          headers.forEach((h, idx) => {
            obj[h] = values[idx];
          });
          devotionals.push(obj);
        }
      }

      const errors: string[] = [];
      let success = 0;
      let failed = 0;

      for (const dev of devotionals) {
        try {
          const dayNumber = Number(dev.dayNumber || dev.Day || dev.day);
          const title = dev.title || dev.Title || dev.topic;
          const biblePassage = dev.biblePassage || dev['Bible Passage'] || '';
          const songTitle = dev.songTitle || dev['Song Title'] || '';
          const songArtist = dev.songArtist || dev['Song Artist'] || '';
          const content = Array.isArray(dev.content) ? dev.content.join('\n\n') : (dev.content || '');
          const prayer = dev.prayer || '';
          const declaration = dev.declaration || '';
          const author = dev.author || dev.Author || '';
          const tags = dev.tags || [];

          if (!dayNumber || !title || !biblePassage) {
            failed++;
            errors.push(`Missing required fields for item ${success + failed + 1}`);
            continue;
          }

          const publicationDate = calculatePublicationDate(seriesStartDate, dayNumber);
          await addDoc(collection(db, 'devotionals'), {
            dayNumber,
            title,
            biblePassage,
            songTitle,
            songArtist,
            content,
            prayer,
            declaration,
            seriesId,
            publicationDate,
            status: 'scheduled',
            author,
            tags: Array.isArray(tags) ? tags : tags.split(',').map((t: string) => t.trim()).filter(Boolean),
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          success++;
        } catch (err) {
          failed++;
          errors.push(`Error on item ${success + failed + 1}: ${err.message}`);
        }
      }

      setResult({ success, failed, errors });
    } catch (error) {
      setResult({ success: 0, failed: 1, errors: [(error as Error).message] });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Format</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as 'json' | 'csv')}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="json">JSON</option>
          <option value="csv">CSV</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Upload File</label>
        <input
          type="file"
          accept={format === 'json' ? '.json' : '.csv'}
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
        />
      </div>

      <button
        onClick={handleImport}
        disabled={!fileContent || importing}
        className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark disabled:opacity-50"
      >
        {importing ? 'Importing...' : 'Import Devotionals'}
      </button>

      {result && (
        <div className={`p-4 rounded-lg ${result.failed === 0 ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
          <p>Successfully imported {result.success} devotionals. {result.failed} failed.</p>
          {result.errors.length > 0 && (
            <ul className="mt-2 list-disc pl-5">
              {result.errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}