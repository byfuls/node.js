'use strict';

//console.log(process.env)
process.env.GCLOUD_PROJECT = "taste-firestore";
process.env.FIREBASE_CONFIG = {
	databaseURL: 'https://taste-firestore.firebaseio.com',
	storageBucket: 'gs://taste-firestore.appspot.com',
	projectId: 'taste-firestore'
};

const functions = require('firebase-functions');
const serviceAccount = require('./cert/taste-firestore-a5ac9d55864e.json');
//const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
//adminConfig.credential = admin.credential.cert(serverAccount);

/*--- init, google cloud platform */
const admin = require('firebase-admin');
//admin.initializeApp(adminConfig);
//admin.initializeApp();
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
console.log(db)

/*--- trigger init */
//const functions = require('firebase-functions');

var wd = require('./functions/index.js');
const trgr_one_doc = () => {
	wd.watchDoc;
}



/*--- main */
const sleep = require('sleep');
const main = () => {
	console.log('start');
	trgr_one_doc();
	console.log('done');

	while(true){
		sleep.sleep(1);
		console.log('ing');
	}
}
main();
