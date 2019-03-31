import React, { Component } from 'react';
import axios from 'axios'
import '../styles.scss'
import Navigation from '../components/Navigation'
import Intro from '../components/Intro'
import NotificationSystem from 'react-notification-system';


class Home extends Component {

  notificationSystem = React.createRef();

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

    onUserUpdate = (username) =>{
        this.setState({
            user:username
        })
    }

    onKeywordUpdate(e) {
        this.setState({
            image: this.state.image,
            keyword: e.target.value
        })
        console.log("after change,", this.state.keyword);
    }



    fileUploadHandler = () => {
        let fd = new FormData();
        fd.append('image', this.state.image);
        this.addNotification();
        axios.defaults.withCredentials=true;
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

    addNotification = () => {
      const notification = this.notificationSystem.current;
      notification.addNotification({
        title: 'Waiting',
        message: 'Image has been sent. Waiting for result...',
        level: 'error',
        dismissible: 'none',
        autoDismiss: 0,
      });
    };

    render() {
      let style = {
        NotificationItem: { // Override the notification item
          DefaultStyle: { // Applied to every notification, regardless of the notification level
            margin: '10px 5px 2px 1px',
            color: 'red',
          }
        }
      }
        return (
            <div className="container">
                <Navigation {...this.props} />
                <NotificationSystem ref={this.notificationSystem} style={style}/>
                <br></br>
                <Intro />
                <br></br>
                <br></br>
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
            </div>
        );
    }
}

export default Home;
