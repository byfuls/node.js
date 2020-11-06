

console.log('child start');
console.dir(process.argv);

for(let i=0; i<process.argv.length; i++) {
	console.log(`arg[${i}]: ${process.argv[i]}`);
}
