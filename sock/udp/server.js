
const udp = require('dgram');
const server = udp.createSocket('udp4');

server.on('error', err => {
	console.log(`error: ${error}`);
	server.close();
});

server.on('message', (msg, info) => {
	console.log(`received (${msg.length}) bytes from [${info.address}:${info.port}]`);
	console.log(`received data from  client: [${msg.toString()}]`);

	server.send(msg, info.port, '127.0.0.1', err => {
		if(err){
			console.log(`send error: ${err}`);
		}else{
			console.log(`send ok`);
		}
	});
});

server.on('listening', () => {
	let address = server.address();
	let port = address.port;
	let family = address.family;
	let ipaddr = address.address;

	console.log(`server is listening at port: ${port}`);
	console.log(`server ip: [${ipaddr}]`);
	console.log(`server is IP4/IP6: ${family}`);
});

server.on('close', () => {
	console.log(`server is closed`);
});

server.bind(2220);
setTimeout(() => {
	server.close();
}, 8000);
