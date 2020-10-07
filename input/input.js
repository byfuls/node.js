const readline = require('readline');

const r = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});

r.question("INPUT: ", answer => {
	console.log(answer);
	r.close()
});
