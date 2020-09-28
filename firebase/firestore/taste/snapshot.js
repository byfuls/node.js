"use strict";
const serviceAccount = require('./cert/taste-firestore-f3cc55a6b2f1.json');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

var eventAgent = eventAgent || {}; 
(function(_ea) {
    let conv_date = unix_timestamp => {
        let date = new Date(unix_timestamp*1000);
        let hours = date.getHours();
        let minutes = "0"+date.getMinutes();
        let seconds = "0"+date.getSeconds();
        let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
    };  

	let watch_doc = (_col, _doc) => {
        let _observer = db.collection(_col).doc(_doc)
        .onSnapshot(doc => {
            let j_doc = doc.data();
            for(let key in j_doc){
                console.log('------------ event occur ------------');
                console.log(`[data] key         : ${key}`);
                console.log(`[data] value       : ${j_doc[key]}`);
                console.log(`[data] read time   : ${conv_date(doc._readTime._seconds)}`);
                console.log(`[data] create time : ${conv_date(doc._createTime._seconds)}`);
                console.log(`[data] update time : ${conv_date(doc._updateTime._seconds)}`);
                console.log('-------------------------------------');
            }   
        }, err => {
			console.error(`[err] error message: ${err}`);
		}); 
	};

	let watch_condition_docs = (_col, _if) => {
		console.log(_if);
		/*--- get matched data via snapshot */
		db.collection(_col).where(_if[0], _if[1], _if[2])
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
	};

	let watch_col = (_col) => {
		let _observer = db.collection(_col)
		.onSnapshot(docs => {
            let _docs = docs.forEach(doc => {
				console.log(doc);
            	let j_doc = doc.data();
				console.log(doc.id);
            	for(let key in j_doc){
            	    console.log('------------ event occur ------------');
            	    console.log(`[data] key         : ${key}`);
            	    console.log(`[data] value       : ${j_doc[key]}`);
            	    console.log(`[data] read time   : ${conv_date(doc._readTime._seconds)}`);
            	    console.log(`[data] create time : ${conv_date(doc._createTime._seconds)}`);
            	    console.log(`[data] update time : ${conv_date(doc._updateTime._seconds)}`);
            	    console.log('-------------------------------------');
            	}   
			});
		}, err => {
			console.error(`[err] error message: ${err}`);
		});
	};

	let delete_doc = (_col, _doc) => {
		db.collection(_col).doc(_doc).delete().then(()=>{
			console.log('document successfully delete!');
		}).catch(err => {
			console.error(`error removing document: ${err}`);
		});
	};

	let update_event = (_col, _user, _friend, _message) => {
		let query = db.collection(_col).doc(_user)
		let _ret = query
		.set({})
		.then(()=>{

			query = query.collection("chats").doc(_friend)
			_ret = query
			.set({})
			.then(()=>{
				query = query.collection("messages")
				_ret = query.add({
					content: _message.content,
					date: _message.date,
					type: _message.type,
					writer: _message.writer
				}).then(()=>{
					console.log(`document added`);
				}).catch(err=>{
					console.error(`error adding document: ${error}`);
				});
			}).catch(err=>{
				console.error(`error adding document: ${err}`);
			});
		}).catch(err=>{
			console.error(`error adding document: ${error}`);
		});
	};

	let watch_n_proceed = (_col, _dest_col) => {
		let _observer = db.collection(_col)
		.onSnapshot(docs => {
            let _docs = docs.forEach(doc => {
            	let j_doc = doc.data();
				console.log(doc.id, '=>', j_doc);
				console.log(`doc.sender => ${j_doc.sender}`);

				//let _col = _dest_col;
				let _user = j_doc.sender;
				let _friend = j_doc.receiver;
				let _message = {
					content: j_doc.content,
					date: j_doc.date,
					type: j_doc.type,
					writer: j_doc.sender
				};

				console.log(_dest_col);
				console.log(_user);
				console.log(_friend);
				console.log(_message);
				update_event(_dest_col, _user, _friend, _message);

				console.log(`${_col} document ${doc.id} will be deleted`);
				delete_doc(_col, doc.id);
			});
		}, err => {
			console.error(`[err] error message: ${err}`);
		});
	};

	let get_docs = (_col) => {
		let _docs = db.collection(_col).get().then(snapshot => {
			snapshot.forEach(doc => {
				console.log(doc.id, '=>', doc.data());
				console.log(`doc.sender => ${doc.data().sender}`);
			});
		}).catch(err => {
			console.log('error getting documents', err);
		});
	};

    _ea.run = () => {
		/* call watch document */
		//watch_doc("sms", "getkey");
		/* call watch document with condition */
		//watch_condition_docs(_col, ["aa", "==", "bb"]);
		/* call watch collection */
		watch_col("objects");
		/* call delete document */
		//delete_doc(_col, _doc);

		//update_event("sms", "120", "112", {content: "gogogo", date: "20200904", type: "create", writer: "120"});
		//get_docs("event_queue");
		
		//watch_n_proceed("event_queue", "sms");
    };  
})(eventAgent);
eventAgent.run();

/* ref : https://github.com/firebase/snippets-web/blob/af138b333956e2403f7a38af3814e3baff050aea/firestore/test.firestore.js#L705-L718 */
