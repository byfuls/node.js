import React from 'react';
import ReactDOM from 'react-dom';

class Toggle extends React.Component{
	constructor(props){
		super(props);
		this.state = {isToggleOn: true};

		// 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		this.setState(state=>({
			isToggleOn: !state.isToggleOn
		}));
	}

	render(){
		return (
			<button onClick={this.handleClick}>
			//<button onClick={()=>this.handleClick()}>
				{this.state.isToggleOn? 'ON':'OFF'}
			</button>
		);
	}
}

ReactDOM.render(
	<Toggle />,
	document.getElementById('root')
);

// [ Caution ]
// JSX 콜백 안에서 this의 의미에 대해 주의해야 합니다.
// JavaScript에서 클래스 메서드는 기본적으로 바인딩되어 있지 않습니다.
// this.handleClick을 바인딩하지 않고 onClick에 전달하였다면, 함수가 실제 호출될 때 this는 undefined가 됩니다.
// 이는 React만의 특수한 동작이 아니며, JavaScript에서 함수가 작동하는 방식의 일부입니다.
// 일반적으로 onClick={this.handleClick}과 같이 뒤에 ()를 사용하지 않고 메서드를 참조할 경우, 해당 메서드를 바인딩 해야 합니다.
//
// 위에 ()=>this.handleClick(), 이 문법의 문제점은 LoggingButton이 렌더링될 때마다 다른 콜백이 생성된다는 것입니다.
// 대부분의 경우 문제가 되지 않으나, 콜백이 하위 컴포넌트에 props로서 전달된다면 그 컴포넌트들은 추가로 다시 렌더링을 수행할 수도 있습니다.
// 이러한 종류의 성능 문제를 피하고자, 생성자 안에서 바인딩하거나 클래스 필드 문법을 사용하는 것을 권장합니다.


// [ 이벤트 핸들러에 인자 전달하기 ]
// 루프 내부에서는 이벤트 핸들러에 추가적인 매개변수를 전달하는 것이 일반적입니다. 예를 들어, id가 행의 ID일 경우 다음 코드가 모두 작동합니다.
//
// <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
// <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
// 위 두 줄은 동등하며 각각 화살표 함수와 Function.prototype.bind를 사용합니다.
//
// 두 경우 모두 React 이벤트를 나타내는 e 인자가 ID 뒤에 두 번째 인자로 전달됩니다.
// 화살표 함수를 사용하면 명시적으로 인자를 전달해야 하지만 bind를 사용할 경우 추가 인자가 자동으로 전달됩니다.
