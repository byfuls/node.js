"use strict";

const udp = require('dgram');
var server = udp.createSocket('udp4');
const queue = require('bull');
const gQue = new queue('pass to client');

const sleep = (ms) => {
     return new Promise(resolve=>{
         setTimeout(resolve,ms)
     })
}

let sendNsleep = async (client) => {
	while(true){
		server.send("hihi", client.port, "127.0.0.1", err => {
			if(err){
				console.log(`send error: ${err}`);
			}else{
				console.log(`send ok`);
			}
		});
		await sleep(1000);
	}
};

gQue.process((job, done) => {
	console.log(job.data);
	console.log(`get queue from [${job.data.client.address}:${job.data.client.port}]`);
	sendNsleep(job.data.client);
	done();
});

server.on('error', err => {
	console.log(`error: ${error}`);
	server.close();
});

server.on('message', (msg, info) => {
	console.log(`received (${msg.length}) bytes from [${info.address}:${info.port}]`);
	console.log(`received data from  client: [${msg.toString()}]`);

	gQue.add({client: info});

		//server.send(msg, info.port, '127.0.0.1', err => {
		//	if(err){
		//		console.log(`send error: ${err}`);
		//	}else{
		//		console.log(`send ok`);
		//	}
		//});
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
//setTimeout(() => {
//	server.close();
//}, 8000);
