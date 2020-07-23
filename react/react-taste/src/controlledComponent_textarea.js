import React from 'react';
import ReactDOM from 'react-dom';

// [textarea]
// HTML에서 <textarea> 엘리먼트는 텍스트를 자식으로 정의합니다.
// React에서 <textarea>는 value 어트리뷰트를 대신 사용합니다. 이렇게하면 <textarea>를 사용하는 폼은 한 줄 입력을 사용하는 폼과 비슷하게 작성할 수 있습니다.
// this.state.value를 생성자에서 초기화하므로 textarea는 일부 텍스트를 가진채 시작되는 점을 주의해주세요.

class EssayForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'Please write an essay about your favorite DOM element.'
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		alert('An essay was submitted: '+this.state.value);
		event.preventDefault();
	}

	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				<label>
					Essay:
					<textarea value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

ReactDOM.render(
	<EssayForm />,
	document.getElementById('root')
);
