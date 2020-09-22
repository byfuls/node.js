const cluster = require('cluster');
const os = require('os');

const netsvr = require('net');

if(cluster.isMaster){
	os.cpus().forEach(cpu => {
		cluster.fork();
	});

	cluster.on('exit', (worker, code, sig) => {
		console.log(`worker end: ${worker.id}`);
		//if(code == 200){
			cluster.fork();
		//}
	});
}else{
	console.log('worker ready: '+ cluster.worker.id);

	var svr = netsvr.createServer((client)=>{
	    console.log(`[${cluster.worker.id}]client connect:`);
	    console.log(`[${cluster.worker.id}]   local, addr:${client.localAddress}/port:${client.localPort}`);
	    console.log(`[${cluster.worker.id}]   remote, addr:${client.remoteAddress}/port:${client.remotePort}`);
	
	    client.setTimeout(500);
	    client.setEncoding('utf8');
	
	    client.on('data', (data)=>{
	        console.log(`[${cluster.worker.id}] received data from client(${client.remoteAddress}:${client.remotePort}) data: ${data.toString()}`);
	        client.write(data);
	    });
	});
	
	svr.listen(3001, '127.0.0.1', ()=>{
	    console.log(`[${cluster.worker.id}] server listening: ${JSON.stringify(svr.address())}`);
	    svr.on('close', ()=>{
	        console.log(`[${cluster.worker.id}] server terminated`);
	    });
	    svr.on('error', (err)=>{
	        console.log(`[${cluster.worker.id}] server error: ${JSON.stringify(err)}`)
	    });
	});
}
