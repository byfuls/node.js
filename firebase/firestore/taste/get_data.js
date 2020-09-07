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

/*--- get, sample */
const get_firestore_data = (db) => {
	db.collection('users').get().then((snapshot) => {
		snapshot.forEach((doc)=>{
			console.log(doc.id, '=>', doc.data());
		});
	}).catch((err) => {
		console.log('error getting documents', err);
	});
}

/*--- get, all documents via one collection */
const get_all_docs = (db, col) => {
	/* [1] */
	//let docs = db.collection(col).get().then((snapshot) => {
	//	snapshot.forEach(doc => {
	//		console.log(doc.id, '=>', doc.data());
	//	})
	//}).catch((err) => {
	//	console.log('error getting documents', err);
	//});

	/* [2] */
	const _col = db.collection(col);
	const _docs = _col.get().then(snapshot => {
		snapshot.forEach(doc => {
			console.log(doc.id, '=>', doc.data());
		});
	}).catch(err => {
		console.log('error getting documents', err);
	});
	return _docs;
}

/*--- get, one document */
const get_one_doc = (db, col, doc) => {
	/* [1] */
	//let _doc = db.collection(col).doc(doc).get().then(snapshot => {
	//	if(!snapshot.exists){
	//		console.log('no such document!');
	//	}else{
	//		console.log('document data:', snapshot.data());
	//	}
	//}).catch((err) => {
	//	console.log('error getting document', err);
	//});

	/* [2] */
	const _col = db.collection(col).doc(doc);
	const _doc = _col.get().then(snapshot => {
		if(!snapshot.exists){
			console.log('no such document!');
		}else{
			console.log('document data:', snapshot.data());
		}
	}).catch(err=>{
		console.log('error getting document', err);
	});
	return _doc;
}

/*--- main */
const main = () => {
	/*--- call, get, sample */
	//get_firestore_data(db);
	
	/*--- call, get, all documents */
	//get_all_docs(db, 'users');

	/*--- call, get, one document */
	get_one_doc(db, 'users', 'alovelace');
}
main();
