const tcp = require('net');
const server = tcp.createServer();

var sockets = [];
server.on('connection', socket => {
	socket.setNoDelay();
	socket.setTimeout(500);
	socket.setEncoding('utf8');
	sockets.push(socket); 
	socket.on('data', data => {
		console.log(`received data: ${data}`);
	});
}).on('error', err => {
	console.log(`server error: ${err.message}`);
}).on('close', () => { 
	console.log(`server closed`);
	let socketIndex = handler.sockets.indexOf(socket);
	handler.sockets.splice(socketIndex, 1);
}).listen(2222, '127.0.0.1');
