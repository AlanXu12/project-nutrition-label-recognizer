import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Result from './Result.jsx';
import NavBar from '../components/Navigation.jsx';
import SignUpForm from '../components/SignUpForm.jsx';

class SignUp extends Component {

  state = {
    redirect: false,
    someData: [1, 2]
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  resultRedirect = () => {
    if (this.state.redirect) {
      return (
        <Result someData={this.state.someData}/>
      );
    }
  }

  render() {
    console.log(this.state.someData);
    return (
      <div>
        <NavBar />
        {this.resultRedirect()}
        {/*<button onClick={this.setRedirect}>To Result Page</button>*/}
        <SignUpForm />
      </div>
    );
  }
}

export default SignUp;
