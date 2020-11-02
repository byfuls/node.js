const buf1 = Buffer.alloc(16);
const buf2 = Buffer.alloc(16);


buf1.write("SMS");
buf2.write("SMS");
console.log(Buffer.compare(buf1, buf2));
// 0

buf1.write("SMS");
buf2.write("|||SMS");
console.log(Buffer.compare(buf1, buf2));
// -1

buf1.write("SMS");
buf2.write("|||SMS");
console.log(buf1.compare(buf2, 3, 6, 0, 3));
// 0
