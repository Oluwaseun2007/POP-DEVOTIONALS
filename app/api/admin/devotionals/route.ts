import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebaseAdmin';
import { calculatePublicationDate } from '@/lib/utils';

export async function POST(request: Request) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const adminDoc = await adminDb.collection('admins').doc(decoded.uid).get();
    if (!adminDoc.exists) return NextResponse.json({ error: 'Not admin' }, { status: 403 });

    const data = await request.json();
    // Basic validation
    if (!data.dayNumber || !data.title || !data.biblePassage || !data.content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Determine publication date
    let publicationDate = data.publicationDate;
    if (!publicationDate && data.seriesId && data.dayNumber) {
      const seriesDoc = await adminDb.collection('series').doc(data.seriesId).get();
      if (seriesDoc.exists) {
        publicationDate = calculatePublicationDate(seriesDoc.data()?.startDate, data.dayNumber);
      }
    }

    const docRef = adminDb.collection('devotionals').doc();
    await docRef.set({
      ...data,
      publicationDate,
      status: data.status || 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}