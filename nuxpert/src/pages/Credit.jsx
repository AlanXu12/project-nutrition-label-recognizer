import React, { Component } from 'react';
import NavBar from '../components/Navigation.jsx';

class Credit extends Component {

  render() {
    return (
      <div>

        <NavBar/>

        <h1>Credits</h1>
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
