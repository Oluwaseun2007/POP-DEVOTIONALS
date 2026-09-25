import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { getTodayString } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET() {
  const today = getTodayString();
  const snapshot = await adminDb
    .collection('devotionals')
    .where('publicationDate', '==', today)
    .where('status', 'in', ['published', 'scheduled'])
    .limit(1)
    .get();

  if (snapshot.empty) {
    return NextResponse.json({ error: 'No devotional today' }, { status: 404 });
  }

  const devotional = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  return NextResponse.json({ devotional });
}