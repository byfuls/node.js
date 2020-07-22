var netcli = require('net');

//HOST = '172.30.1.2'
HOST = 'localhost'

var localPort = "";
var cli = new netcli.Socket();
cli.setEncoding('utf8');
cli.setTimeout(600000);
cli = netcli.connect({port:2219, host:HOST}, ()=>{
	console.log('connect ok');
	console.log(`local: ${this.localAddress}:${this.localPort}`)
	console.log(`remote: ${this.remoteAddress}:${this.remoteAddress}`)
	localPort = this.localPort;
	console.log(`client setting encoding: binary, timeout: 600000, local port: ${this.localPort}`);
}).on('close', ()=>{
	console.log(`client socket closed: ${localPort}`)
}).on('data', (data)=>{
	console.log(`received data: (${data.length}) ${data}`);
	cli.end();
}).on('end', ()=>{
	console.log(`client socket end`);
}).on('error', (err)=>{
	console.log(`client socket error: ${JSON.stringify(err)}`);
}).on('timeout', ()=>{
	console.log('client socket timeout');
}).on('drain', ()=>{
	console.log('client socket drain');
}).on('lookup', ()=>{
	console.log('client socket lookup');
}).write("hihi")
