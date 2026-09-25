'use client';

import { useState } from 'react';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';

export default function MediaPage() {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage('');
    try {
      const storageRef = ref(storage, `media/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFiles(prev => [...prev, url]);
      setMessage('Upload successful!');
    } catch (error) {
      setMessage('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const listFiles = async () => {
    const listRef = ref(storage, 'media');
    const res = await listAll(listRef);
    const urls = await Promise.all(res.items.map(item => getDownloadURL(item)));
    setFiles(urls);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Media Library</h1>
      <div className="mb-6">
        <input type="file" onChange={handleUpload} disabled={uploading} className="mb-2" />
        {uploading && <p>Uploading...</p>}
        {message && <p className="text-sm text-gray-500">{message}</p>}
      </div>
      <button onClick={listFiles} className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg mb-4">Refresh List</button>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {files.map((url, i) => (
          <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <img src={url} alt={`Media ${i}`} className="w-full h-32 object-cover" />
            <div className="p-2 text-xs break-all">{url.substring(url.lastIndexOf('/') + 1)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}