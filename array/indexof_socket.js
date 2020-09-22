var net = require('net');
var queue = require('bull');
var passQue = new queue('socket passed');
var server = net.createServer();

var sockets = [];

passQue.process((job, done) => {
	let idx = job.data.sockIdx;
	console.log(`idx: ${idx}`);
	sockets[idx].write('response via queue');
	done();
});

server.on('connection',function(socket){
	console.log('New connection');
	sockets.push(socket);
	socket.on('data',function(data){
		console.log('got data:',data);

		let idx = sockets.indexOf(socket)
		passQue.add({sockIdx: idx});
	});
});

server.on('error',function(err){
	console.log('Server Error:',err.message);
});

server.on('close',function(){
	console.log('Server closed');
	var index=sockets.indexOf(socket);
	sockets.splice(index,1);
});

server.listen(2219);
