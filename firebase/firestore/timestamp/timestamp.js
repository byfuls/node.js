const serviceAccount = require('./cert/taste-firestore-f3cc55a6b2f1.json');

/*--- init, google cloud platform */
const admin = require('firebase-admin');
admin.initializeApp({
  //credential: admin.credential.applicationDefault()
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();


const FieldValue = admin.firestore.FieldValue;

const docRef = db.collection('objects').doc('some-id');

const res = docRef.set({
	timestamp: FieldValue.serverTimestamp()
});
