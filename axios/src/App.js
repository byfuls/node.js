import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

function postData(){
  axios.post('https://reqres.in/api/register', {
    "email": "eve.holt@reqres.in",
    "password": "pistol"
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
}

function getData(){

  // Make a request for a user with a given ID
  axios.get('https://reqres.in/api/users?page=2')
  .then(response => {
    // handle success
    console.log(response.data);
  })
  .catch(error => {
    // handle error
    console.log(error);
  })
  .then(() => {
    // always executed
  });
}

function App() {
  return (
    <div className="App">
      <button onClick={getData}>get data</button>
      <button onClick={postData}>post data</button>
    </div>
  );
}

export default App;
