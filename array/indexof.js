
const alpa1 = ['a', 'b', 'c', 'd'];
let ret1 = alpa1.indexOf('b');
console.log(ret1);

const alpa2 = ['a', 'b', 'c', 'd'];
let ret2 = alpa2.indexOf('b', 2);
console.log(ret2);

const alpa3 = ['a', 'b', 'c', 'd', 'b'];
let ret3 = alpa3.indexOf('b', 3);
console.log(ret3);

const alpa4 = [1, 2, 3, 4, 5, 3, 7, 8];
let ret4 = alpa4.indexOf(3, 3);
console.log(ret4);
console.log(alpa4[1]);
