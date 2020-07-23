import React from 'react';
import ReactDOM from 'react-dom';

// 다른 컴포넌트에 의해 렌더링될 때 컴포넌트 자체를 숨기고 싶을 때가 있을 수 있습니다.
// 이때는 렌더링 결과를 출력하는 대신 null을 반환하면 해결할 수 있습니다.

function WarningBanner(props){
	if(!props.warn){
		return null;
	}
	return (
		<div className="warning">
			Warning!
		</div>
	);
}

class Page extends React.Component {
	constructor(props){
		super(props);
		this.state = {showWarning: true};
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick(){
		this.setState(state => ({
			showWarning: !state.showWarning
		}));
	}

	render(){
		return (
			<div>
				<WarningBanner warn={this.state.showWarning} />
				<button onClick={this.handleToggleClick}>
					{this.state.showWarning? 'Hide':'Show'}
				</button>
			</div>
		);
	}
}

ReactDOM.render(
	<Page />,
	document.getElementById('root')
);
