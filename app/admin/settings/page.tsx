'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>({
    organizationName: 'Place of Pentecost',
    tagline: 'Devotional Guide',
    theme: {
      name: 'Our Year of the Wind of the Spirit (RUACH ELOHIM)',
      scripture: 'Acts 2:2-4',
      year: 2026,
    },
    contactEmail: 'contact@placeofpentecost.org',
    socialLinks: {},
    aboutText: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const snap = await getDoc(doc(db, 'settings', 'general'));
      if (snap.exists()) {
        setSettings(snap.data());
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings((prev: any) => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
    } else {
      setSettings((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await setDoc(doc(db, 'settings', 'general'), settings, { merge: true });
    setSaving(false);
    alert('Settings saved');
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-2">Organization Name</label>
          <input type="text" name="organizationName" value={settings.organizationName} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tagline</label>
          <input type="text" name="tagline" value={settings.tagline} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Theme Name</label>
          <input type="text" name="theme.name" value={settings.theme.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Theme Scripture</label>
          <input type="text" name="theme.scripture" value={settings.theme.scripture} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Contact Email</label>
          <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">About Text</label>
          <textarea name="aboutText" value={settings.aboutText} onChange={handleChange} rows={4} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800" />
        </div>
        <button onClick={handleSave} disabled={saving} className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}