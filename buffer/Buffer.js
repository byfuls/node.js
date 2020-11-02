var hexdump = require('hexdump-nodejs');

let buf = Buffer.alloc(128);

let __pos = 0;

buf.write("SMS", __pos);			__pos += "SMS".length;
buf.write("|", __pos);				__pos += 1;

buf.write("SEND", __pos);			__pos += "SEND".length;
buf.write("|", __pos);				__pos += 1;

let pid = 0
buf.writeUInt32BE(pid, __pos);		__pos += 4;
buf.write("|", __pos);				__pos += 1;

let keyLength = 5
buf.writeUInt8(keyLength, __pos);	__pos += 1;
buf.write("|", __pos);				__pos += 1;

let key = "51010"
buf.write(key, __pos);				__pos += key.length;
buf.write("|", __pos);				__pos += 1;

let dataLength = 7
buf.writeUInt32BE(dataLength, __pos);	__pos += 4;
buf.write("|", __pos);				__pos += 1;

let data = "Hello!!"
buf.write(data, __pos);				__pos += data.length;
buf.write("|", __pos);				__pos += 1;

//console.log(hexdump(buf));
console.log("===========");
console.log(buf);
console.log(Buffer.from(buf));
console.log("===========");
//console.log(typeof(buf.buffer));
//console.log(buf.buffer);
