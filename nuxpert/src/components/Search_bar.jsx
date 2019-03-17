
import React from 'react';
import './Search_bar.css'

class SearchBar extends React.Component {
    constructor() {
        super();

        this.state = { keyword: '', result: {} }

    }

    handleSearch = () => {
        const url = `http://localhost:3000/api/search/keyword/${this.state.keyword}/`
        fetch(url).then((response) => {
            return response.json();
        }).then((results) => {
            if (results !== undefined) {
                this.setState({ result: results })
                //   cb(searchValue)
            }
        });
    }

    handleKeyDown(event) {
        if (event.key === 'Enter') {
            console.log("searching...", this.state.keyword);
            // this.search();
        }
    }

    handleKeyword = event => {
        event.preventDefault();
        this.setState({
            keyword: event.target,
            loaded: 0,
        })
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    className="search"
                    id="keywordSearch"
                    placeholder="search by keyword"
                />
                <button onClick={this.handleKeyword}>Search</button>
            </form>
        )
    }
}

export default SearchBar;