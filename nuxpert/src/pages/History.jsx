import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { PDFReader } from 'react-read-pdf';
import Cookies from 'js-cookie';
import axios from 'axios';

import NavBar from '../components/Navigation.jsx';
import ReportCard from '../components/ReportCard.jsx';
import CreditPortal from '../components/CreditPortal.jsx';

import './History.css';
import samplePdf from '../media/sample.pdf';


class History extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPdf: false,
      pdfPageNum: 1,
      pdfPageNumMax: 1,
      reportPdf: samplePdf,
      reportPdfDowload: null,
      imageId: null,
      username: Cookies.get('username'),
      reportObjArr: null
    }
    // request backend to get all the saved reports' corresponding imageIds
    this.getAllSavedReportsRequest();
    console.log("after cosntructor finished its work, this.state: ", this.state);
  }

  // state = {
  //   showPdf: false,
  //   pdfPageNum: 1,
  //   pdfPageNumMax: 1,
  //   reportPdf: samplePdf,
  //   imageId: null,
  //   username: Cookies.get('username')
  // }

  // handler for report button clicking on scanning result page
  showReport = async (imageId) => {
    console.log("showReport is called...");
    // get corresponding pdf report from backend
    console.log("In history page, imageId: ", imageId);
    // TODO: needs to request the corresponding report using the current imageId
    // const response = await fetch('/api/report/' + imageId + '/', {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'credentials': 'include'
    //   }
    // });
    // console.log("response: ", response);
    // if (response.status !== 200) throw Error("something wrong...");
    // // const body = await response.json();
    // // if (body) {
    //   // ask History page to show the PDF report
    // this.setState({
    //   showPdf: true,
    //   reportPdf: response.url,
    //   imageId: imageId
    // });
    // // }
    axios.defaults.withCredentials=true;
    await axios.get('/api/report/' + imageId + '/')
      .then(res => {
        console.log("response: ", res);
        console.log("response.data: ", res.data);
        this.setState({
          showPdf: true,
          reportPdf: 'https://cors-anywhere.herokuapp.com/' + res.data.url,
          reportPdfDowload: res.data.url,
          imageId: imageId
        });
        console.log("after requesting backend, this.state: ", this.state);
      }).then(err => {
        console.log(err);
      });
  }

  // handler for report delete button clicking on scanning result page
  sendDeleteReportRequest = async (imageId) => {
    console.log("sendDeleteReportRequest is called...");
    // delete corresponding pdf report from backend
    console.log("In history page, imageId: ", imageId);
    imageId = (imageId)? this.state.imageId : imageId;
    // const response = await fetch('/api/report/' + imageId + '/', {
    //   method: 'DELETE',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   }
    // });
    // console.log("response: ", response);
    // if (response.status !== 200) throw Error("something wrong...");
    // // TODO: delete corresponding ReportCard / refresh the page?
    // // console.log("pretend refreshing page has been called...");
    // window.location.reload();
    axios.defaults.withCredentials=true;
    await axios.delete('/api/report/' + imageId + '/')
      .then(res => {
        console.log("response: ", res);
        // console.log("window.location.reload();");
        window.location.reload();
      }).then(err => {
        console.log(err);
      });
    // let index;
    // for(index=0; index<reportObjArr.length; index++) {
    //   if (reportObjArr[index].imageId == imageId) break;
    // }
    // let newReportObjArr = this.state.reportObjArr.splice(index, 1);
    // this.setState({
    //   reportObjArr: newReportObjArr
    // });
  }

  backToResult = () => {
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

  // request backend to get all the saved reports' corresponding imageIds
  getAllSavedReportsRequest = async () => {
    console.log("getAllSavedReportsRequest is called, this.state.username: ", this.state.username);
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
    console.log("after calling getAllSavedReportsRequest, response: ", response);
    // TODO: handler backend server response errors
    if (response.status !== 200) {
      return null;
    } else {
      // get all the imageIds from backend response
      const body = await response.json();
      if (body) {
        // TODO: may need to change reportObjArr to the actual key that was sent in the response body
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
      // let reportCards;
      if (reportObjArr != null) {
        console.log("before render, reportObjArr: ", reportObjArr);
        let fcnShowReport = this.showReport;
        let fcnSendDeleteReportRequest = this.sendDeleteReportRequest;
        console.log("fcnShowReport: ", fcnShowReport);
        console.log("fcnSendDeleteReportRequest: ", fcnSendDeleteReportRequest);
        // loop through the imageIdArr to create corresponding ReportCards
        let reportCards = Object.keys(reportObjArr).map((reportKey) => {
          // create ReportCard using the current reportObj contains
          // TODO: needs to check if this expression works or not
          let reportObj = reportObjArr[reportKey];
          let imageId = reportObj.imageId;
          let image = reportObj.image;
          let origTime = reportObj.time;
          // format time to YYYY-MM-DD
          let timeDateObj = new Date(origTime);
          let timeYear = timeDateObj.getFullYear();
          let timeMonth = timeDateObj.getMonth();
          let timeDate = timeDateObj.getDate();
          let time = timeYear + '-' + timeMonth + '-' + timeDate;
          console.log("after reformating, time: ", time);
          console.log("each time before creation, reportKey: ", reportKey);
          console.log("each time before creation, reportObj: ", reportObj);
          console.log("each time before creation, imageId: ", imageId);
          console.log("each time before creation, image: ", image);
          console.log("each time before creation, time: ", time);
          let newComponent = React.createElement(ReportCard, {
            showReportFromParant: fcnShowReport,
            // deleteReportFromParent: fcnSendDeleteReportRequest,
            imageId: imageId,
            image: image,
            time: time
          });
          console.log("after each creation, newComponent: ", newComponent);
          return newComponent;
          // return (
          //   <ReportCard
          //     showReportFromParant={ this.showReport }
          //     deleteReportFromParent={ this.sendDeleteReportRequest }
          //     imageId={ reportObj.imageId }
          //     image={ reportObj.image }
          //     time={ reportObj.time }
          //   />
          // );
        });
        console.log("before inserting into return, reportCards:", reportCards);
        // create report cards one by one
        displayView = (
          <div className="card-columns">
            { reportCards }
          </div>
        );
      } else {
        // there is no saved report for the current user
        displayView = (
          <div></div>
        );
      }
      console.log("before inserting into return, displayView: ", displayView);
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
            {/* TODO: replace href here to the URL that can delete the corresponding image and its report */}
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
          {/*
            <div className="pdf-viewer-container">

            </div>
          */}
        </div>
      );
    }

    return (
      <div>
        <NavBar {...this.props}/>
        {/* <ReportCard /> */}
        { displayView }
        <CreditPortal />
      </div>
    );
  }
}

export default History;
