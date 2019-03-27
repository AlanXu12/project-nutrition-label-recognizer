import React, { Component } from 'react';
import ReactSignupLoginComponent from 'react-signup-login-component';
import './SignUpForm.css';


class SignUpForm extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
  }

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
    if (response.status !== 200) {
      if (response.status == 409) this.setState({
        errorMsg: "Username has been taken..."
      });
      if (response.status == 500) this.setState({
        errorMsg: "Server side error, please try again later..."
      });
    } else {
      const body = await response.json();
      if (body) {
        // clean up error message
        this.setState({
          errorMsg: ''
        });
        console.log("Successfully get response from backend...");
        console.log("this.props: ", this.props);
        // TODO: update / redirect to some page
        window.location.reload();
      }
    }
  };

  // helper function for sending signin info to backend
  sendSignInRequest = async (username, password) => {
    console.log("username password: ", username, password);
    const response = await fetch('/signin/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
    if (response.status !== 200) {
      if (response.status == 401) this.setState({
        errorMsg: "Username or password not correct..."
      });
      if (response.status == 500) this.setState({
        errorMsg: "Server side error, please try again later..."
      });
    } else {
      const body = await response.json();
      if (body) {
        console.log("Successfully get response from backend...");
        // clean up error message
        this.setState({
          errorMsg: ''
        });
        // TODO: update / redirect to some page
        const location = {
          pathname: '/',
          state: this.state
        }
        this.props.history.push(location);
      }
    }
  };

  // helper function for sending recover request to backend
  sendRecoverRequest = async (username) => {
    const response = await fetch('/reset/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
      })
    });
    if (response.status !== 200) {
      if (response.status == 401) this.setState({
        errorMsg: "Username does not exist..."
      });
      if (response.status == 500) this.setState({
        errorMsg: "Server side error, please try again later..."
      });
    } else {
      const body = await response.json();
      if (body) {
        console.log("Successfully get response from backend...");
        // clean up error message
        // this.setState({
        //   errorMsg: "Successfully reset your password to your username"
        // });
        // TODO: update / redirect to some page
        window.location.reload();
      }
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
      if (passwordConfirmation !== password) {
        this.setState({
          errorMsg: 'Password confirmation does not match your password!'
        });
      } else {
        // send username and password to the backend
        console.log(username, password, passwordConfirmation);
        this.sendSignUpRequest(username, password);
      }
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
      console.log(data);
      // TODO: try to reset password by sending username to backend
      this.sendRecoverRequest(username);
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
