"use strict";
var RELEASE = 1

let serviceAccount = require(`./cert/ttgo-b29bf-firebase-adminsdk-qg1jz-73e3e1bf64.json`);
const admin = require('firebase-admin');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

var queue = require('bull');

var eventAgent = eventAgent || {};
(function(_ea) {
	if(RELEASE){
		_ea.log = require(`${process.env.NODE_MODULE}/loggingMgr`);
		_ea.log.open(`${process.env.NODE_LOG}`, 'sms.log');
		_ea.log.info('[EA] process on');
	}

 	let que = new queue('event agent queue');

 	let data_check = obj => {
		//let check_list = ['sender', 'receiver', 'content', 'date', 'status', 'type', 'user_id', 'tid', 'imsi'];
		let check_list = ['receiver', 'content', 'date', 'status', 'type', 'user_id', 'tid', 'imsi'];
		for(var i=0; i<check_list.length; i++){
			let key = check_list[i];
			let key_ret = key in obj;
			if(key_ret == false){
				if(RELEASE){
					_ea.log.error(`during expected data searching, but i did not received data. that field: ${key}`);
				}else{
					console.error(`during expected data searching, but i did not received data. that field: ${key}`);
				}
				return false;
			}
		}
		return true
	};

	let delete_doc = (_col, _doc) => {
		db.collection(_col).doc(_doc).delete().then(()=>{
			if(RELEASE){
				_ea.log.info('document successfully delete!');
			}else{
				console.log('document successfully delete!');
			}
		}).catch(err => {
			if(RELEASE){
				_ea.log.error(`error removing document: ${err}`);
			}else{
				console.error(`error removing document: ${err}`);
			}
		});
	};

	let update_flag = (_col, _user, _friend, _f_id, _flag) => {
		let query = db.collection(_col).doc(_user);
		let _ret = query
		.set({})
		.then(()=>{
			query.collection("chats").doc(_friend)
			.collection("messages").doc(_f_id)
			.update({"status": _flag})
			.then(() => {
				console.log("update complete");
			})
			.catch((err) => {
				console.log(err);
			});
		});
	};

	let update_event = async (_col, _user, _friend, _message) => {
		let f_id;
		let query = db.collection(_col).doc(_user);
		let _ret = await query
		.set({})
		.then(async ()=>{
			query = query.collection("chats").doc(_friend)
			let _ret = await query
			.set({
				last_message: _message.content,
				date: _message.date
			}).then(async ()=>{
				query = query.collection("messages");
				let _ret = await query.add({
					content: _message.content,
					date: _message.date,
					type: _message.type,
					status: _message.status,
					writer: _message.writer
				});
				f_id = _ret.id
			}).catch(err=>{
				if(RELEASE){
					_ea.log.error(`error adding document: ${err}`);
				}else{
					console.error(`error adding document: ${err}`);
				}
			});
		}).catch(err=>{
			if(RELEASE){
				_ea.log.error(`error adding document: ${err}`);
			}else{
				console.error(`error adding document: ${err}`);
			}
		})

		return f_id;
	};

	let goto_root_collection = (_col) => {
		//let query = db.collection('cities').where('state', '==', 'CA');
		//let query = db.collection(_col).where('status', '==', 'create');
		//let observer = query.onSnapshot(querySnapshot => {
		//	console.log(`Received query snapshot of size ${querySnapshot.size}`);
		//		// ...
		//	}, err => {
		//	console.log(`Encountered error: ${err}`);
		//});

		const subCollection = "chats"
		const lastCollection = "messages"

		console.log("Retrieving list of documents in collection");
		let collectionRef = db.collection(_col);
		//let documents = collectionRef.limit(1).get()
		let documents = collectionRef.get()
		.then(snapshot => {
			snapshot.forEach(doc => {
			console.log("Parent Path: ", _col);
			console.log("Parent Document ID: ", doc.id);

				let subCollectionRef = collectionRef.doc(doc.id).collection(subCollection)
				let subCollectionDocs = subCollectionRef.get()
				.then(snapshot => {
					snapshot.forEach(doc => {
						console.log("Sub Path: ", subCollection);
						console.log("Sub Document ID: ", doc.id);

						let lastCollectionRef = subCollectionRef.doc(doc.id).collection(lastCollection)
						let lastCollectionDocs = lastCollectionRef.get()
						.then(snapshot => {
							snapshot.forEach(doc => {
								console.log("Last Path: ", lastCollection);
								console.log("Last Document ID: ", doc.id);
							})
						}).catch(err => {
							console.log("Error getting last-collection documents", err);
						});
					})

				}).catch(err => {
					console.log("Error getting sub-collection documents", err);
				});
			});
		}).catch(err => {
			console.log("Error getting documents", err);
		});
	}

	let recursiveSnapshot = (root) => {
		const subCollection = "chats"
		const lastCollection = "messages"

		console.log("Retrieving list of documents in collection");
		let collectionRef = db.collection(root);
		//let documents = collectionRef.limit(1).get()
		let documents = collectionRef
		.onSnapshot(_docs => {
			let docs = _docs.docChanges();
			docs.forEach(doc1 => {
				console.log("Parent type: ", doc1.type);
				console.log("Parent Path: ", root);
				console.log("Parent Document ID: ", doc1.doc.id);

				console.log("Parent add start")
				let subCollectionRef = collectionRef.doc(doc1.doc.id).collection(subCollection);
				let subCollectionDocs = subCollectionRef
				.onSnapshot(_docs => {
					let docs = _docs.docChanges();
					docs.forEach(doc2 => {
						console.log("Sub type: ", doc2.type);
						console.log("Sub Path: ", subCollection);
						console.log("Sub Document ID: ", doc2.doc.id);

						let lastCollectionRef = subCollectionRef.doc(doc2.doc.id).collection(lastCollection);
						let lastCollectionDocs = lastCollectionRef
						.onSnapshot(_docs => {
							let docs = _docs.docChanges();
							docs.forEach(doc3 => {
								console.log("Last type: ", doc3.type);
								console.log("Last Path: ", lastCollection);
								console.log("Last Document ID: ", doc3.doc.id);
								console.log(`${doc1.doc.id}/${doc2.doc.id}/${doc3.doc.id}`);
							});
						});
					});
				});
			});
		});
	}

	let watch_n_proceed = (_col, _dest_col) => {
		let _observer = db.collection(_col)
		.onSnapshot(docs => {
			//console.log(`snapshot of size ${docs.size}`);

            let _docs = docs.docChanges().forEach(async doc => {
				//console.log(`change type: ${doc.type}`);
				if(doc.type === 'added'){
            		let j_doc = doc.doc.data();
					j_doc.id = doc.doc.id;
					if(RELEASE){
						_ea.log.debug(`doc.id => ${j_doc.id}`);
						_ea.log.debug(`doc.imsi => ${j_doc.imsi}`);
					}else{
						console.log(doc.doc.id, '=>', j_doc);
						console.log(`doc.imsi => ${j_doc.imsi}`);
					}

					let _message = Object();
					/* status = "create", "delete", "fail", "sent", "read" */
					/* type = "text", "image", "file" */
					if(data_check(j_doc)){
						_message.status = j_doc.status;
					}else{
						if(RELEASE){
							_ea.log.error('error, event_queue data fields check again');
						}else{
							console.error('error, event_queue data fields check again');
						}
						_message.status = "fail";
					}
					let _user = j_doc.imsi;
					let _friend = j_doc.receiver;
					_message.content = j_doc.content;
					_message.date = j_doc.date;
					_message.type = j_doc.type;
					_message.writer = j_doc.imsi;
					_message.user_id = j_doc.user_id;
					_message.tid = j_doc.tid;
					_message.imsi = j_doc.imsi;

					try{
						await update_event(_dest_col, _user, _friend, _message)
							.then((val) => {
								j_doc.id = val;
								if(RELEASE){
									_ea.log.info(`${_col} document ${doc.doc.id} will be deleted`);
								}else{
									console.log(`${_col} document ${doc.doc.id} will be deleted`);
								}
								_ea.que.add(j_doc);
								delete_doc(_col, doc.doc.id);
							});
					}catch(e){
						if(RELEASE){
							_ea.log.error(`critical error occur! delete the message: ${e}`);
						}else{
							console.error(`critical error occur! delete the message: ${e}`);
						}
						delete_doc(_col, doc.doc.id);
					}
				}
			});
		}, err => {
			if(RELEASE){
				_ea.log.error(`[err] error message: ${err}`);
			}else{
				console.error(`[err] error message: ${err}`);
			}
		});
	};

	let put_tailtag = (_dest_col, _user, _friend, _message) => {
		/*
		user (= sender)
		friend (= receiver)
		message {
			content,
			date,
			status,
			type,
			writer
		}
		last_message (= content)
		*/

		let __user = _user;
		let __friend = _friend;
		let __message = new Object();
		let __FieldValue = admin.firestore.FieldValue;
		__message.content = _message.content;
		__message.date = __FieldValue.serverTimestamp()
		__message.status = _message.status;
		__message.type = _message.type;
		__message.writer = _message.writer;
		__message.user_id = _message.user_id;
		__message.tid = _message.tid;
		__message.imsi = _message.imsi;

		if(RELEASE){
        	_ea.log.debug(`[put] user: ${__user}`);
        	_ea.log.debug(`[put] friend: ${__friend}`);
        	_ea.log.debug(`[put] message.content: ${__message.content}`);
        	_ea.log.debug(`[put] message.date: ${__message.date}`);
        	_ea.log.debug(`[put] message.status: ${__message.status}`);
        	_ea.log.debug(`[put] message.type: ${__message.type}`);
        	_ea.log.debug(`[put] message.writer: ${__message.writer}`);
        	_ea.log.debug(`[put] message.user_id: ${__message.user_id}`);
        	_ea.log.debug(`[put] message.tid: ${__message.tid}`);
        	_ea.log.debug(`[put] message.imsi: ${__message.imsi}`);
		}else{
        	console.log(`[put] user: ${__user}`);
        	console.log(`[put] friend: ${__friend}`);
        	console.log(`[put] message.content: ${__message.content}`);
        	console.log(`[put] message.date: ${__message.date}`);
        	console.log(`[put] message.status: ${__message.status}`);
        	console.log(`[put] message.type: ${__message.type}`);
        	console.log(`[put] message.writer: ${__message.writer}`);
        	console.log(`[put] message.user_id: ${__message.user_id}`);
        	console.log(`[put] message.tid: ${__message.tid}`);
        	console.log(`[put] message.imsi: ${__message.imsi}`);
		}

		update_event(_dest_col, __user, __friend, __message);
	};

	_ea.que = que;
	_ea.update = (_user, _friend, _f_id, _flag) => {
		update_flag("sms", _user, _friend, _f_id, _flag);
	};
	_ea.getAll = () => {
		recursiveSnapshot("root");
	};
    _ea.get = () => {
		watch_n_proceed("event_queue", "sms");
    };
	_ea.put = (_user, _friend, _message) => {
		put_tailtag("sms", _user, _friend, _message);
	};
})(eventAgent);
eventAgent.getAll();

//module.exports = eventAgent;
