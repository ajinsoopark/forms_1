import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './form.js';


class App extends Component {
  constructor () {
    super ()
    this.state = {
      completeForm: {},
      submitted: false
    }
  }

  onSubmit
  render() {
    return (
      <div className="App">
        <Form onSubmit={ this.onSubmit }/>
      
      </div>
    );
  }
}

export default App;
