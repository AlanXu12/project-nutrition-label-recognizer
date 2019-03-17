import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Result from './Result.jsx'

class Test extends Component {

  state = {
    redirect: false,
    someData: [1, 2]
  }

  redirectResultPage = () => {
    const location = {
      pathname: '/result',
      state: {
        id: '123',
        someData: this.state.someData
      }
    }
    this.props.history.push(location);
  }

  render() {
    console.log(this.state.someData);
    return (
      <div>
        <button onClick={this.redirectResultPage}>To Result Page</button>
      </div>
    );
  }
}

export default Test;
