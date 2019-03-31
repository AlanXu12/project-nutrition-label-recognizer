import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import Result from './pages/Result';
import Search from './pages/Search';
import Test from './pages/Test.jsx';
import TestMouseTracing from './pages/TestMouseTracing.jsx';
import Credit from './pages/Credit.jsx';
import SignUp from './pages/SignUp.jsx';
import History from './pages/History.jsx';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component = {Home}/>
          <Route exact path="/result" component = {Result}/>
          <Route exact path="/test" component = {Test}/>
          <Route exact path="/tmt" component = {TestMouseTracing}/>
          <Route exact path="/credit" component = {Credit}/>
          <Route exact path="/search/:keyword" component = {Search}/>
          <Route exact path="/login" component = {SignUp}/>
          <Route exact path="/history" component = {History}/>
        </div>
      </Router>
    );
  }
}

export default App;
