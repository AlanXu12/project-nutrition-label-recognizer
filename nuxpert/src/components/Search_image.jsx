import React, { Component } from 'react'
import FileDrop from 'react-file-drop';
import axios from 'axios'

export class Search_image extends Component {
    constructor(props) {
        super(props);

        this.state = { selectedFile: null, loaded: 0, result:{} }

    }

    handleUpload = () => {
        const data = new FormData()
        const endpoint = '/api/searchImage/'
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

    handleselectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    render() {
        return (
            <div id="react-file-drop-demo" >
                <FileDrop className="dnd" onDrop={this.handleselectedFile}></FileDrop>
                <br></br>
                <button onClick={this.handleUpload}>Upload</button>
            </div>
        )
    }
}

export default Search_image
