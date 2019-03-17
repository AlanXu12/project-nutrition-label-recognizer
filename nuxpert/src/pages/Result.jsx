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
import './Result.css';
// import './styles.css';

import Test from './Test.jsx'

import NavBar from '../components/Navigation.jsx';

import sampleImg from '../media/sample-nutrition-label-ca.png';


class Result extends Component {

  state = {
    redirect: false,
    title: "Default Title",
    details: "Defualt details Defualt details Defualt details Defualt details",
    x: 0,
    y: 0,
    nutriRangeArr: [
      {name: "Fat", yMin: 139, yMax: 156 },
      {name: "Sugar", yMin: 233, yMax: 249 },
      {name: "Sodium", yMin: 301, yMax: 319 },
      {name: "Protein", yMin: 252, yMax: 273 },
      {name: "Calories", yMin: 105, yMax: 126 }
    ],
    curNutri: "Default",
    elementWidth: 0,
    zoomRatio: 1,
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

  // update user selected factor's detail in detail displaying area
  updateDetails = () => {
    this.setState({
      title: "Some new title",
      details: "Some new details Some new details Some new details Some new details"
    });
    console.log("elementWidth: ", this.state.elementWidth);
    console.log("zoomRatio: ", this.state.zoomRatio);
    console.log("curNutri: ", this.state.curNutri);
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
    this.state.nutriRangeArr.map((nutri) => {
      console.log("clicked X: ", this.state.x);
      console.log("clicked Y: ", this.state.y);
      console.log("relative Y: ", this.state.y / this.state.zoomRatio);
      if (nutri.yMin <= (this.state.y / this.state.zoomRatio) && (this.state.y / this.state.zoomRatio) <= nutri.yMax) {
        this.setState({
          curNutri: nutri.name
        });
        console.log("new curNutri: ", nutri.name);
        return;
      }
    });
  }

  // set the size of current rendered result image
  componentDidMount() {
    this.setState({
      // elementHeight: this.divRef.clientHeight,
      elementWidth: this.divRef.clientWidth,
      zoomRatio: (this.divRef.clientWidth / 300)
      // zoomRatio: (this.divRef.clientWidth / this.divRef.clientWidth)
      // zoomRatio: (this.divRef.clientWidth / this.state.widthFromHome)
    });
  }


  render() {
    // get all saved data
    // console.log(this.props);

    return (
      <div className="container">

        <NavBar/>

        <button className="btn btn-primary btn-lg mt-2 btn-report" type="button">Report</button>
        <button className="btn btn-primary btn-lg mt-2 btn-report" type="button" onClick={this.updateDetails}>TEST-SHOW-TEXT</button>

        <div className="row row-eq-height mt-2">

          <div className="col-sm-12 col-md-7">

            <div className="card mb-4 bg-secondary border border-primary result-card">
              <div ref={ (element) => {this.divRef = element;} } >
                <img className="card-img-top" onClick={this.displayNutriInfo} onMouseMove={this._onMouseMove.bind(this)} src={sampleImg} alt="Nutrition Fact Table"></img>
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
                  <h5 className="card-title">{this.state.title}</h5>
                  <p className="crad-text">{this.state.details}</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default Result;
