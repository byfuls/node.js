
const alpa1 = ['a', 'b', 'c', 'd'];
alpa1.splice(1, 0, '1');
console.log(alpa1);
/* output = [ 'a', '1', 'b', 'c', 'd' ] */

const alpa2 = ['a', 'b', 'c', 'd'];
alpa2.splice(2, 1);
console.log(alpa2);
/* output = [ 'a', 'b', 'd' ] */

const alpa3 = ['a', 'b', 'c', 'd'];
alpa3.splice(3, 1, '7');
console.log(alpa3);

/* con
 * array.splice(start [,deleteCount [, item1 [, item2 [, ...]]]])
 */
