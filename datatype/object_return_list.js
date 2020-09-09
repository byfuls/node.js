
let obj = {
	sender: "jason",
	receiver: "peter",
	number: "123444112",
	message: "hi, there"
};

console.log(obj);
console.log(JSON.stringify(obj));
console.log(JSON.parse(JSON.stringify(obj)));

let obj_expected_list = ['sender', 'receiver', 'expected key', 'number', 'message'];
//let obj_expected_list = ['sender', 'receiver', 'number', 'message'];
/*--- 1 method */
//let cons = obj_expected_list.forEach((key) => {
//	let ret = key in obj;
//	console.log(`key:${key} ret:${ret}`);
//	if(ret == false){
//		console.log(`during expected data searching, but i did not received data. that field: ${key}`);
//	}else{
//	}
//});

/*--- 2 method */
let obj_check = (obj_expected_list, dest_obj) => {
	for(var i=0; i<obj_expected_list.length; i++){
		let key = obj_expected_list[i];
		let ret = key in dest_obj;
		console.log(`key: ${key} ret: ${ret}`);
		if(ret == false){
			console.log(`during expected data searching, but i did not received data. that field: ${key}`);
			return false;
		}
	}
	return true
};
let cons = obj_check(obj_expected_list, obj);
console.log(`result: ${cons}`);
