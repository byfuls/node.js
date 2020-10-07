const readline = require('readline');

const r = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});

//r.setPrompt('> ');
r.prompt();
r.on('line', line => {
	if(line == 'exit'){
		r.close();
	}
	console.log(line);
	r.prompt()
});

r.on('close', () => {
	process.exit();
});
