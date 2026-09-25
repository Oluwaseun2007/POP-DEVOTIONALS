const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.scheduledPublish = functions.pubsub
  .schedule('0 * * * *')
  .timeZone('Africa/Lagos')
  .onRun(async (context) => {
    const today = new Date().toISOString().split('T')[0];
    const snapshot = await db
      .collection('devotionals')
      .where('status', '==', 'scheduled')
      .where('publicationDate', '<=', today)
      .get();

    const batch = db.batch();
    let count = 0;
    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, {
        status: 'published',
        publishedAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      count++;
    });

    if (count > 0) {
      await batch.commit();
      console.log(`Published ${count} devotionals`);
    }
    return null;
  });