import React, { Component } from 'react';
import axios from 'axios'
import '../styles.scss'
import Navigation from '../components/Navigation'
import Intro from '../components/Intro'


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: 'image',
            keyword: ' ',
            result: {},
            fuzzy_result: {}
        }
        this.props.location.state = this.state;
    }

    state = {
        image: 'image',
        keyword: ' ',
        result: {},
        fuzzy_result: {}
    }


    onFileSelect(e) {
        this.setState({
            image: e.target.files[0],
            keyword: this.state.keyword,
            result: {},
            fuzzy_result: {}
        })
    }

    onKeywordUpdate(e) {
        this.setState({
            image: this.state.image,
            keyword: e.target.value,
            result: {},
            fuzzy_result: {}
        })
        console.log("after change,", this.state.keyword);
    }



    fileUploadHandler = () => {
        let fd = new FormData();
        fd.append('image', this.state.image);
        axios.post("http://localhost:8080/api/search/image/", fd)
            .then(res => {
                console.log(res.data);
                this.setState({
                    image: this.state.image,
                    result: res.data,
                    keyword: this.state.keyword,
                    fuzzy_result: this.state.fuzzy_result
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
            <div className="container">
                {/* Navigation bar */}
                <Navigation {...this.props} />
                {/* Introduction for nuXpert */}
                <br></br>
                <Intro />
                <br></br>
                <br></br>
                {/* <SearchImage /> */}
                <div>
                    {/* {this.resultRedirect()} */}
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
            </div>
        );
    }
}

export default Home;

// credit:
// react framwork: https://github.com/MyNameIsURL/simple-react-router-demo/tree/master/src
// drag and drop: http://react-dnd.github.io/react-dnd/about
