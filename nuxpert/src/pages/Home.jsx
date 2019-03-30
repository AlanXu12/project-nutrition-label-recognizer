import React, { Component } from 'react';
import axios from 'axios'
import '../styles.scss'
import Navigation from '../components/Navigation'
import SearchImage from '../components/SeachImage'
import Intro from '../components/Intro'


class Home extends Component {

    render() {
        return (
            <div className="container">
                <Navigation {...this.props} />
                <br></br>
                <Intro />
                <br></br>
                <br></br>
                <h2 >Upload an nutrition label here:</h2>
                <br/>
                <br/>
                <SearchImage {...this.props} />
                <br></br>
            </div>
        );
    }
}

export default Home;
