var netsvr = require('net');

var svr = netsvr.createServer((client)=>{
	console.log(`client connect:`);
	console.log(`	local, addr:${client.localAddress}/port:${client.localPort}`);
	console.log(`	remote, addr:${client.remoteAddress}/port:${client.remotePort}`);

	client.setTimeout(500);
	client.setEncoding('utf8');

	client.on('data', (data)=>{
		console.log(`received data from client(${client.remoteAddress}:${client.remotePort}) data: ${data.toString()}`);
	});
});

svr.listen(2219, ()=>{
	console.log(`server listening: ${JSON.stringify(svr.address())}`);
	svr.on('close', ()=>{
		console.log(`server terminated`);
	});
	svr.on('error', (err)=>{
		console.log(`server error: ${JSON.stringify(err)}`)
	});
});
