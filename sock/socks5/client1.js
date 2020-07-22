var socks = require('socksv5');
var sleep = require('sleep');

var client = socks.connect({
	host: '127.0.0.1',
	port: 1081,
	proxyHost: '127.0.0.1',
	proxyPort: 1080,
	auths: [ socks.auth.UserPassword('regist', 'regist123') ]
}, function(socket) {
	console.log('>> Connection successful');
	socket.write('regist');
	socket.on('data', (data)=>{
		console.log(`receive: ${data}`);
		sleep.sleep(1);
		socket.write('re-hi');
	});
});
