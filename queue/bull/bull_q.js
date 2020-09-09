var queue = require('bull');

var msg_q = new queue('bull queue taste');

msg_q.process((job, done) => {
	let data = job.data;
	console.log(`get queue: ${data}`);
	console.log(`sender: ${data.sender}`);
	console.log(`receiver: ${data.receiver}`);
	done();
});

msg_q.add({
	sender: 'jason',
	receiver: 'peter'
});
