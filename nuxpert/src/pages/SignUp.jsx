import React, { Component } from 'react';
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
