import React, { Component } from 'react';
import axios from 'axios'
import '../styles.scss'
import Navigation from '../components/Navigation'
import Intro from '../components/Intro'
import SearchBar from '../components/SearchBar';


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
        console.log(this.props);
    }

    // state = {
    //     image: 'image',
    //     keyword: ' ',
    //     result: {},
    //     fuzzy_result: {}
    // }

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

    fuzzySearchHandler = () => {
        //get result from the backend
        console.log("keyword:", this.state.keyword);
        axios.get("http://localhost:8080/api/fuzzy/nutrient/" + this.state.keyword + "/")
            // after result got from backend
            .then(fuzzy_result => {
                console.log("result from the backend:", fuzzy_result.data);
                // update result to state
                this.setState({
                    image: this.state.image,
                    result: this.state.result,
                    keyword: this.state.keyword,
                    fuzzy_result: fuzzy_result.data
                });
                const location = {
                    pathname: '/search',
                    state: this.state
                }
                this.props.history.push(location);
            })
            .catch(err => {
                console.log(err);
            });
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
                <Navigation {...this.props}/>
                {/* Introduction for nuXpert */}
                <br></br>
                <Intro />
                <br></br>
                {/* search bar */}
                {/* <SearchBar {...this.props}/> */}
                {/* <div>
                    <input
                        type="text"
                        className="search-form"
                        value={this.state.keyword}
                        onChange={(e) => this.onKeywordUpdate(e)}
                    />
                    {/* <Link to={{
                            pathname: '/search',
                            state: this.state
                        }}> Search </Link> */}
                    {/* <button onClick={this.fuzzySearchHandler}>Search</button>
                </div> */}
                <br></br>
                {/* drag and drop upload */}
                {/* <SearchImage /> */}
                <div onSubmit={this.onFormSubmit}>
                    {/* {this.resultRedirect()} */}
                    <input
                        type="file"
                        name="file"
                        onChange={(e) => this.onFileSelect(e)}
                        encType="multipart/form-data"
                    >
                    </input>
                    <button onClick={this.fileUploadHandler}>See Report</button>
                </div>
            </div>
        );
    }
}

export default Home;

// credit:
// react framwork: https://github.com/MyNameIsURL/simple-react-router-demo/tree/master/src
// drag and drop: http://react-dnd.github.io/react-dnd/about
