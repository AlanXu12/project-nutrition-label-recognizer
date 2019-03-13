import React, { Component } from 'react';

class SearchBar extends Component {

    state = {
        keyword: 'default'
    }

    handleInputChange = () => {
        console.log(this.state.query);
        this.setState({
            query: this.search.value
        })
        
        
    }

    render() {
        return (
            <form>
                <input
                    className="search_bar"
                    placeholder="Search for..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                />
            </form>
        );
    }
}

export default SearchBar;