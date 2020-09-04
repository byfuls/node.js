
const serviceAccount = require('./cert/taste-firestore-f3cc55a6b2f1.json');

/*--- init, google cloud platform */
const admin = require('firebase-admin');
admin.initializeApp({
  //credential: admin.credential.applicationDefault()
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

let conv_date = unix_timestamp => {
	let date = new Date(unix_timestamp*1000);
	let hours = date.getHours();
	let minutes = "0"+date.getMinutes();
	let seconds = "0"+date.getSeconds();
	let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	return formattedTime
};

/*--- get data via snapshot */
var g_data = 0
const sleep = require('sleep');
let observer = db.collection('users').doc('test')
	.onSnapshot(doc => {
	console.log('event: ', doc);
	console.log(`current data: ${doc.data()}`);
	console.log(doc.data());

	//j_doc = JSON.stringify(doc.data());
	//console.log(j_doc);
	j_doc = doc.data();
	for(key in j_doc){
		console.log(`[data] key: ${key}`);
		console.log(`[data] value: ${j_doc[key]}`);
		console.log(`[data] read time: ${conv_date(doc._readTime._seconds)}`);
		console.log(`[data] create time: ${conv_date(doc._createTime._seconds)}`);
		console.log(`[data] update time: ${conv_date(doc._updateTime._seconds)}`);
		g_data++;
	}

	sleep.sleep(1);
	let sender = "sender"+g_data;
	let data = {
	    sender: `hello, ${sender}`
	};
	const set_doc = db.collection('users').doc('test').set(data);
	set_doc.then(res => {
	    console.log('set: ', res);
	});
});

/*--- get matched data via snapshot */
//db.collection("users").where("aa", "==", "aa")
//	.onSnapshot(function(snapshot) {
//	snapshot.docChanges().forEach(function(change) {
//		if (change.type === "added") {
//			console.log("New: ", change.doc.data());
//		}
//		if (change.type === "modified") {
//			console.log("Modified: ", change.doc.data());
//		}
//		if (change.type === "removed") {
//			console.log("Removed: ", change.doc.data());
//		}
//	});
//});
