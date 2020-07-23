import React from 'react';
import ReactDOM from 'react-dom';

// [select]
// HTML에서 <select>는 드롭 다운 목록을 만듭니다.
// selected 옵션이 있으므로 Coconut 옵션이 초기값이 되는 점을 주의해주세요. 
// React에서는 selected 어트리뷰트를 사용하는 대신 최상단 select태그에 value 어트리뷰트를 사용합니다. 
// 한 곳에서 업데이트만 하면되기 때문에 제어 컴포넌트에서 사용하기 더 편합니다
//
// 전반적으로 <input type="text">, <textarea> 및 <select> 모두 매우 비슷하게 동작합니다. 모두 제어 컴포넌트를 구현하는데 value 어트리뷰트를 허용합니다.
//
// 주의
// select 태그에 multiple 옵션을 허용한다면 value 어트리뷰트에 배열을 전달할 수 있습니다.
// <select multiple={true} value={['B', 'C']}>

class FlavorForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {value: 'coconut'};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event){
		this.setState({value: event.target.value});
	}

	handleSubmit(event){
		alert('Your favorite flavor is: '+this.state.value);
		event.preventDefault();
	}

	render(){
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Pick your favorite flavor:
					<select value={this.state.value} onChange={this.handleChange}>
						<option value="grapefruit">Grapefruit</option>
						<option value="lime">Lime</option>
						<option value="coconut">Coconut</option>
						<option value="mango">Mango</option>
					</select>
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

ReactDOM.render(
	<FlavorForm />, document.getElementById('root')
);
