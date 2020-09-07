let sleep = require('sleep');

console.log(process.env);

process.env.TZ = 'Asia/Seoul';
//process.env.TZ = 'Europe/Amsterdam';
console.log(process.env.TZ);

let tz = new Date(Date.now());
console.log(tz.toISOString());
console.log(tz.toLocaleDateString());
console.log(tz.toLocaleTimeString());

sleep.sleep(1);
console.log(process.env);

process.env.TZ = 'Asia/Singapore';
//process.env.TZ = 'Asia/Seoul';
console.log(process.env.TZ);

sleep.sleep(1);
console.log(process.env);

tz = new Date(Date.now());
console.log(tz.toISOString());
console.log(tz.toLocaleDateString());
console.log(tz.toLocaleTimeString());

time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
console.log(`Asia/Seoul time: ${time}`);
