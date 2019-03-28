// import axios from 'axios'
import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        const prevState = this.props.location.state;
        this.state = {
            //name of the nutrient user wanna search
            keyword: prevState.keyword,
            // search result from the backend, this variable eventually will be passed to /search page
            result: new Map()
        }
        // console.log("current state after parent's call", this.state);
    }

    state = {
        keyword: '',
        result: new Map()
    }


    handleFuzzySearch = async () => {
        const response = await fetch('/api/fuzzy/nutrient/' + this.state.keyword + '/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        if (body) {
            this.setState({
                keyword: this.state.keyword,
                result: body
            });
            console.log("new search...",this.state);
            const location = {
                pathname: '/search/'+this.state.keyword,
                state: this.state
            }
            this.props.history.push(location);
            window.location.reload();
        }
    }

    handleInputChange = () => {
        this.setState({
            keyword: this.search.value,
            result: {}
        });
        console.log("new keyword:", this.state.keyword);
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    className="search-form"
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleFuzzySearch}>Search</button>
                
            </div>
        )
    }
}

export default SearchBar;