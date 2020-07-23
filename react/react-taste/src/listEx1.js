import React from 'react';
import ReactDOM from 'react-dom';

const numbers = [1,2,3,4,5];
const doubled = numbers.map((number) => number*2);
console.log(doubled);


const listItems = numbers.map((number) =>
	<li>{number}</li>
);

ReactDOM.render(
	<ul>{listItems}</ul>,
	document.getElementById('root')
);
