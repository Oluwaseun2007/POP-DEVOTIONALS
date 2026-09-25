import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebaseAdmin';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const adminDoc = await adminDb.collection('admins').doc(decoded.uid).get();
    if (!adminDoc.exists) return NextResponse.json({ error: 'Not admin' }, { status: 403 });

    const data = await request.json();
    await adminDb.collection('devotionals').doc(params.id).update({
      ...data,
      updatedAt: new Date(),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const adminDoc = await adminDb.collection('admins').doc(decoded.uid).get();
    if (!adminDoc.exists) return NextResponse.json({ error: 'Not admin' }, { status: 403 });

    await adminDb.collection('devotionals').doc(params.id).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}