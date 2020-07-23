import React from 'react';
import ReactDOM from 'react-dom';

// 조건부 연산자로 If-Else구문 인라인으로 표현하기
// 엘리먼트를 조건부로 렌더링하는 다른 방법은 조건부 연산자인 condition ? true: false를 사용하는 것입니다.

class IfElseInline extends React.Component {
	constructor(props){
		super(props);
		this.state = {isLoggedIn: false};
	}

	render(){
		const isLoggedIn = this.state.isLoggedIn;
		return (
			<div>
				The user is <b>{isLoggedIn? 'currently':'not'}</b> logged in.
			</div>
		);
	}
}

ReactDOM.render(
	<IfElseInline />,
	document.getElementById('root')
);
