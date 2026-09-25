import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { getTodayString } from '@/lib/utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '30');
  const today = getTodayString();

  const snapshot = await adminDb
    .collection('devotionals')
    .where('publicationDate', '<=', today)
    .orderBy('publicationDate', 'asc')
    .offset((page - 1) * limit)
    .limit(limit)
    .get();

  const devotionals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json({ devotionals, page });
}