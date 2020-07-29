function delayP(sec){
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			resolve(new Date().toISOString());
		}, sec*1000);
	});
}

function myFunc(){
	return 'func';
}

async function myAsync(){
	//const time = await delayP(3).then((time)=>{
	//	return 'x'
	//});
	//console.log(time);
	const result = await myFunc();
	console.log(result);
	return 'async';
}

//console.log(myFunc());
//console.log(myAsync());
//console.log(delayP(3));

myAsync().then((result)=>{
	console.log(result);
});
