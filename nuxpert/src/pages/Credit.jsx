import React, { Component } from 'react';
import NavBar from '../components/Navigation.jsx';

class Credit extends Component {

  render() {
    return (
      <div>

        <NavBar/>

        <h1>Credits</h1>
        <h2>Google Cloud Storage</h2>
        <ul>
          <li>
          <a href="https://cloud.google.com/nodejs/docs/reference/storage/2.3.x/">google-cloud storage</a> </li>
        </ul>
        <h2>Google Cloud Vision</h2>
        <ul>
          <li>
          <a href=" https://cloud.google.com/nodejs/docs/reference/vision/0.24.x/">google-cloud vision</a> </li>
        </ul>
        <h2>MongoDB</h2>
        <ul>
          <li>
          <a href="http://mongodb.github.io/node-mongodb-native/2.0/api/">mongodb </a> </li>
        </ul>
        <h2>pdfmake</h2>
        <ul>
          <li>
          <a href="https://github.com/bpampuch/pdfmake/blob/0.1/dev-playground/server.js">pdfmake </a> </li>
        </ul>
        <h2>Fusejs</h2>
        <ul>
          <li>
          <a href=" https://fusejs.io/">Fusejs </a> </li>
        </ul>
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
              target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></li>
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
