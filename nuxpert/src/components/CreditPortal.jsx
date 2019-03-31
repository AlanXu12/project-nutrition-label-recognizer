import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
        { this.creditPageRedirect() }
        <div
          className="text-center text-grey credit-portal"
          onClick={this.setRedirect}
        >
          credits
        </div>
      </div>
    );
  }
}

export default CreditPortal;
