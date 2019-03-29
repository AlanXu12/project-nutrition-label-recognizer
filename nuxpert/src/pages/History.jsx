import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { PDFReader } from 'react-read-pdf';

import NavBar from '../components/Navigation.jsx';
import ReportCard from '../components/ReportCard.jsx';
import CreditPortal from '../components/CreditPortal.jsx';

import './History.css';
import samplePdf from '../media/sample.pdf';


class History extends Component {

  state = {
    showPdf: false,
    pdfPageNum: 1,
    pdfPageNumMax: 1,
    reportPdf: samplePdf
  }

  // handler for report button clicking on scanning result page
  showReport = async (imageId) => {
    console.log("showReport is hitted...");
    // get corresponding pdf report from backend
    console.log("In history page, imageId: ", imageId);
    // TODO: needs to request the corresponding report using the current imageId
    const response = await fetch('/api/report/' + imageId + '/');
    // const response = await fetch('/api/report/');
    console.log("response: ", response);
    if (response.status !== 200) throw Error("something wrong...");
    const body = await response.json();
    if (body) {
      // ask History page to show the PDF report
      this.setState({
        showPdf: true,
        reportPdf: body.url
      });
    }
    console.log("response.body: ", response.body);
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
    const response = await fetch('/api/report/history/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // username: get the username somewhere
      })
    });
    // TODO: handler backend server response errors
    if (response.status !== 200) {
      return null;
    } else {
      // get all the imageIds from backend response
      const body = await response.json();
      if (body) {
        // TODO: may need to change reportObjArr to the actual key that was sent in the response body
        return body.reportObjArr;
      }
    }
  }

  render() {

    // divide components to two display views (1. scanning result 2. PDF report preview)
    const showPdf = this.state.showPdf;
    let displayView;
    if(!showPdf) {
      // request backend to get all the saved reports' corresponding imageIds
      let reportObjArr = this.getAllSavedReportsRequest;
      if (reportObjArr != null) {
        // loop through the imageIdArr to create corresponding ReportCards
        let reportCards;
        Object.keys(reportObjArr).some((reportObj, index) => {
          // create ReportCard using the current reportObj contains
          reportCards += (
            <ReportCard
              showReportFromParant={ this.showReport }
              imageId={ reportObj.imageId }
              image={ reportObj.image }
              time={ reportObj.time }
            />
          );
        });
      }
      // create report cards one by one
      displayView = (
        <div className="card-columns">
          { reportCards }
          {/*
            <ReportCard showReportFromParant={this.showReport} imageId="TEST_IMAGE_ID"/>
            <ReportCard image={"https://stephanieclairmont.com/wp-content/uploads/2015/03/rsz_nutrition_label.gif"}/>
            <ReportCard image={"https://www.khlaw.com/webfiles/Nutrition%20Label.jpg"}/>
            <ReportCard image={"http://www.dreamfoods.com/wp-content/uploads/2014/07/ItalianVolcano_LemonJuice_NutritionFacts.jpg"}/>
            <ReportCard image={"https://www.free-power-point-templates.com/articles/wp-content/uploads/2013/03/nutrition-facts-label-template.jpg"}/>
            <ReportCard image={"http://hallskitchen.ca/wp-content/uploads/Bangkok-Coconut-Curry-Soup-Nutrition-Label-2013.jpg"}/>
            <ReportCard />
            <ReportCard image={"https://ncsweetpotatoes.com/wp-content/uploads/2018/06/Sweet-Potato-Medium-Label-507x1024.jpg"}/>
          */}
        </div>
      );
    } else {
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
            <a
              className="btn btn-primary btn-lg mt-2 btn-preview-pdf"
              href="#"
              alter="Delete from my report history"
            >
              Delete
            </a>
            <a
              className="btn btn-primary btn-lg mt-2 btn-preview-pdf"
              href={ this.state.reportPdf }
              download="Report"
              alter="Download this report"
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
