"use strict";

const serviceAccount = require('./cert/taste-firestore-f3cc55a6b2f1.json');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://taste-firestore.firebaseio.com/'
});

const https = require('https');
const { google } = require('googleapis');

const PROJECT_ID = 'taste-firestore';
const HOST = 'fcm.googleapis.com';
const PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];
/*------------------------------------------------------------------------------*/

let buildCommonMessage = () => {
	return {
		'message': {
			//'topic': 'news',
			'token':'c_PofNF5TGednuG6lBVaEr:APA91bE9Y7O_z8I5F7e-bD8imH5HIlM4Rxb2bocMaZ5Z7O2lkk2PVSvcKuUgyUUVl2fSWGJ58GV8S1etecKT522ILslEOtNteUOHdJP33nE8r4ycMeRASMK7423l5J8o0ugXzU29GiMe',
			'notification': {
				'title': 'FCM notification',
				'body': 'notification from fcm'
			},
			'data': {
				'story_id': 'hihi'
			}
		}
	};
};

let getAccessToken = () => {
	return new Promise((resolve, reject) => {
		const key = require('./cert/taste-firestore-f3cc55a6b2f1.json');
		const jwtClient = new google.auth.JWT(
			key.client_email,
			null,
			key.private_key,
			SCOPES,
			null
		);
		jwtClient.authorize((err, tokens) => {
			if(err){
				reject(err);
				return;
			}
			resolve(tokens.access_token);
		});
	});
};

let sendFcmMessage = fcmMessage => {
	getAccessToken()
		.then(accessToken => {
			const options = {
				hostname: HOST,
				path: PATH,
				method: 'POST',
				/*--- START use_access_token */
				headers: {
					'Authorization': 'Bearer ' + accessToken
				}
				/*--- END use_access_token */
			};

			const request = https.request(options, (resp) => {
				resp.setEncoding('utf8');
				resp.on('data', (data) => {
					console.log(`message sent to firebase for delivery, response: ${data}`);
				});
			});
			request.on('error', (err) => {
				console.log(`unable to send message to firebase: ${err}`);
			});
			request.write(JSON.stringify(fcmMessage));
			request.end();
		});
};

const commonMessage = buildCommonMessage();
console.log('FCM request body for message using common notification object:');
console.log(JSON.stringify(commonMessage, null, 2));
sendFcmMessage(buildCommonMessage());
