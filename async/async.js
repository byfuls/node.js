function delayP(sec){
	console.log('3');
	return new Promise((resolve, reject)=>{
		console.log('4');
		setTimeout(()=>{
			console.log('5');
			resolve(new Date().toISOString());
		}, sec*1000);
	});
}

function myFunc(){
	return 'func';
}

function delayT(sec){
	return (
		setTimeout(()=>{
			new Date().toISOString();
		}, sec*1000)
	);
}

async function myAsync(){
	console.log('2');
	console.log('start');
	const time = await delayP(3).then((time)=>{
		console.log('6');
		return time
	});
	console.log('7');
	console.log('end');
	console.log(time);
	
	//const time = delayT(3);
	//console.log(time);

	//const result = await myFunc();
	//console.log(result);
	return 'async';
}

//console.log(myFunc());
//console.log(`return: ${myAsync()}`);
//console.log(delayP(3));

console.log('1');
myAsync().then((result)=>{
	console.log('8');
	console.log(result);
});
console.log('-----------------');
