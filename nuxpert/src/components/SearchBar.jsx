import React, { Component } from 'react'
import {MDBFormInline} from 'mdbreact'

export class SearchBar extends Component {


    constructor(props) {
        // inherit props from parent.
        super(props);
        this.state = {
            keyword: '_',
            fuzzy_result: {}
        }
    }

    handleFuzzySearch = async () => {
        // send search to backend using fetch get
        console.log("here?");
        const response = await fetch('/api/fuzzy/nutrient/' + this.state.keyword + '/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        // update state with response infomation
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        if (body) {
            this.setState({
                keyword: this.state.keyword,
                result: body
            });
            // and redirect to the search page.
            const location = {
                pathname: '/search/' + this.state.keyword,
                state: this.state
            }
            this.props.history.push(location);
            window.location.reload();
        }
    }

    handleInputChange = () => {
        console.log("onchange?", this.state.keyword);
        this.setState({
            keyword: this.search.value,
            result: {}
        });
    }

    render() {
        return (
            <MDBFormInline waves>
                <div className="md-form my-0">
                    <input
                        className="form-control mr-sm-2"
                        type="text"
                        ref={input => this.search = input}
                        placeholder="Search Nutrient"
                        onChange={this.handleInputChange}
                    />
                </div>
                <button className="fuzzySearchButton" onClick={this.handleFuzzySearch}>Search</button>
            </MDBFormInline>
        )
    }
}

export default SearchBar
