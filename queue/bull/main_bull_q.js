
var queue = require('./exports_bull_q.js');

console.log(queue.var);

queue.que.process((job, done)=>{
	let data = job.data;
	console.log(`get queue: ${data}`);
	console.log(`sender: ${data.sender}`);
	console.log(`receiver: ${data.receiver}`);
	done();
});
