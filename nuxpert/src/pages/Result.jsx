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
      showPdf: false
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
      if (nutrient != "height" && nutrient != "width") {
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


  render() {

    // console.log("In render(): ", this.state);

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
      displayView = (
        <div>
          <div>
            <button className="btn btn-primary btn-lg mt-2 btn-preview-pdf" type="button" onClick={this.backToResult} alter="Back to scanning report">Back</button>
            <button className="btn btn-primary btn-lg mt-2 btn-preview-pdf" type="button" alter="Save to my account">Save</button>
            <button className="btn btn-primary btn-lg mt-2 btn-preview-pdf" type="button" alter="Download this report">Download</button>
          </div>
          <div style={{overflow: 'scroll', height:800}}>
            <PDFReader url={ samplePdf }/>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <NavBar/>
        { displayView }
        <CreditPortal />
      </div>
    );
  }
}

export default Result;
