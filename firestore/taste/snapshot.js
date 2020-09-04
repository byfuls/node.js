
const serviceAccount = require('./cert/taste-firestore-f3cc55a6b2f1.json');

/*--- init, google cloud platform */
const admin = require('firebase-admin');
admin.initializeApp({
  //credential: admin.credential.applicationDefault()
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/*--- get data via snapshot */
//let observer = db.collection('users').doc('test')
//	.onSnapshot(querySnapshot => {
//	console.log('event: ', querySnapshot);
//});


db.collection("users").where("aa", "==", "aa")
	.onSnapshot(function(snapshot) {
	snapshot.docChanges().forEach(function(change) {
		if (change.type === "added") {
			console.log("New: ", change.doc.data());
		}
		if (change.type === "modified") {
			console.log("Modified: ", change.doc.data());
		}
		if (change.type === "removed") {
			console.log("Removed: ", change.doc.data());
		}
	});
});
