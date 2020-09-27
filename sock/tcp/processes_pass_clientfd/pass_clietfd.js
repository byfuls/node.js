var net = require('net');
var cluster = require('cluster');
var server = net.createServer();

if(cluster.isMaster){
    var worker = cluster.fork();

    worker.on('message', msg => {
        console.log(`master received msg: ${msg} from ${worker.process.pid}`);
    });
}else{
    process.on('message', msg => {
        console.log(`worker received msg: ${msg} from master`);
    });

	var sockets = [];
	server.on('connection',function(socket){
		console.log('New connection');
		sockets.push(socket);
		process.send(sockets);
		socket.on('data',function(data){
			console.log('got data:',data);
	
			let idx = sockets.indexOf(socket)

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
}
