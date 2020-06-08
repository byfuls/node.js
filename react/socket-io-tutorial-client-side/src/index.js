import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import socketio from 'socket.io-client';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// add & attach client side socket io
const socket = socketio.connect('/');
(() => {
  socket.emit('init', {name:'byfuls'});
  socket.emit('reply', "this is reply message");
  socket.on('news', (msg) => {
    console.log(msg);
  });
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
