import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { getTodayString } from '@/lib/utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  if (query.length < 2) {
    return NextResponse.json({ error: 'Query too short' }, { status: 400 });
  }

  const today = getTodayString();
  const snapshot = await adminDb
    .collection('devotionals')
    .where('publicationDate', '<=', today)
    .get();

  const results = snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((dev: any) =>
      dev.title?.toLowerCase().includes(query) ||
      dev.biblePassage?.toLowerCase().includes(query) ||
      dev.songTitle?.toLowerCase().includes(query) ||
      dev.songArtist?.toLowerCase().includes(query) ||
      dev.author?.toLowerCase().includes(query) ||
      dev.dayNumber?.toString() === query
    );

  return NextResponse.json({ results });
}