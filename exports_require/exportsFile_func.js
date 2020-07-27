
function a_sum(x,y){
	return x+y;
}

const b_sum = (x,y) => {
	return x+y;
}

const c_sum = (x,y) => {
	return x+x+y+y;
}

console.log(`[exp] a: ${a_sum(1,2)}`);
console.log(`[exp] b: ${b_sum(1,2)}`);
console.log(`[exp] c: ${c_sum(1,2)}`);

exports.a = a_sum;
exports.b = b_sum;
