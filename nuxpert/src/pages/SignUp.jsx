import React, { Component } from 'react';
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
        <NavBar {...this.props} user={"alice"}/>
        {/*this.resultRedirect()*/}
        {/*<button onClick={this.setRedirect}>To Result Page</button>*/}
        <SignUpForm
          {...this.props}
        />
      </div>
    );
  }
}

export default SignUp;
