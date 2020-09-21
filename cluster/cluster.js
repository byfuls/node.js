const cluster = require('cluster');
const os = require('os');

if(cluster.isMaster){
	os.cpus().forEach(cpu => {
		cluster.fork();
	});

	cluster.on('exit', (worker, code, sig) => {
		console.log(`worker end: ${worker.id}`);
		if(code == 200){
			cluster.fork();
		}
	});
}else{
	console.log('worker ready: '+ cluster.worker.id);
}
