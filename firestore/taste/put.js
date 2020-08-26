
const serviceAccount = require('./cert/taste-firestore-f3cc55a6b2f1.json');

/*--- init, google cloud platform */
const admin = require('firebase-admin');
admin.initializeApp({
  //credential: admin.credential.applicationDefault()
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
console.log(db)

const new_col_new_docu = (db) => {
	/*--- add, new collection and document */
	let docRef = db.collection('users').doc('alovelace');
	let setAda = docRef.set({
		first: 'Ada',
		last: 'Lovelace',
		born: 1815
	});

	/*--- add, new document into users collection */
	let aTuringRef = db.collection('users').doc('aturing-2');
	let setAlan = aTuringRef.set({
		'first': 'Alan',
		'middle': 'Mathison',
		'last': 'Turing',
		'born': 1912
	});

	return Promise.all([setAda, setAlan]);
}

new_col_new_docu(db).then((values)=>{
	console.log(values);
});