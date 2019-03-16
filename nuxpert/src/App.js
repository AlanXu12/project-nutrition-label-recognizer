import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx'
import Result from './pages/Result.jsx'
import Test from './pages/Test.jsx'
import TestMouseTracing from './pages/TestMouseTracing.jsx'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component = {Home}/>
          <Route exact path="/result" component = {Result}/>
          <Route exact path="/test" component = {Test}/>
          <Route exact path="/tmt" component = {TestMouseTracing}/>
        </div>
      </Router>
    );
  }
}

export default App;
