import React, { Component } from 'react'
import '../styles.scss'
import Collapsible from 'react-collapsible';
import Navigation from '../components/Navigation'
import SearchBar from '../components/SearchBar'
import "./Search.css"
import { withRouter } from "react-router";

export class Search extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        const prevState = this.props.location.state;
        console.log(prevState);
        this.state = {
            nutrient: prevState.keyword,
            info: "Details about this nutritien",
            fuzzyResults: prevState.result
        };
        console.log(this.state);
    }

    render() {
        const data = this.state.fuzzyResults;
        const fuzzyResultsList = data.map((nutrient) => {
            return (
                <div key={nutrient.name}>
                <Collapsible className="nutrient" trigger={'>>'+nutrient.name+' :'} >
                    <p className="nutrient">{nutrient.details}</p>
                </Collapsible>
                <br />
                </div>
            );
        })
        return (
            <div className="container">
                <Navigation />
                <br />
                <br />
                <SearchBar {...this.props}/>
                <br />
                <h1>Result(s) for: {this.state.nutrient}</h1>
                {fuzzyResultsList}
            </div>
        )
    }
}

export default Search
