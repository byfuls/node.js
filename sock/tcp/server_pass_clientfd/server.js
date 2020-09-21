const netsvr = require('net');
const queue = require('bull');

var passQue = queue('client_fd');

var client_fd = null;

var client_list = new Object;

passQue.process((job, done) => {
	//console.log(job.data);
	//console.log(client_list);
	try{
		client_list.key.write('321');
	}catch(e){
		console.log(`error: ${e}`);
	}
	done();
});

var svr = netsvr.createServer((client)=>{
    console.log(`client connect:`);
    console.log(`   local, addr:${client.localAddress}/port:${client.localPort}`);
    console.log(`   remote, addr:${client.remoteAddress}/port:${client.remotePort}`);

    //client.setTimeout(500);
    client.setEncoding('utf8');

    client.on('data', (data)=>{
        console.log(`received data from client(${client.remoteAddress}:${client.remotePort}) data: ${data.toString()}`);
		//client_fd = client;
		client_list.key = client;
		passQue.add({
			data: data,
		});
		//client.write('123');
    });
});

svr.listen(2219, ()=>{
    console.log(`server listening: ${JSON.stringify(svr.address())}`);
    svr.on('close', ()=>{
        console.log(`server terminated`);
    });
    svr.on('error', (err)=>{
        console.log(`server error: ${JSON.stringify(err)}`)
    });
});
