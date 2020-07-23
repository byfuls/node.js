import React from 'react';
import ReactDOM from 'react-dom';

// 논리 && 연산자로 If를 인라인으로 표현하기
// JSX 안에는 중괄호를 이용해서 표현식을 포함 할 수 있습니다.
// 그 안에 JavaScript의 논리 연산자 &&를 사용하면 쉽게 엘리먼트를 조건부로 넣을 수 있습니다.

function MailBox(props){
	const unreadMessages = props.unreadMessages;
	return (
		<div>
			<h1>Hello!</h1>
			{unreadMessages.length > 0 &&
				<h2>
					You have {unreadMessages.length} unread messages.
				</h2>
			}
		</div>
	);
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
	<MailBox unreadMessages={messages} />,
	document.getElementById('root')
);

// JavaScript에서 true && expression은 항상 expression으로 평가되고 false && expression은 항상 false로 평가됩니다.
// 따라서 && 뒤의 엘리먼트는 조건이 true일때 출력이 됩니다. 조건이 false라면 React는 무시합니다.
