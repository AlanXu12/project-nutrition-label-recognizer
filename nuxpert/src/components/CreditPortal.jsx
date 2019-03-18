import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Home from '../pages/Home.jsx'
import './CreditPortal.css';

class CreditPortal extends Component {

  state = {
    redirect: false,
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  // redirect to credit page
  creditPageRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/credit' />
    }
  }

  render() {
    return (
      <div>
        {this.creditPageRedirect()}
        <div className="text-center text-grey credit-portal" onClick={this.setRedirect} >credits</div>
      </div>
    );
  }
}

export default CreditPortal;
