const sleep = require('sleep');

const serviceAccount = require('./cert/taste-firestore-f3cc55a6b2f1.json');

/*--- init, google cloud platform */
const admin = require('firebase-admin');
admin.initializeApp({
  //credential: admin.credential.applicationDefault()
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
console.log(db)

/*--- trigger init */
const functions = require('firebase-functions');
const trgr_one_doc = () => {
	/* listen for any change on document 'alovelace' in collection 'users' */
	//functions.firestore.document('users/alovelace').onWrite((change, context) => {
	//	console.log('change!!!!!!!!!!!!!!!!!!!!!!!!!');
	//});
}



/*--- main */
const main = () => {
	trgr_one_doc();
	console.log('done');
}
main();
