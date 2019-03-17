import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Result from './Result.jsx';

import { PDFReader } from 'react-read-pdf';
// import './TestPDFViewer.css';
import samplePdf from '../media/sample.pdf';

class TestPDFViewer extends Component {

  render() {
    return (
      <div>
        <div style={{overflow: 'scroll', height:800}}>
          <PDFReader url={ samplePdf }/>
        </div>
      </div>
    );
  }
}

export default TestPDFViewer;
