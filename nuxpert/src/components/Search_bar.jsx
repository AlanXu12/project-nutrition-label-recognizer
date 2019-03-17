import axios from 'axios'
import React from 'react';
import './Search_bar.css'

class SearchBar extends React.Component {
    constructor() {
        super();

        this.state = { keyword: '', result: {} }

    }

    handleSearch = () => {
        const url = `http://localhost:3000/api/search/keyword/${this.state.keyword}/`
        fetch(url).then( (response) => {
            return response.json();
          }).then((results) => {
            if(results != undefined){
              this.setState({ result: results })
            //   cb(searchValue)
            }
          });
    }

    handleKeyDown(event) {
        if (event.key == 'Enter') {
            console.log("searching...", this.state.keyword);
            // this.search();
        }
    }

    handleKeyword = event => {
        this.setState({
            keyword: event.target,
            loaded: 0,
        })
    }

    render() {
        return (
            <form>
                <input
                    {...this.attributes}
                    type="text"
                    ref={ref => (this.input = ref)}
                    value={this.state.keyword}
                    onChange={this.handleselectedFile}
                />
                {/* <input type="file" name="" id="" onChange={this.handleselectedFile} /> */}
                <button onClick={this.handleUpload}>Search</button>
            </form>
        )
    }
}

export default SearchBar;