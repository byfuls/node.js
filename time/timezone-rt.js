let sleep = require('sleep');

console.log(process.env);

process.env.TZ = 'Asia/Seoul';
console.log(process.env.TZ);

//let tz = new Date(Date.now());
let tz = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
//console.log(tz.toISOString());
//console.log(tz.toLocaleDateString());
//console.log(tz.toLocaleTimeString());


while(true){
	time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
	console.log(`Asia/Seoul time: ${time}`);
	sleep.msleep(100);
}
