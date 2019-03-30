import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Home from './Home.jsx';
import NavBar from '../components/Navigation.jsx';

class Credit extends Component {

  render() {
    return (
      <div>

        <NavBar/>

        <h1>Credits</h1>

        <h2>Navigation Bar</h2>
        <ul>
          <li>The css styles for navigation bar are generated using 
            <a href="https://mdbootstrap.com/docs/jquery/navigation/navbar/#heading"> MDBootstrap.com </a></li>
        </ul>
        <h2>Collapsible element</h2>
        <ul>
          <li>The trigger to open style is generated from 
          <a href="https://github.com/glennflanagan/react-collapsible"> 'react-collapsible'</a></li>  
          </ul>
          <h2>Signin/Signup form</h2>
        <ul>
          <li>These forms are generated using 
          <a href="https://www.npmjs.com/package/react-signup-login-component">react-signup-login-component</a></li>  
          </ul>
        <h2>Page Style</h2>
        <ul>
          <li>Sytle ideas are getten from CSCC09 Spring 2019 Lab02 and Lab03</li>
        </ul>
        <h2>Icons</h2>
        <ul>
          <li>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0"
              target="_blank">CC 3.0 BY</a></li>
        </ul>
        <h2>Buttons</h2>
        <ul>
          <li>The "add" button style was generated using: <a href="http://css3buttongenerator.com/">css3buttongenerator</a></li>
        </ul>
        <h2>HTML, CSS and Javascript code</h2>
        <ul>
          <li>What would I do without <a href="http://stackoverflow.com/">Stackoverflow</a></li>
        </ul>
      </div>
    );
  }
}

export default Credit;
