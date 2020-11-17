"use strict";
let serviceAccount = require(`./cert/taste-firestore-firebase-adminsdk-6o8ps-76ccbb7564.json`);
const admin = require('firebase-admin');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

var fb = fb || {};
(function(_fb) {
	let sendRequest = () => {
		const uid = auth().currentUser.uid;
		firestore()
			.collection('Sent_Reqs')
			.doc(`${uid}`)
			.collection(`${this.autoId()}`)
			.add({
				targetId: this.userId,
				sentAt: new Date(),
			});
	}

	_fb.insertAutoIncrement = async () => {
		let increment = admin.firestore.FieldValue.increment(1);
		const data = {
			stringExample: 'Hello, World!',
			booleanExample: true,
			numberExample: 3.14159265,
			dateExample: admin.firestore.Timestamp.fromDate(new Date('December 10, 1815')),
			arrayExample: [5, true, 'hello'],
			nullExample: null,
			objectExample: {
				a: 5,
				b: true
			}
		};
		//await db.collection('cities').doc(increment.operand.toString()).set(data);	X
		await db.collection('cities').doc('new-city-id').set(data);
	};
})(fb);

fb.insertAutoIncrement();
