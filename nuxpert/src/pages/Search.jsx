import React, { Component } from 'react'
import '../styles.scss'
import Collapsible from 'react-collapsible';
import Navigation from '../components/Navigation'
import './Collapsible.scss'

export class Search extends Component {

    // when search page is loaded, set up state.
    constructor(props) {

        super(props);
        // recieve information from parent state.
        this.state = {
            nutrient: this.props.location.state.keyword,
            info: "Details about this nutritien",
            fuzzyResults: this.props.location.state.result
        };

    }

    render() {
        // devided return html into two parts
        const data = this.state.fuzzyResults;
        // for each result information, return a collapsible html
        const fuzzyResultsList = data.map((nutrient) => {
            return (
                <div key={nutrient.name}>
                    <Collapsible
                        className="nutrient"
                        trigger={' > ' + nutrient.name + ':  '}
                        triggerClassName="CustomTriggerCSS"
                        triggerOpenedClassName="CustomTriggerCSS--open"
                        contentOuterClassName="CustomOuterContentCSS"
                        contentInnerClassName="CustomInnerContentCSS"
                    >
                        <p className="nutrient">{nutrient.details}</p>
                    </Collapsible>
                    <br />
                </div>
            );
        })
        return (
            <div className="container">
                {/* call navibation bar component and pass this props for future page redirection */}
                <Navigation {...this.props} />
                <br />
                <br />
                <h1>Top 5 related results for: {this.state.nutrient}</h1>
                {/* genearte result htmls from other function */}
                {fuzzyResultsList}
            </div>
        )
    }
}

export default Search
