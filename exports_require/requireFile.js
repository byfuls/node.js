
const reqVar_func = require('./exportsFile_func');
console.log(`[req-func] a: ${reqVar_func.a(1,2)}`);
console.log(`[req-func] b: ${reqVar_func.b(1,2)}`);

const reqVar_obj = require('./exportsFile_obj');
console.log(`[req-obj] a_sum: ${reqVar_obj.a_sum(1,2)}`);
console.log(`[req-obj] b_mul: ${reqVar_obj.b_mul(1,2)}`);

const reqVar_var = require('./exportsFile_var');
console.log(`[req-var] var: ${reqVar_var.var}`);
