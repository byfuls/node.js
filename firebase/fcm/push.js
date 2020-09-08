"use strict";

//const serviceAccount = require('./cert/taste-firestore-f3cc55a6b2f1.json');
const serviceAccount = require('./cert/ttgo-b29bf-firebase-adminsdk-qg1jz-73e3e1bf64.json');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
	//databaseURL: 'https://taste-firestore.firebaseio.com/',
	databaseURL: 'https://ttgo-b29bf.firebaseio.com',
	//messagingSenderId: '390430453601',
	messagingSenderId: '268236912220',
	apiKey: 'AAAAPnQqdlw:APA91bEzssQ_He1a5eVj5snwaG7MgDBabtMxDb1cqAAjSqDYGxiJhtF3xo1SXfmY6vDOLVbeOD-GiEetdTdmclXvX8VRwhUNBYbld15iStVAJCsg0cviMEJzUAage6WFZ7yr77JsUneo'
});

//let registrationToken = 'AAAAWud372E:APA91bFU0h4djspP0mp-xSLiVd236rzzKfCT1uOYxam9Fr34e7LU4QN9cBwF6VttibIpyGDMlQ9KRmFhNxtcchAmEOG2kwUWtn0wmTfiXIHJSGHOgNlABuzmC2mFcvsh9GbZSbgOT7YN';
//let registrationToken = 'AAAAWud372E:APA91bHSi7VyRVJXnkI0I7Hg34AFDId9sY8A7bXFXbNz2nlsWGSELEzuz0SN5bdlu6OLefTJ_YAlpZb8lEvZ6WsSA9ujV17QOV9CkG54ufN_pfaa-u_ORnnMijY3ft0svlQ0dH4dENYQ';
let registrationToken = 'c_PofNF5TGednuG6lBVaEr:APA91bE9Y7O_z8I5F7e-bD8imH5HIlM4Rxb2bocMaZ5Z7O2lkk2PVSvcKuUgyUUVl2fSWGJ58GV8S1etecKT522ILslEOtNteUOHdJP33nE8r4ycMeRASMK7423l5J8o0ugXzU29GiMe';
//let registrationToken = 'test';

/*--- send to specific dest */
let message = {
	data: {
		score: '850',
		time: '2:45'
	},
	token: registrationToken
};

admin.messaging().send(message)
.then((response) => {
	console.log(`successfully sent message: ${response}`);
}).catch((error) => {
	console.log(`error sending message: ${error}`);
});
