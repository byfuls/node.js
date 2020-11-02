const receivedMsg = 'pageSMS|c118-imei|510102582402017|0001000181F000000CF4F29C0E6A97E7F3F0B90C|1321|';

var parsing = parsing || {}; 
(function(_parsing) {
    _parsing.parse = (msg) => {
        let parser_data = msg.split("|");
        let obj = new Object;
        for(let i=0; i<parser_data.length-1; i++){
            if(i === 0){ 
                obj["command"] = parser_data[0];
            }else{
                obj["data"+i] = parser_data[i];
            }   
        }   

        return obj;
    };  
})(parsing);

let obj = parsing.parse(receivedMsg);
console.dir(obj);

if('pageSMS' == obj.command){
	const pdu = obj.data3;
	console.log(`pdu: ${pdu}`);
}
