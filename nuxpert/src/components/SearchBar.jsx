import axios from 'axios'
import React from 'react';
import './SearchBar.css'

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = { keyword: '', result: {} }

    }
    
    handleKeywordSearch = () => {
        axios.get("http://localhost:8080/api/search/fuzzy/"+this.state.keyword)
            .then(res => {
                console.log(res.data);
                this.setState({
                    keyword: this.state.keyword,
                    result: res.data,
                    redirect: true
                });
                console.log("before push props:", this.props);
                console.log("before push, location:", location);
                const location = {
                    pathname: '/search',
                    state: this.state
                }
                this.props.history.push(location);
            });
    }

    render() {
        return (
            <form >
                <input
                    type="text"
                    className="search-form"
                    id="keywordSearch"
                    placeholder="search by keyword"
                />
                <button onClick={this.handleKeywordSearch}>Search</button>
            </form>
        )
    }
}

export default SearchBar;