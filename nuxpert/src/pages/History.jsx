import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/Navigation.jsx';
import ReportCard from '../components/ReportCard.jsx';
import './History.css';
import samplePdf from '../media/sample.pdf';


class History extends Component {

  state = {
    redirect: false,
    showPdf: false,
    pdfPageNum: 1,
    pdfPageNumMax: 1,
    reportPdf: samplePdf
  }
  // setRedirect = () => {
  //   this.setState({
  //     redirect: true
  //   })
  // }
  // resultRedirect = () => {
  //   if (this.state.redirect) {
  //
  //   }
  // }

  showReport = () => {
    this.setState({
      showPdf: true
    });
  };

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

  render() {

    // divide components to two display views (1. scanning result 2. PDF report preview)
    const showPdf = this.state.showPdf;
    let displayView;
    if(!showPdf) {
      displayView = (
        <div className="card-columns">
          <ReportCard />
          <ReportCard image={"https://stephanieclairmont.com/wp-content/uploads/2015/03/rsz_nutrition_label.gif"}/>
          <ReportCard image={"https://www.khlaw.com/webfiles/Nutrition%20Label.jpg"}/>
          <ReportCard image={"http://www.dreamfoods.com/wp-content/uploads/2014/07/ItalianVolcano_LemonJuice_NutritionFacts.jpg"}/>
          <ReportCard image={"https://www.free-power-point-templates.com/articles/wp-content/uploads/2013/03/nutrition-facts-label-template.jpg"}/>
          <ReportCard image={"http://hallskitchen.ca/wp-content/uploads/Bangkok-Coconut-Curry-Soup-Nutrition-Label-2013.jpg"}/>
          <ReportCard />
          <ReportCard image={"https://ncsweetpotatoes.com/wp-content/uploads/2018/06/Sweet-Potato-Medium-Label-507x1024.jpg"}/>
        </div>
      );
    } else {
      displayView = (
        <div>
          <div>
            <button className="btn btn-primary btn-lg mt-2 btn-preview-pdf" type="button" onClick={this.backToResult} alter="Back to scanning report">Back</button>
            <button className="btn btn-primary btn-lg mt-2 btn-preview-pdf" type="button" alter="Save to my account">Save</button>
            <a className="btn btn-primary btn-lg mt-2 btn-preview-pdf" href={samplePdf} download="Report" alter="Download this report">Download</a>
          </div>
          <div className="btn-flex-container">
            <button className="btn btn-primary btn-sm mt-2" type="button" onClick={this.prevPdfPage} alter="Previous page">Prev</button>
            <button className="btn btn-primary btn-sm mt-2" type="button" onClick={this.nextPdfPage} alter="Previous page">Next</button>
          </div>
          <PDFReader
            className="pdf-reader"
            url={ samplePdf }
            page={this.state.pdfPageNum}
            onDocumentComplete={this.setPdfPageNumMax}
          />
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
