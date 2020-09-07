let dateFormat = require('dateformat');
let now = new Date();
let time;
let sleep = require('sleep');

while(true){
	time = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss:l");
	console.log(time);
	sleep.msleep(100);
}

// ref : https://github.com/felixge/node-dateformat
