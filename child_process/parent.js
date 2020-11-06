
const cp = require('child_process');
let args = ['arg1', 'arg2', 'arg3'];
let options = {
	encoding: 'utf8',
	flag: 'a'
}

child = cp.fork('/home/byfuls/node.js/child_process/child.js', args, options);
child.on('message', data => {
	console.log(data);
});
