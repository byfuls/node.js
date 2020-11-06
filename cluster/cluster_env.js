const cluster = require('cluster'),
	os = require('os');

if(cluster.isMaster) {
	console.log('master start');
	for(let i=0; i<os.cpus().length; i++) {
		let new_worker_env = {};
		new_worker_env.worker_name = "worker "+i;

		new_worker = cluster.fork(new_worker_env);
		new_worker.process.env = new_worker_env
	}

	cluster.on('exit', (worker, code, sig) => {
		console.log(`worker(${worker.id}) down, code(${code}) sig(${sig})`);
		console.log('---');
		console.dir(worker.process.env);
		console.log('---');
		console.dir(worker);
	});

} else {
	console.log('worker start');
	console.log(process.env.worker_name);
}
