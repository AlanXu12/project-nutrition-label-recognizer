import React, { Component } from 'react'
import axios from 'axios'
export class SeachImage extends Component {

    constructor(props) {
        console.log("home page got props:", props);
        super(props);
        this.state = {
            image: 'image',
            keyword: ' ',
            result: {},
            fuzzy_result: {}
        }
    }

    onFileSelect(e) {
        this.setState({
            image: e.target.files[0]
        })
    }

    fileUploadHandler = () => {
        let fd = new FormData();
        fd.append('image', this.state.image);
        axios.defaults.withCredentials = true;
        axios.post("/api/search/image/", fd)
            .then(res => {
                console.log(res.data);
                this.setState({
                    result: res.data
                });
                console.log("before push props:", this.props);
                console.log("before push, location:", location);
                const location = {
                    pathname: '/result',
                    state: this.state
                }
                this.props.history.push(location);
            }).then(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <input
                    type="file"
                    name="file"
                    onChange={(e) => this.onFileSelect(e)}
                    encType="multipart/form-data"
                />
                <button onClick={this.fileUploadHandler}>See Report</button>
                <br></br>
                <br></br>
            </div>
        )
    }
}

export default SeachImage

