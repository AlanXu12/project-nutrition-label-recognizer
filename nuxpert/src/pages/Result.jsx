import React, { Component } from 'react';
// import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './Result.css';
// import './styles.css';

import Test from './Test.jsx'

import NavBar from '../components/Navigation.jsx';

import sampleImg from '../media/sample-nutrition-label-ca.png';


class Result extends Component {

  state = {
    redirect: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  uploadNewRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    // get all saved data
    console.log(this.props);

    return (
      <div className="container">

        <NavBar/>

        <button className="btn btn-primary btn-lg mt-2 btn-report" type="button">Report</button>

        <div className="row row-eq-height mt-2">

          <div className="col-sm-12 col-md-7">

            <div className="card mb-4 bg-secondary border border-primary">
              <img className="card-img-top" src={sampleImg} alt="Nutrition Fact Table"></img>
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
                  <h5 className="card-title">Test Element</h5>
                  <p className="crad-text">Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah</p>
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
