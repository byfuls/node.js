
const netcli = require('net');

var cli = new netcli.Socket();
cli.setEncoding('utf8');
cli = netcli.connect({port:60000, host:"52.77.222.175"}, ()=>{
    console.log('connect ok');
    cli.write('changed data');
    console.log('write ok');
	cli.destroy();
});
