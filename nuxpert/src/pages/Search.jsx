import React, { Component } from 'react'
import '../styles.scss'
import Collapsible from 'react-collapsible';
import Navigation from '../components/Navigation'
import "./Search.css"

export class Search extends Component {

    constructor(props) {
        
        super(props);
        console.log(this.props);
        this.state = {
            nutrient: this.props.location.state.keyword,
            info: "Details about this nutritien",
            fuzzyResults: this.props.location.state.result
        };
        console.log(this.state);
        
    }

    render() {
        const data = this.state.fuzzyResults;
        const fuzzyResultsList = data.map((nutrient) => {
            return (
                <div key={nutrient.name}>
                <Collapsible className="nutrient" trigger={' > '+nutrient.name+':  '} >
                    <p className="nutrient">{nutrient.details}</p>
                </Collapsible>
                <br />
                </div>
            );
        })
        return (
            <div className="container">
                <Navigation {...this.props}/>
                <br />
                <br />
                <h1>related result(s) for: {this.state.nutrient}</h1>
                {fuzzyResultsList}
            </div>
        )
    }
}

export default Search
