import React, { Component } from 'react'
import '../styles.scss'
import Collapsible from 'react-collapsible';
import Navigation from '../components/Navigation'
import SearchBar from '../components/SearchBar'
import "./Search.css"

export class Search extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        const prevState = this.props.location.state;
        console.log(prevState);
        this.state = {
            redirect: false,
            nutrient: "Nutrien Name",
            info: "Details about this nutritien",
            fuzzyResults: [
                { name: "fat", details: "some fats are good,some fats are good,some fats are good,some fats are good,some fats are good,some fats are good,some fats are good,some fats are good" },
                { name: "sugar", details: "too much sugar is bad" },
                { name: "sodium", details: "sodium is necessary" }]
        };
        console.log(this.state);
    }

    render() {
        const data = this.state.fuzzyResults;
        const fuzzyResultsList = data.map((nutrient) => {
            return (
                <div>
                <Collapsible className=".Collapsible__trigger" trigger={nutrient.name} key={nutrient.name}>
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
                <SearchBar />
                <br />
                <h1>Result(s):</h1>
                {fuzzyResultsList}
            </div>
        )
    }
}

export default Search
