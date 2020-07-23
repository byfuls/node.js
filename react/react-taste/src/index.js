import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

import childrenComponentEx1 from './childrenComponentEx1';
//import controlledComponent_statusEx2_1 from './controlledComponent_statusEx2-1';
//import controlledComponent_statusEx2 from './controlledComponent_statusEx2';
//import controlledComponent_statusEx1 from './controlledComponent_statusEx1';
//import controlledComponent_multiInput from './controlledComponent_multiInput';
//import controlledComponent_select from './controlledComponent_select';
//import controlledComponent_textarea from './controlledComponent_textarea';
//import controlledComponent_input from './controlledComponent_input';
//import keyEx1 from './keyEx1';
//import listEx2 from './listEx2';
//import listEx1 from './listEx1';
//import blockRendering from './blockRendering';
//import inlineEx2 from './inlineEx2';
//import inlineEx1 from './inlineEx1';
//import ConditionRenderingEx2 from './ConditionRenderingEx2';
//import ConditionRenderingEx1 from './ConditionRenderingEx1';
//import ClassEventEx1 from './ClassEventEx1';
//import ClassComponentEx1 from './ClassComponentEx1';
//import ComponentEx2 from './ComponentEx2';
//import ComponentEx1 from './ComponentEx1';

///////////////////////////////////////////////////////
// -= ori =-
//ReactDOM.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>,
//  document.getElementById('root')
//);

///////////////////////////////////////////////////////
// #1
//const name = 'Josh Perez';
//const element = <h1> Hello, {name} </h1>

///////////////////////////////////////////////////////
// #2
//function formatName(user){
//	return user.firstName + ' ' + user.lastName;
//}
//const user = {
//	firstName: 'Harper',
//	lastName: 'Perez'
//};
//const element = (
//	getGreeting(user)
//);
//function getGreeting(user){
//	if(user){
//		return <h1> Hello, {formatName(user)}~ </h1>;
//	}
//	return <h1> Hello, Stranger. </h1>;
//}
//ReactDOM.render(
//	element,
//	document.getElementById('root')
//);

///////////////////////////////////////////////////////
// #3
//function tick(){
//	const element = (
//		<div>
//			<h1> Hello, world! </h1>
//			<h2> It is {new Date().toLocaleTimeString()}.</h2>
//		</div>
//	);
//	ReactDOM.render(element, document.getElementById('root'));
//}
//setInterval(tick, 1000);

///////////////////////////////////////////////////////
// #3   < Components and Props >
//  -1. function components
//  	: component must be big letter
//function Welcome(props){
//	return <h1> Hello, {props.name} </h1>;
//}
//const element = <Welcome name="Sara" />;
//ReactDOM.render(
//	element,
//	document.getElementById('root')
//);
//
//function Welcome(props){
//	return <h1> Hello, {props.name} </h1>;
//}
//function App(){
//	return (
//		<div>
//			<Welcome name="Sara" />
//			<Welcome name="Byfuls" />
//			<Welcome name="Channel" />
//		</div>
//	);
//}
//ReactDOM.render(
//	<App />,
//	document.getElementById('root')
//);







// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
