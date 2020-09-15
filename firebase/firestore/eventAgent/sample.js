let eventAgent = require('./eventAgent.js');

console.log('start');
eventAgent.ea.get();

eventAgent.ea.que.process((job, done) => {
	let data = job.data;
	console.log(`get queue: ${data}`);

    /* receive message */
	console.log(`sender: ${data.sender}`);
	console.log(`receiver: ${data.receiver}`);
	console.log(`content: ${data.content}`);
	console.log(`date: ${data.date}`);
	console.log(`type: ${data.type}`);
	console.log(`status: ${data.status}`);
	console.log(`user_id: ${data.user_id}`);
	console.log(`tid: ${data.tid}`);
	console.log(`imsi: ${data.imsi}`);


    /* reply message */
    let user = data.sender;
    let friend = data.receiver;
    let message = Object();
    message.content = "reply message";
    message.date = "20221022";
    message.type = data.type;
    message.status = data.status;
    message.user_id = data.user_id;
    message.tid = data.tid;
    message.imsi = data.imsi;
    message.writer = data.receiver;
    eventAgent.ea.put(user, friend, message);

	done();
});
