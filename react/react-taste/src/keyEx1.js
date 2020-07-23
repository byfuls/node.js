import React from 'react';
import ReactDOM from 'react-dom';

// [key]
// Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕습니다. 
// key는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야 합니다.
//
// Key를 선택하는 가장 좋은 방법은 리스트의 다른 항목들 사이에서 해당 항목을 고유하게 식별할 수 있는 문자열을 사용하는 것입니다. 
// 대부분의 경우 데이터의 ID를 key로 사용합니다.

function ListItem(props) {
	// 맞습니다! 여기에는 key를 지정할 필요가 없습니다.
	return <li>{props.value}</li>;
}

function NumberList(props) {
	const numbers = props.numbers;
	const listItems = numbers.map((number) =>
	// 맞습니다! 배열 안에 key를 지정해야 합니다.
		<ListItem key={number.toString()} value={number} />
	);
	return (
		<ul>
			{listItems}
		</ul>
	);
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
	<NumberList numbers={numbers} />,
	document.getElementById('root')
);

// [tip]
// 경험상 map() 함수 내부에 있는 엘리먼트에 key를 넣어 주는 게 좋습니다.
