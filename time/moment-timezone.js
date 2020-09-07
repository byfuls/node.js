"use strict";
let moment = require('moment-timezone');
let sleep = require('sleep');
let time;

console.log('---------------------------------------');
time = moment().tz('Europe/Amsterdam').format();
console.log(`Europe/Amsterdam time: ${time}`);
time = moment().tz('Asia/Seoul').format();
console.log(`Asia/Seoul time: ${time}`);
time = moment().tz('America/Los_Angeles').format();
console.log(`Ameria/Los_Angeles time: ${time}`);

/*--- formatting */
console.log('---------------------------------------');
time = moment().tz('Europe/Amsterdam').format('YYYY-MM-DD HH:mm:SS');
console.log(`Europe/Amsterdam time: ${time}`);


console.log('---------------------------------------');
while(true){
	time = moment().tz('Asia/Singapore').format('YYYY-MM-DD HH:mm:SS Z');
	console.log(`Asia/Singapore time: ${time}`);
	sleep.msleep(100);
}
