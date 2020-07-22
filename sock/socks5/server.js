var socks = require('socksv5');
var dict = {};
const USER = 'regist';
const PSWD = 'regist123';

class socksSock {
	constructor(srcAddr, srcPort, dstAddr, dstPort, socket){
		this._IP_LEN = 3+1+3+1+3+1+3;
		this._PORT_LEN = 5

		this._srcAddr = srcAddr;
		this._srcPort = srcPort;
		this._dstAddr = dstAddr;
		this._dstPort = dstPort;
		this._socket = socket;

		this._srcKey = `${socket.remoteAddress}:${socket.remotePort}`;
		this._dstKey = `${this._dstAddr}:${this._dstPort}`;

		this._headbuf = new Buffer.alloc(this._IP_LEN+this._PORT_LEN);
		this._buf = 0;
	};
	get headIp(){
		return this._headbuf = this._buf.copy(0, this._IP_LEN+this._PORT_LEN)
	};
	set headIp(addr){
		this._headbuf = Buffer.from(addr);
	};
	get buf(){
		return this._buf;
	};
	set buf(data){
		//this._headbuf = `${this._socket.remoteAddress}:${this._socket.remotePort}`;
		this._buf = new Buffer.from(data);
		this._buf = Buffer.concat([this._headbuf, this._buf]);
	};
	get srcAddr(){
		return this._srcAddr;
	};
	set srcAddr(addr){
		this._srcAddr = addr;
	};
	get srcPort(){
		return this._srcPort;
	};
	set srcPort(port){
		this._srcPort = port;
	};
	get dstAddr(){
		return this._dstAddr;
	};
	set dstAddr(addr){
		this._dstAddr = addr;
	};
	get dstPort(){
		return this._dstPort;
	};
	set dstPort(port){
		this._dstPort = port;
	};
	get socket(){
		return this._socket;
	};
	get srcKey(){
		return this._srcKey;
	};
	set srcKey(k){
		this._srcKey = k;
	};
	get dstKey(){
		return this._dstKey;
	};

	validateIPaddress(){
		const address = this._headbuf;
		const ipaddress = address.slice(0,this._IP_LEN);
		console.log(`ipaddress: ${ipaddress}`);
		//if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
		if (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):[0-9]+$/g.test(ipaddress)) {  
			return (true)  
		}  
		//alert("You have entered an invalid IP address!")  
		return (false)  
	}
};


var svr = socks.createServer((info, accept, deny)=>{
	const TIMEOUT = 600000;
	const KEEPALIVE = 10000;
	console.log(info);
	console.log(`info.dstAddr: ${info.dstAddr}`);
	console.log(`info.dstPort: ${info.dstPort}`);
	socket = accept(true);
	socket.setTimeout(TIMEOUT);
	socket.setKeepAlive(true, KEEPALIVE);
	socket.on('close', ()=>{
		let key = `${socket.remoteAddress}:${socket.remotePort}`;
		console.log(`key: ${key}`);
		delete dict[key];
		console.log(`dict count: ${Object.keys(dict).length}`);
		console.log(`socket closed`);
	});
	//console.log(socket);

	console.log(`socket.address:`);
	console.log(socket.address());
	console.log(`socket.remoteAddress: ${socket.remoteAddress}`);
	console.log(`socket.remoteFamily: ${socket.remoteFamily}`);
	console.log(`socket.remotePort: ${socket.remotePort}`);

	//if( socket.address().address == info.dstAddr && socket.address().port == info.dstPort ){
	//	console.log('regist!!!');
	//}
	
	socket.on('data', (data)=>{
		ss = new socksSock(info.srcAddr, info.srcPort, info.dstAddr, info.dstPort, socket);
		ss.buf = data
		console.log(`key: ${ss.srcKey}`);
		console.log(`local: ${socket.localAddress}:${socket.localPort}`);
		console.log(`remote: ${socket.remoteAddress}:${socket.remotePort}`);
		console.log(`received data: ${ss.buf}`);
		console.log(`forward to: ${ss.headIp}`);
		if('regist' === data.toString('utf8')){
			console.log(`regist, key: ${ss.dstKey}`)
			dict[ss.dstKey] = ss;
			console.log(`dict count: ${Object.keys(dict).length}`);
			//socket.write('regist ok');
		}else{
			console.log(`looking for ${ss.dstKey}`);
			if(ss.dstKey in dict){
				console.log(`exist in dict!!!, dstKey: ${ss.dstKey}`);
				dss = dict[ss.dstKey]
				dss.headIp = `${socket.remoteAddress}:${socket.remotePort}`;
				dss.buf = data
				console.log(dss.buf);
				dss.socket.write(dss.buf);
			}else{
				console.log(`not exist in dict!!!, dstKey: ${ss.dstKey}`);
			}
			
		}
	});

	//dict[ss.srcKey] = ss;
	//console.log(`dict count: ${Object.keys(dict).length}`);
	//console.log(ss);
	
	// socket choose REGIST or BYPASS

	//if(ss.dstKey in dict){
	//	console.log(`exist in dict!!!, dstKey: ${ss.dstKey}`);
	//	dss = dict[ss.dstKey]
	//	dss.socket.write('hihi');
	//}else{
	//	console.log(`not exist in dict!!!, dstKey: ${ss.dstKey}`);
	//}


}).listen(1080, 'localhost', ()=>{
	console.log(`socks server listening on port 1080`);
}).useAuth(socks.auth.UserPassword((user, password, cb)=>{
	console.log(`user authentication`);
	console.log(`login user: ${user}, password: ${password}`);
	cb(user == USER && password == PSWD);
}));
