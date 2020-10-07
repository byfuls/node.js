const cluster = require('cluster');
const MAX_CLUSTER_COUNT = 2;
const netcli = require('net');
const readline = require('readline');
const r = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});
r.prompt();

HOST = '127.0.0.1';
PORT = 2219;
CLI = new netcli.Socket();
CLI.setEncoding('utf8');
CLI.setTimeout(60000);
CLI = netcli.connect({port:PORT, host:HOST}, () => {
    console.log('connect ok');

	r.on('line', line => {
		if(line == 'exit'){
			r.close();
		}
		//console.log(line);
		CLI.write(line);

		r.prompt();
	});
	r.on('close', () => {
		process.exit();
	});
}).on('data', data => {
    console.log(`received data: ${data.length} ${data}`);
});
