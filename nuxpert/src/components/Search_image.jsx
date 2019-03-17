import React, { Component } from 'react'
import FileDrop from 'react-file-drop';
import axios from 'axios'
import './Search_image.css'
// Imports the Google Cloud client library.
// const {Storage} = require('@google-cloud/storage');

// // Instantiates a client. If you don't specify credentials when constructing
// // the client, the client library will look for credentials in the
// // environment.
// const storage = new Storage();

// // Makes an authenticated API request.
// storage
//   .getBuckets()
//   .then((results) => {
//     const buckets = results[0];

//     console.log('Buckets:');
//     buckets.forEach((bucket) => {
//       console.log(bucket.name);
//     });
//   })
//   .catch((err) => {
//     console.error('ERROR:', err);
//   });

export class Search_image extends Component {
    constructor(props){
        super(props);
        this.state = {
            image: null
        }
    }

    onFileSelect(e){
        this.setState({
            image: e.target.files[0]
        })
    }

    fileUploadHandler = () => {
        console.log("sending file to the backend");
        let fd = new FormData();
        fd.append('image', this.state.image);
        axios.post("http://localhost:8080/api/search/image/", fd)
        .then(res => {
            console.log(res);
        })

    }

    render(){
        return(
            <div onSubmit={this.onFormSubmit}>
                <input 
                type="file" 
                name="file" 
                onChange={(e) => this.onFileSelect(e)}
                encType="multipart/form-data"
                ></input>
                <button onClick={this.fileUploadHandler}>See Report</button>
            </div>
        )
    }
}

export default Search_image
