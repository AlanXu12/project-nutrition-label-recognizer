import React, { Component } from 'react';

import './Home.css'
import '../styles.scss'
import Navigation from '../components/Navigation'
import SearchBar from '../components/Search_bar'
import SearchImage from '../components/Search_image'
import Intro from '../components/Intro'
// import SearchImage from '../components/Search_image'
class Home extends Component {

    state = {
        image: 'user uploaded file',
        report: 'genearted report'
    }

    handleDrop = (files, event) => {
        console.log(files, event);
    }

    render() {
        return (
            <div className="container">
                {/* Navigation bar */}
                <Navigation />
                {/* Introduction for nuXpert */}
                <br></br>
                <Intro />
                <br></br>
                {/* search bar */}
                <SearchBar />
                <br></br>
                {/* drag and drop upload */}
                {/* <SearchImage /> */}    
                <SearchImage />            
            </div>
        );
    }
}

export default Home;

                // credit:
                // react framwork: https://github.com/MyNameIsURL/simple-react-router-demo/tree/master/src
// drag and drop: http://react-dnd.github.io/react-dnd/about
