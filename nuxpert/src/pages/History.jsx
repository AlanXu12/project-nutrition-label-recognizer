import React, { Component } from 'react';
import { PDFReader } from 'react-read-pdf';
import Cookies from 'js-cookie';
import axios from 'axios';

import NavBar from '../components/Navigation.jsx';
import ReportCard from '../components/ReportCard.jsx';
import CreditPortal from '../components/CreditPortal.jsx';

import './History.css';

class History extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPdf: false,
      pdfPageNum: 1,
      pdfPageNumMax: 1,
      reportPdf: null,
      reportPdfDowload: null,
      imageId: null,
      username: Cookies.get('username'),
      reportObjArr: null
    }
    // request backend to get all the saved reports' corresponding imageIds
    this.getAllSavedReportsRequest();
  }

  // handler for report button clicking on scanning result page
  showReport = async (imageId) => {
    // get corresponding pdf report from backend
    axios.defaults.withCredentials=true;
    await axios.get('/api/report/' + imageId + '/')
      .then(res => {
        // record info given by backend to state for rendering usage
        this.setState({
          showPdf: true,
          reportPdf: 'https://cors-anywhere.herokuapp.com/' + res.data.url,
          reportPdfDowload: res.data.url,
          imageId: imageId
        });
      }).then(err => {
        console.log(err);
      });
  }

  // handler for report delete button clicking on scanning result page
  sendDeleteReportRequest = async (imageId) => {
    // delete corresponding pdf report from backend
    imageId = (imageId)? this.state.imageId : imageId;
    axios.defaults.withCredentials=true;
    await axios.delete('/api/report/' + imageId + '/')
      .then(res => {
        window.location.reload();
      }).then(err => {
        console.log(err);
      });
  }

  // handler for back button clicking on History page
  backToResult = () => {
    // hide the PDF preview area
    this.setState({
      showPdf: false
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
    // check if pdfPageNum will be greater than the max page num of the current
    // file after this time of operation
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

  // request backend to get all the saved reports' corresponding imageIds
  getAllSavedReportsRequest = async () => {
    const response = await fetch('/api/report/history/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username
      })
    });
    // backend server response errors
    if (response.status !== 200) {
      return null;
    } else {
      // get all the imageIds from backend response
      const body = await response.json();
      if (body) {
        this.setState({
          reportObjArr: body.reportObjArr
        });
      }
    }
  }

  render() {

    // divide components to two display views (1. scanning result 2. PDF report preview)
    const showPdf = this.state.showPdf;
    let displayView;
    if(!showPdf) {
      const reportObjArr = this.state.reportObjArr;
      // check if there is any saved report for the current user
      if (reportObjArr !== null && reportObjArr.length !== 0) {
        let fcnShowReport = this.showReport;
        let fcnSendDeleteReportRequest = this.sendDeleteReportRequest;
        // loop through the imageIdArr to create corresponding ReportCards
        let reportCards = Object.keys(reportObjArr).map((reportKey, index) => {
          // get necessary data contains in reportObj for creating ReportCard
          let reportObj = reportObjArr[reportKey];
          let imageId = reportObj.imageId;
          let image = reportObj.image;
          let origTime = reportObj.time;
          // format time to 'monthName DD, YYYY'
          let timeDateObj = new Date(origTime);
          let timeYear = timeDateObj.getFullYear();
          let timeMonth = timeDateObj.getMonth();
          let timeDate = timeDateObj.getDate();
          let monthNames = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
          ];
          let time = monthNames[timeMonth] + ' ' + timeDate + ', ' + timeYear ;
          // create ReportCard using the current reportObj contains
          let newComponent = React.createElement(ReportCard, {
            showReportFromParant: fcnShowReport,
            // deleteReportFromParent: fcnSendDeleteReportRequest,
            imageId: imageId,
            image: image,
            time: time,
            key: index
          });
          return newComponent;
        });
        // create report cards one by one
        displayView = (
          <div className="card-columns">
            { reportCards }
          </div>
        );
      } else {
        // there is no saved report for the current user
        displayView = (
          <p className="msg-box">There is no report saved yet.</p>
        );
      }
    } else {
      const deleteReport = this.sendDeleteReportRequest;
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
              onClick={ deleteReport }
              alter="Delete from my report history"
            >
              Delete
            </button>
            <a
              className="btn btn-primary btn-lg mt-2 btn-preview-pdf"
              href={ this.state.reportPdfDowload }
              download="Report.pdf"
              alter="Download this report"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
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
        </div>
      );
    }

    return (
      <div>
        <NavBar {...this.props}/>
        { displayView }
        <CreditPortal />
      </div>
    );
  }
}

export default History;
