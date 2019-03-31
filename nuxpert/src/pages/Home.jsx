import React, { Component } from 'react';
import '../styles.scss'
import Navigation from '../components/Navigation'
import SearchImage from '../components/SeachImage'
import Intro from '../components/Intro'


class Home extends Component {

    render() {
        return (
            <div className="container">
                {/* Home page contains three main components: 
                 1. navigation bar on the top of the website
                 */}
                <Navigation {...this.props} />
                <br></br>
                {/* 2. Introduction about this web page */}
                <Intro />
                <br></br>
                <br></br>
                <h3>Upload an nutrition label here:</h3>
                <br/>
                <br/>
                {/* 3. an file upload section for the user to upload the image. */}
                <SearchImage {...this.props} />
                <br></br>
            </div>
        );
    }
}

export default Home;
