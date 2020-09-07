const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp();

const netcli = require('net');
var cli = new netcli.Socket();

/* listen for any change on document 'alovelace' in collection 'users' */
exports.watchDoc = functions.firestore.document('users/test').onWrite( async (change, context) => {
	console.log('[onWrite] event occur');
	cli.setEncoding('utf8');
	cli = await netcli.connect({port:60000, host:"52.77.222.175"}, async ()=>{
		console.log('[onWrite] connect ok');
		await cli.write('[onWrite] changed data');
		console.log('[onWrite] write ok');
		await cli.destroy();
	}).on('error', (err)=>{
	    console.log(`[onWrite] client socket error: ${JSON.stringify(err)}`);
	}).on('timeout', ()=>{
	    console.log('[onWrite] client socket timeout');
	});
	console.log('[onWrite] event done');
});
