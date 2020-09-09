var queue = require('bull');

var msg_q = new queue('bull queue taste');
var multi_var = 'hihi';

msg_q.add({
	sender: 'jason',
	receiver: 'peter'
});

exports.que = msg_q;
exports.var = multi_var;
