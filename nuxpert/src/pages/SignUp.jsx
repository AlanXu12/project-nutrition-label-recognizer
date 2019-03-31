import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Result from './Result.jsx';
import NavBar from '../components/Navigation.jsx';
import SignUpForm from '../components/SignUpForm.jsx';

class SignUp extends Component {

  render() {
    return (
      <div>
        <NavBar { ...this.props } />
        <SignUpForm { ...this.props }/>
      </div>
    );
  }
}

export default SignUp;
