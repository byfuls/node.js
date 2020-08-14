import React from 'react';
import logo from './logo.svg';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Home,} from './pages';

// [ref]
//  : https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Fetch%EC%9D%98_%EC%82%AC%EC%9A%A9%EB%B2%95

class LoggedIn extends React.Component {
	constructor(props){
		super(props);
		this.state = {id:'', password:''};
		this.handleId = this.handleId.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		console.log(this.props.history);
	}

	componentDidMount(){
		console.log('[front-deb] hi');
	}

	handleId(event){
		this.setState({id: event.target.value});
	}
	handlePassword(event){
		this.setState({password: event.target.value});
	}
	handleSubmit(event){
		console.log(`[front-deb] user: ${this.state.id} password: ${this.state.password}`);

		const url = 'http://192.168.242.131:3001/';
		let returnCode = {};
		let data = {
			id: this.state.id,
			password: this.state.password
		};
		fetch(url, {
		  method: 'POST', // or 'PUT'
		  body: JSON.stringify(data), // data can be `string` or {object}!
		  headers:{
		    'Content-Type': 'application/json'
		  }
		}).then(res => res.json())
		.then(response => {
			//returnCode = JSON.stringify(response);
			returnCode = response;
			console.log(`[front-deb] go!!`);
			//this.props.history.push('/home');
			console.log(`[front-inf] post ok! ${returnCode}`);
			console.log(`[front-inf] post ok! ${returnCode.result}`);

			if(returnCode.result){
				console.log(`[front-deb] go!!`);
				console.log(this.props);
				this.props.history.push('/home');
				console.log(this.props);
			}else{
				alert('Invalid identification');
			}
		})
		.catch(error => console.error(`[front-err] post err! ${error}`));


		event.preventDefault();
	}

	render(){
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					ID:
					<input type="text" value={this.state.id} onChange={this.handleId} />
				</div>
				<div>
					PASSWORD:
					<input type="password" value={this.state.password} onChange={this.handlePassword} />
				</div>
				<input type="submit" value="login" />
			</form>
		);
	}
}

function App(){
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={LoggedIn} />
				<Route path="/home" component={Home} />
			</Switch>
		</Router>
	);
}

export default App;
