
const udp = require('dgram');
const client = udp.createSocket('udp4');

const sendingMsg = Buffer.from('hi,there');

client.on('message', (msg, info) => {
	console.log(`received (${msg.length}) bytes from [${info.address}:${info.port}]`);
	console.log(`received data from  client: [${msg.toString()}]`);
});

client.send(sendingMsg, 2220, '127.0.0.1', err => {
	if(err){
		client.close();
	}else{
		console.log(`send ok`);
	}
});

//const multiMsg1 = Buffer.from('hi');
//const multiMsg2 = Buffer.from('there');
//client.send([multiMsg1, multiMsg2], 2220, '127.0.0.1', err => {
//	if(err){
//		console.log(`send err: ${err}`);
//	}else{
//		console.log(`send ok`);
//	}
//});
