RELEASE = 0

if(RELEASE){
	const log = require(`${process.env.NODE_MODULE}/loggingMgr`);
	log.open(`${process.env.NODE_LOG}`, 'sms.log');
	log.info('[EA] process on');
}


let serviceAccount = '';
if(RELEASE){
	serviceAccount = require(`${process.env.NODE_CERT}/ttgo-b29bf-firebase-adminsdk-qg1jz-73e3e1bf64.json`);
}else{
	serviceAccount = require(`./cert/taste-firestore-firebase-adminsdk-6o8ps-68af19444e.json`);
}
const admin = require('firebase-admin');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

var queue = require('bull');

var eventAgent = eventAgent || {};
(function(_ea) {
 	let que = new queue('event agent queue');

 	let data_check = obj => {
		let check_list = ['sender', 'receiver', 'content', 'date', 'status', 'type', 'user_id', 'tid', 'imsi'];
		for(var i=0; i<check_list.length; i++){
			let key = check_list[i];
			let key_ret = key in obj;
			if(key_ret == false){
				if(RELEASE){
					log.error(`during expected data searching, but i did not received data. that field: ${key}`);
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
				log.info('document successfully delete!');
			}else{
				console.log('document successfully delete!');
			}
		}).catch(err => {
			if(RELEASE){
				log.error(`error removing document: ${err}`);
			}else{
				console.error(`error removing document: ${err}`);
			}
		});
	};

	let update_event = (_col, _user, _friend, _message) => {
		let query = db.collection(_col).doc(_user)
		let _ret = query
		.set({})
		.then(()=>{
			query = query.collection("chats").doc(_friend)
			_ret = query
			.set({
				last_message: _message.content
			}).then(()=>{
				query = query.collection("messages");
				_ret = query.add({
					content: _message.content,
					date: _message.date,
					type: _message.type,
					status: _message.status,
					writer: _message.writer
				}).then(()=>{
					if(RELEASE){
						log.info(`document added`);
					}else{
						console.log(`document added`);
					}
				}).catch(err=>{
					if(RELEASE){
						log.error(`error adding document: ${error}`);
					}else{
						console.error(`error adding document: ${error}`);
					}
				});
			}).catch(err=>{
				if(RELEASE){
					log.error(`error adding document: ${err}`);
				}else{
					console.error(`error adding document: ${err}`);
				}
			});
		}).catch(err=>{
			if(RELEASE){
				log.error(`error adding document: ${error}`);
			}else{
				console.error(`error adding document: ${error}`);
			}
		});
	};

	let watch_n_proceed = (_col, _dest_col) => {
		let _observer = db.collection(_col)
		.onSnapshot(docs => {
            let _docs = docs.forEach(doc => {
            	let j_doc = doc.data();
				if(RELEASE){
					log.debug(doc.id, '=>', j_doc);
					log.debug(`doc.sender => ${j_doc.sender}`);
				}else{
					console.log(doc.id, '=>', j_doc);
					console.log(`doc.sender => ${j_doc.sender}`);
				}

				let _message = Object();
				/* status = "create", "delete", "fail", "complete" */
				/* type = "text", "image", "file" */
				if(data_check(j_doc)){
					_message.status = j_doc.status;
				}else{
					if(RELEASE){
						log.error('error, event_queue data fields check again');
					}else{
						console.error('error, event_queue data fields check again');
					}
					_message.status = "fail";
				}
				let _user = j_doc.sender;
				let _friend = j_doc.receiver;
				_message.content = j_doc.content;
				_message.date = j_doc.date;
				_message.type = j_doc.type;
				_message.writer = j_doc.sender;
				_message.user_id = j_doc.user_id;
				_message.tid = j_doc.tid;
				_message.imsi = j_doc.imsi;

				//console.log(_dest_col);
				//console.log(_user);
				//console.log(_friend);
				//console.log(_message);

				try{
					update_event(_dest_col, _user, _friend, _message);
					if(RELEASE){
						log.info(`${_col} document ${doc.id} will be deleted`);
					}else{
						console.log(`${_col} document ${doc.id} will be deleted`);
					}
					_ea.que.add(j_doc);
					delete_doc(_col, doc.id);
				}catch(e){
					if(RELEASE){
						log.error('critical error occur! delete the message');
					}else{
						console.error('critical error occur! delete the message');
					}
					delete_doc(_col, doc.id);
				}
			});
		}, err => {
			if(RELEASE){
				log.error(`[err] error message: ${err}`);
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

		let user = _user;
		let friend = _friend;
		let message = Object();
		message.content = _message.content;
		message.date = _message.date;
		message.status = "complete";
		message.type = _message.type;
		message.writer = _message.writer;
		message.user_id = _message.user_id;
		message.tid = _message.tid;
		message.imsi = _message.imsi;

        console.log(`[put] user: ${user}`);
        console.log(`[put] friend: ${friend}`);
        console.log(`[put] message.content: ${message.content}`);
        console.log(`[put] message.date: ${message.date}`);
        console.log(`[put] message.status: ${message.status}`);
        console.log(`[put] message.type: ${message.type}`);
        console.log(`[put] message.writer: ${message.writer}`);
        console.log(`[put] message.user_id: ${message.user_id}`);
        console.log(`[put] message.tid: ${message.tid}`);
        console.log(`[put] message.imsi: ${message.imsi}`);

		update_event(_dest_col, _user, _friend, _message);


		/*
		sms_in_data.command = command_line.command;
		sms_in_data.sub_command = command_line.data1;
		sms_in_data.seq = command_line.data2;
		sms_in_data.sim_imsi = command_line.data3;
		sms_in_data.sms_pdu = command_line.data4;
		sms_in_data.port = command_line.port;
		pdu_data = pdu.parse(sms_in_data.sms_pdu);
		sim_in_data.body = pdu_data._ud._data;
		sim_in_data.outbound = pdu_data._sca_encoded;
		sim_in_data.callerId = pdu_data._address._phone;
		sms_in_data.data = pdu_data._scts._time;
		*/
	};

	_ea.que = que;
    _ea.get = () => {
		watch_n_proceed("event_queue", "sms");
    };
	_ea.put = (_user, _friend, _message) => {
		put_tailtag("sms", _user, _friend, _message);
	};
})(eventAgent);
//eventAgent.get();

exports.ea = eventAgent;
