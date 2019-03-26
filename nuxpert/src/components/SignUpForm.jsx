import React, { Component } from 'react';
import ReactSignupLoginComponent from 'react-signup-login-component';
import './SignUpForm.css';


class SignUpForm extends Component {

  state = {
    errorMsg: '',
  }

  // helper function for sending signup info to backend
  sendSignUpRequest = async (username, password) => {
    const response = await fetch('/signup/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    if (body) {
      // TODO: update / redirect to some page
      // this.setState({
      //
      // });
      console.log("Successfully get response from backend...");
    }
  };

  // helper function for sending signin info to backend
  sendSignInRequest = async (username, password) => {
    const response = await fetch('/signin/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    if (body) {
      // TODO: update / redirect to some page
      // this.setState({
      //
      // });
      console.log("Successfully get response from backend...");
    }
  };


  render() {

    // the handler function for signup
    const signupWasClickedCallback = (data) => {
      // get all user inputs
      const username = data.username;
      const password = data.password;
      const passwordConfirmation = data.passwordConfirmation;
      // check if the password matches passwordConfirmation
      if (passwordConfirmation != password) {
        this.setState({
          errorMsg: 'Password confirmation does not match your password!'
        });
      }
      // send username and password to the backend
      console.log(username, password, passwordConfirmation);
      this.sendSignUpRequest(username, password);
    };

    // the handler function for login
    const loginWasClickedCallback = (data) => {
      console.log(data);
      // get all user inputs
      const username = data.username;
      const password = data.password;
      // send username and password to the backend
      this.sendSignInRequest(username, password);
    };

    // the handler function for password recovering
    const recoverPasswordWasClickedCallback = (data) => {
      // get the user input
      const username = data.username;
      // TODO: send username to backend and determine if the username exists
      console.log(data);
    };

    return (
      <div id="sign-up-form-container">
        <p id="error-box">{ this.state.errorMsg }</p>
        <ReactSignupLoginComponent
          title="NuXpert"
          handleSignup={signupWasClickedCallback}
          handleLogin={loginWasClickedCallback}
          handleRecoverPassword={recoverPasswordWasClickedCallback}
          submitLoginCustomLabel="Login"
          recoverPasswordCustomLabel="Forget password"
          goToLoginCustomLabel="cancel"
        />
      </div>
    );
  }
}
export default SignUpForm;
