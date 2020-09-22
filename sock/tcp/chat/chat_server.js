var net=require('net');

var server=net.createServer();

var sockets = [];

server.on('connection',function(socket){
	console.log('New connection');
	sockets.push(socket);
	socket.on('data',function(data){
		console.log('got data:',data);
		sockets.forEach(function(otherSocket){
			if(otherSocket!==socket){
				otherSocket.write(data);
			}
		});
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

server.listen(4001);
