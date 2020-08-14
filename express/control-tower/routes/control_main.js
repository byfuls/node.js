var express = require('express');
var router = express.Router();

/* GET users listing. */
//console.log('[DEB] regist !!!')
//router.get('/', function(req, res, next) {
//  console.log('[DEB] call !!!')
//  res.send('control_main');
//});

///////////////////////////////////////////////////////////////////////////////////////////////
// byfuls add - tcp server
const PORT = 3002;		// control tower main port
const net = require('net');

function prm_getClientResponse(client){
	console.log('1');
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			//resolve(client.on('data', data=>{
			//		console.log('2');
			//		return data;
			//	})
			//)
			resolve(new Date().toISOString());
		}, 3000);
	});
}

async function async_getClientResponse(client){
	console.log('start')
	const ret = await prm_getClientResponse(client).then((ret)=>{
		console.log(`end: ${ret}`)
	});
	console.log('3');
	//console.log(ret);
	return ret;
}

const svr = net.createServer((client)=>{
    console.log(`client connect: `);
    console.log(` -local: addr: ${client.localAddress}:${client.localPort}`);
    console.log(` -remote: addr: ${client.remoteAddress}:${client.remotePort}`);
    client.setTimeout(600000);
    client.setKeepAlive(10000);
    client.setEncoding('utf8');

    /* GET users listing. */
    console.log('[DEB] regist !!!')
    router.get('/', function(req, res, next) {
		console.log('[DEB] call !!!');
		client.write('ctl -p');

		res.send('control_main');
    });

    router.post('/print', function(req, res, next) {
		console.log('request print command to dest');
		client.write('ctl -p');
		console.log('waiting response from dest');
		async_getClientResponse(client).then((result)=>{
			console.log('4');
			//console.log(result);
		});
		console.log('------------------');
		//client.on('data', data=>{
		//	console.log('get print response from dest');
		//	console.log(data);
		//	console.log(typeof(data));
		//	console.log(data.length);
		//	//res.writeHead(200);
		//	//res.end(data);
		//	res
  //    		.status(200)
  //    		.json({ message: "Not match password and confirmPassword" });
  //    		//.end();
		//	//res.send(data);
		//	return;
		//});
	});

    //router.post('/list', function(req, res, next) {
		//client.write('ctl -l');
		//client.on('data', data=>{
			//console.log('get list response from dest');
			//console.log(data);
			//console.log(typeof(data));
			//console.log(data.length);
			//res.json(data);
		//});
    //});

	//router.post('/', function(req, res, next){
		//const command = req.body.command;
		//const serial = req.body.serial;

		//console.log(`[back-inf] loggedIn id: ${command}`);
		//console.log(`[back-inf] loggedIn password: ${serial}`);

		//let buf = Buffer.alloc(10, 'login');
		//let returnMessage = {
			//result: buf,
		//};
		//res.json(returnMessage);
	//});

}).listen(PORT, ()=>{
  console.log(`server listening: ${JSON.stringify(svr.address())}`);
  svr.on('close', ()=>{
    console.log(`server terminated`);
  }).on('error', (err)=>{
    console.log(`server error: ${JSON.stringify(err)}`);
  });
});

module.exports = router;
