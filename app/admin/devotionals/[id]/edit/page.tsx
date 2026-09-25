import { notFound, redirect } from 'next/navigation';
import { adminDb } from '@/lib/firebaseAdmin';
import DevotionalReader from '@/components/DevotionalReader';
import { isDevotionalAvailable } from '@/lib/utils';

export default async function DevotionalPage({ params }: { params: { id: string } }) {
  const docRef = adminDb.collection('devotionals').doc(params.id);
  const docSnap = await docRef.get();

  if (!docSnap.exists) notFound();

  // Cast to any to prevent TypeScript from inferring only { id: string }
  const data = docSnap.data() as any;
  const devotional = { id: docSnap.id, ...data };

  if (!isDevotionalAvailable(devotional.publicationDate, devotional.status)) {
    redirect('/archive?locked=1');
  }

  return <DevotionalReader devotional={devotional} />;
}