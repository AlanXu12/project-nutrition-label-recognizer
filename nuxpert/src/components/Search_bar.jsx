import React, { Component } from 'react';
import './Search_bar.css'

class Search extends Component {
    state = {
        query: '',
        results: {}
    }

    // getResult = () => {
    //     axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=7`)
    //         .then(({ data }) => {
    //             this.setState({
    //                 results: data.data
    //             })
    //         })
    // }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        });
        console.log(this.state.query);
        // this.setState({
        //     query: this.search.value
        // }, () => {
        //     if (this.state.query && this.state.query.length > 1) {
        //         if (this.state.query.length % 2 === 0) {
        //             this.getResult()
        //         }
        //     } else if (!this.state.query) {
        //     }
        // })
    }

    render() {
        return (
            <form>
                <input
                    placeholder="Search for..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                />
                {/* <Suggestions results={this.state.results} /> */}
            </form>
        )
    }
}

export default Search