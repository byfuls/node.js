import React from 'react';
import ReactDOM from 'react-dom';

// [다중 입력 제어하기]
// 여러 input 엘리먼트를 제어해야할 때,
// 각 엘리먼트에 name 어트리뷰트를 추가하고 event.target.name 값을 통해 핸들러가 어떤 작업을 할 지 선택할 수 있게 해줍니다.
//
// 주어진 input 태그의 name에 일치하는 state를 업데이트하기 위해 ES6의 computed property name 구문을 사용하고 있습니다.
// this.setState({
//   [name]: value
// });

class Reservation extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isGoing: true,
			numberOfGuests: 2
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event){
		const target = event.target;
		const value = target.name === 'isGoing'? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	render(){
		return (
			<form>
				<label>
					Is going:
					<input
						name="isGoing"
						type="checkbox"
						checked={this.state.isGoing}
						onChanged={this.handleInputChange} />
				</label>
				<br />
				<label>
					Number of guests:
					<input
						name="numberOfGuests"
						type="number"
						value={this.state.numberOfGuests}
						onChange={this.handleInputChange} />
				</label>
			</form>
		);
	}
}
