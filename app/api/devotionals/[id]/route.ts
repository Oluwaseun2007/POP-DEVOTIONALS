import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { isDevotionalAvailable } from '@/lib/utils';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const docRef = adminDb.collection('devotionals').doc(params.id);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // Cast to any to avoid TypeScript property errors
  const data = docSnap.data() as any;
  const devotional = { id: docSnap.id, ...data };

  if (!isDevotionalAvailable(devotional.publicationDate, devotional.status)) {
    return NextResponse.json({ error: 'Not available yet' }, { status: 403 });
  }

  return NextResponse.json({ devotional });
}