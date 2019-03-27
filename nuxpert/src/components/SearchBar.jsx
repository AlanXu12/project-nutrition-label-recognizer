import axios from 'axios'
import React from 'react';
import './SearchBar.css';
import { withRouter } from 'react-router-dom'

class SearchBar extends React.Component {

    state = {
        //name of the nutrient user wanna search
        keyword: 'nutrient',
        // search result from the backend, this variable eventually will be passed to /search page
        result: {}
    }

    handleFuzzySearch = () => {
        //get result from the backend
        axios.get("http://localhost:8080/api/fuzzy/nutrient/" + this.state.keyword + "/")
            // after result got from backend
            .then(function (res) {
                console.log("result from the backend:", res);
                // update result to state
                this.setState({
                    keyword: this.state.keyword,
                    result: res
                });
            });
    }

    handleInputChange = () => {
        this.setState({
            keyword: this.search.value,
            result: {}
        });
        console.log("go search:", this.state.keyword);
    }

    render() {
        return (
            <form className="search-component">
                <input
                    type="text"
                    className="search-form"
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleFuzzySearch}>Search</button>
            </form>
        )
    }
}

export default SearchBar;