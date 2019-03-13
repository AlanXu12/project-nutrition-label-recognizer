import React, { Component } from 'react';
import FileDrop from 'react-file-drop';
import './Home.css'
import '../styles.scss'
import Navigation from '../components/Navigation'
import SearchBar from '../components/Search_bar'
import Intro from '../components/Intro'
import NutritionLabel from '../components/NutritionLabel'
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
                <div id="react-file-drop-demo" >
                    <NutritionLabel file={this.state.image}/>
                    <FileDrop className="dnd" onDrop={this.FileDrop}></FileDrop>
                    <br></br>
                    <button className="sumbit-btn">See Report</button>
                </div>
            </div>
        );
    }
}

export default Home;

                // credit: 
                // react framwork: https://github.com/MyNameIsURL/simple-react-router-demo/tree/master/src
// drag and drop: http://react-dnd.github.io/react-dnd/about