'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { verifyAdmin } from '@/lib/adminAuth';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Skip the auth check on the login page itself
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const admin = await verifyAdmin(currentUser.uid);
        setIsAdmin(admin);
        if (!admin) router.push('/admin/login');
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router, isLoginPage]);

  if (isLoginPage) return <>{children}</>;
  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!user || !isAdmin) return null;

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-gray-100 dark:bg-gray-800 min-h-screen p-4 md:sticky md:top-16 md:self-start">
        <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
        <nav className="space-y-1">
          <Link href="/admin" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Dashboard</Link>
          <Link href="/admin/devotionals" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Devotionals</Link>
          <Link href="/admin/series" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Series</Link>
          <Link href="/admin/import" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Bulk Import</Link>
          <Link href="/admin/media" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Media</Link>
          <Link href="/admin/settings" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Settings</Link>
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}