// import PropTypes from 'prop-types';
import axios from 'axios'
import React from 'react';
import './Search_bar.css'
class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = { selectedFile: null, loaded: 0, }

    }

    handleUpload = () => {
        const data = new FormData()
        const endpoint = 'http://localhost:3000'
        data.append('file', this.state.selectedFile, this.state.selectedFile.name)

        axios
            .post(endpoint, data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                },
            })
            .then(res => {
                console.log(res.statusText)
            })

    }

    handleKeyDown(event) {
        switch (event.key) {
            case 'Enter':
                console.log("searching...");
                // this.search();
                break;
        }
    }

    handleselectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    render() {
        return (
            <form>
                {/* <input
                    {...this.attributes}
                    type="text"
                    ref={ref => (this.input = ref)}
                    value={state.value}
                    onChange={this.handleselectedFile}
                /> */}
                <input type="file" name="" id="" onChange={this.handleselectedFile} />
                <button onClick={this.handleUpload}>Upload</button>
            </form>
        )
    }
}

export default SearchBar;