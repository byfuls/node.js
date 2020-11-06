var hexdump = require('hexdump-nodejs');

let buf = Buffer.alloc(16);

let __pos = 0;


let length = 141
buf.writeUInt32BE(length, __pos);		__pos += 4;

console.log(hexdump(buf));
console.log("===========");
console.log(buf);
console.log(Buffer.from(buf));
console.log("===========");
//console.log(typeof(buf.buffer));
//console.log(buf.buffer);


length = buf.readUInt32BE(0);
console.log(length);
