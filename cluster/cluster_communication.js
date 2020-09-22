var cluster = require('cluster');

GLOBAL = new Array();

if(cluster.isMaster){
	var worker = cluster.fork();

	worker.on('message', msg => {
		console.log(`master received msg: ${msg} from ${worker.process.pid}`);
		console.log(GLOBAL[0]);
	});
	worker.send(`master: hi`);
}else{
	process.on('message', msg => {
		console.log(`worker received msg: ${msg} from master`);
		console.log(GLOBAL[0]);
	});
	GLOBAL.push('a');
	process.send(`worker: hello`);
}
