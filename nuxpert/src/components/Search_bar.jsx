
import React from 'react';
import './Search_bar.css'

class SearchBar extends React.Component {
    state = {
        query: "",
        result: {}
    };

    handleSearch = () => {
        console.log("searching...", this.state.query);
        // fetch(url).then((response) => {
        //     return response.json();
        // }).then((results) => {
        //     if (results !== undefined) {
        //         this.setState({ result: results })
        //         //   cb(searchValue)
        //     }
        // });
    }
    
    handleInputChange = event => {
        const query = event.target.value;

        this.setState({
            query: query,
            result:{}
        });
        console.log("searching...", this.state.query);
    };

    render() {
        return (
            <form>
                <input
                    placeholder="Search for..."
                    className="search-form"
                    value={this.state.query}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleSearch}>Search</button>
            </form>
        )
    }
}

export default SearchBar;