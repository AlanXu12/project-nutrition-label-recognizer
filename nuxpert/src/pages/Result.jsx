import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Dimensions,
  Text
} from 'react-native';
// import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { PDFReader } from 'react-read-pdf';
import './Result.css';
// import './styles.css';

import Test from './Test.jsx'
import NavBar from '../components/Navigation.jsx';
import CreditPortal from '../components/CreditPortal.jsx';

import sampleImg from '../media/sample-nutrition-label-ca.png';
import samplePdf from '../media/sample.pdf';


class Result extends Component {

  constructor(props) {
    super(props);
    // get all saved data
    console.log(this.props);
    const prevState = this.props.location.state;
    console.log(prevState);
    this.state = {
      redirect: false,
      title: "Default Title",
      details: "Defualt details Defualt details Defualt details Defualt details",
      x: 0,
      y: 0,
      nutriRangeArr: prevState.result,
      curNutri: "Default",
      image: URL.createObjectURL(prevState.image),
      imageHeight: prevState.result.height,
      imageWidth: prevState.result.width,
      imageId: prevState.result.id,
      showPdf: false,
      pdfPageNum: 1,
      pdfPageNumMax: 1,
      reportPdf: samplePdf,
      reportSaved: false,
      msgBox: ""
    };
    console.log(this.state);
  }

  // turn redirect flag to true
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  // redirect to home page when user wants to scan a new page
  uploadNewRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  // get real-time coordinates of mouse
  _onMouseMove(e) {
    this.setState({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY
    });
    // console.log("curX: ", this.state.x);
    // console.log("curY: ", this.state.y);
  }

  // find the corresponding factor of the user's mouse click from the scan result(nutriRangeArr)
  displayNutriInfo = () => {
    // get the current size of the result picture to find the zooming in/out ratio
    // const zoomRatio = this.divElement.getBoundingClientRect().width / 300;
    const zoomRatio = this.divElement.getBoundingClientRect().width / this.state.imageWidth;
    console.log("zoomRatio: ", zoomRatio);
    console.log("nutriRangeArr: ", this.state.nutriRangeArr);
    // find the corresponding factor that the user clicked on
    // console.log(typeof nutriRangeArr);
    const nutrients = this.state.nutriRangeArr;
    Object.keys(nutrients).some((nutrient, index) => {
      // console.log("clicked X: ", this.state.x);
      // console.log("clicked Y: ", this.state.y);
      // console.log("zoomRatio: ", zoomRatio);
      // console.log("relative Y: ", this.state.y / zoomRatio);
      if (nutrient != "height" && nutrient != "width" && nutrient != "id") {
        const nutri = nutrients[nutrient];
        // console.log("nutrient: ", nutrient);
        // console.log("nutri: ", nutri);
        // console.log("nutri.yMin: ", nutri.yMin);
        // console.log("nutri.yMax: ", nutri.yMax);
        if (nutri.yMin <= (this.state.y / zoomRatio) && (this.state.y / zoomRatio) <= nutri.yMax) {
          // console.log("nutrient: ", nutrient);
          this.setState({
            curNutri: nutrient
          });
          // console.log("new curNutri: ", nutrient);
          this.getNutriDetails(nutrient);
          return;
        }
      }
    });
  }

  // request backend for the current clicked factor's nutrition details and display the info
  getNutriDetails = async (nutriName) => {
    console.log("In getNutriDetails, nutriName: ", nutriName);
    console.log("In getNutriDetails, url: ", '/api/nutrient/' + nutriName + '/');
    const response = await fetch('/api/nutrient/' + nutriName + '/');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("In getNutriDetails, body: ", body);
    if (body) {
      this.setState({
        title: body.name,
        details: body.details
      });
    }
    console.log("this.state: ", this.state);
  };

  // handler for report button clicking on scanning result page
  showReport = async () => {
    console.log("showReport is hitted...");
    // get corresponding pdf report from backend
    const response = await fetch('/api/report/make/' + this.state.imageId + '/');
    console.log("response: ", response);
    // const body = await response.json();
    if (response.status !== 200) throw Error("something wrong...");
    this.setState({
      showPdf: true,
      reportPdf: response
    });
  }

  // handler for back button clicking on scanning result page
  backToResult = () => {
    // check if this report has been saved already
    if (!this.state.reportSaved) {
      // send request and let backend know this report doesn't need to be saved
      this.sendSaveReportRequest(false);
    }
    // hide the pdf preview reader
    this.setState({
      showPdf: false
    });
  }

  // request backend for saving or not saving the current showing report
  sendSaveReportRequest = async (saveReport) => {
    // get request URL depending on if the current report needs to be saved or not
    const requestUrl = '/api/report/' + (saveReport? 'save' : 'unsave') + '/' + this.state.imageId;
    const response = await fetch(requestUrl);
    if (response.status !== 200) throw Error("something wrong...");
  };

  // handler for save button clicking on scanning result page
  saveReport = () => {
    // send request and let backend know this report needs to be saved
    this.sendSaveReportRequest(true);
    this.setState({
      reportSaved: true,
      msgBox: "This report has been successfully saved!"
    });
  }

  // handler for pdf previewer's previous page button clicking
  prevPdfPage = () => {
    // check if pdfPageNum will be less than 1 after this time of operation
    let newPdfPageNum = this.state.pdfPageNum - 1;
    newPdfPageNum = newPdfPageNum < 1 ? 1 : newPdfPageNum;
    this.setState({
      pdfPageNum: newPdfPageNum
    });
  }

  // handler for pdf previewer's next page button clicking
  nextPdfPage = () => {
    // check if pdfPageNum will be greater than the max page num of the current file after this time of operation
    let pdfPageNumMax = this.state.pdfPageNumMax;
    let newPdfPageNum = this.state.pdfPageNum + 1;
    newPdfPageNum = newPdfPageNum > pdfPageNumMax ? pdfPageNumMax : newPdfPageNum;
    this.setState({
      pdfPageNum: newPdfPageNum
    });
  }

  // after loading the pdf file, the pdfPageNumMax will be reset by this function
  setPdfPageNumMax = (totalPage) => {
    this.setState({
      pdfPageNumMax: totalPage
    });
  }


  render() {
    // divide components to two display views (1. scanning result 2. PDF report preview)
    const showPdf = this.state.showPdf;
    let displayView;
    if(!showPdf) {
      displayView = (
        <div>
          <button className="btn btn-primary btn-lg mt-2 btn-report" type="button" onClick={this.showReport}>Report</button>
          <div className="row row-eq-height mt-2">

            <div className="col-sm-12 col-md-7">

              <div className="card mb-4 bg-secondary border border-primary result-card">
                <div ref={ (divElement) => this.divElement = divElement } >
                  <img className="card-img-top" onClick={this.displayNutriInfo} onMouseMove={this._onMouseMove.bind(this)} src={ this.state.image } alt="Nutrition Fact Table"></img>
                </div>

                <div className="card-body text-center">
                  {this.uploadNewRedirect()}
                  <button className="btn btn-primary btn-reupload" type="button" name="button" onClick={this.setRedirect}>Upload New</button>
                </div>
              </div>

            </div>

            <div className="col">

              <div className="card bg-secondary border border-primary">
                <div className="card-body text-center">
                  <div className="container">
                    <h2 className="card-title">{this.state.title}</h2>
                    <p className="card-text text-left">{this.state.details}</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      );
    } else {
      const pdfReportHref = "data:application/pdf;base64,[" + this.state.reportPdf + "]"
      displayView = (
        <div>
          <div>
            <button
              className="btn btn-primary btn-lg mt-2 btn-preview-pdf"
              type="button"
              onClick={ this.backToResult }
              alter="Back to scanning report"
            >
              Back
            </button>
            <button
              className="btn btn-primary btn-lg mt-2 btn-preview-pdf"
              type="button"
              alter="Save to my account"
              onClick={ this.saveReport }
            >
              Save
            </button>
            <a
              className="btn btn-primary btn-lg mt-2 btn-preview-pdf"
              href={ pdfReportHref }
              download="Report"
              alter="Download this report"
            >
              Download
            </a>
            <p id="msg-box">{ this.state.msgBox }</p>
          </div>
          <div className="btn-flex-container">
            <button
              className="btn btn-primary btn-sm mt-2"
              type="button"
              onClick={ this.prevPdfPage }
              alter="Previous page"
            >
              Prev
            </button>
            <button
              className="btn btn-primary btn-sm mt-2"
              type="button"
              onClick={ this.nextPdfPage }
              alter="Previous page"
            >
              Next
            </button>
          </div>
          <PDFReader
            className="pdf-reader"
            url={ this.state.reportPdf }
            page={ this.state.pdfPageNum }
            onDocumentComplete={ this.setPdfPageNumMax }
          />
          {/*
            <div className="pdf-viewer-container">

            </div>
          */}
        </div>
      );
    }

    return (
      <div className="container">
        <NavBar {...this.props}/>
        { displayView }
        <CreditPortal />
      </div>
    );
  }
}

export default Result;
