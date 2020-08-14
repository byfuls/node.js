import React from 'react';

let _callPrint = (reqCommand) => {
	let returnCode;
	console.log('[_callPrint] fetch start');
	return (fetch('http://192.168.242.131:3001/control_main/print', {
			method: 'POST', // or 'PUT'
			body: JSON.stringify(reqCommand), // data can be `string` or {object}!
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => {
			console.log('res');
			res.json();
		})
		.then(response => {
			console.log('response');
			JSON.stringify(response)
		})
		.catch(error => console.error(`[front-err] post err! ${error}`))
    );
};

let _process_print = async () => {
	let reqCommand = {
		command: 'print',
		serial: ''
	};
	console.log('1');
	const ret = await _callPrint(reqCommand);
	console.log('2');
	return ret
};

class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {command: 0, output: 0, print: 0};
		this.buttonPrint = this.buttonPrint.bind(this);
		this.buttonList = this.buttonList.bind(this);
		this.outputSection = this.outputSection.bind(this);
	}

	componentDidMount(){
	}

	/* print */
	callPrint = async () => {
		const ret = await _process_print();
		console.log(`[callPrint] ret: ${ret} typeof: ${typeof(ret)}`);
		console.log(ret);
		this.setState({
			print: ret
		});
	};
	buttonPrint(event){
		this.setState({
			command: 'print',
		});
		
		this.callPrint();
	}
	/* list */
	callList = async () => {
		const ret = await _process_print();
		console.log(`[callList] ret: ${ret} typeof: ${typeof(ret)}`);
		console.log(ret);
		this.setState({
			print: ret
		});
	};
	buttonList(event){
		this.setState({
			command: 'list',
		});
		
		this.callList();
	}

	outputSection(){
		let command = this.state.command;
		if(command === 'print'){
			console.log('!!! PRINT !!!');
			console.log(this.state.print);
			console.log(typeof(this.state.print));
			return (
				<h1>{typeof(this.state.print)=="string"? this.state.print:'loading...'}</h1>
			);
		}else if(command === 'list'){
			return (
				<h3> output list section </h3>
			);
		}else{
			return (
				<h3> unknown </h3>
			);
		}
	}
	render(){
		return (
			<div>
				<section>
					<header>
						<h2> Home page </h2>
					</header>
					<nav>
						<ul>
							<li>
								<button onClick={this.buttonPrint}>
									print
								</button>
							</li>
							<li>
								<button onClick={this.buttonList}>
									list
								</button>
							</li>
						</ul>
					</nav>

					<section>
						<this.outputSection />
					</section>
				</section>
			</div>
		);
	}
}

export default Home;
