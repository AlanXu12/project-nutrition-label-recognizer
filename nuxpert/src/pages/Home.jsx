import React, { Component } from 'react';
import '../styles.scss'
import axios from 'axios'
import NotificationSystem from 'react-notification-system';
import Navigation from '../components/Navigation'
import Intro from '../components/Intro'


class Home extends Component {
    // When the seach image component is called, construct the state object
    // to record the user input image and the result for this image from the backend.
    constructor(props) {
        console.log("home page got props:", props);
        super(props);
        this.state = {
            image: 'image',
            result: {}
        }
    }

    // This function is called when user select an image to upload.
    onFileSelect(e) {
        // update state when user selected an image to upload.
        this.setState({
            image: e.target.files[0]
        })
    }

    // this function is called when user press the 'see report' button
    fileUploadHandler = () => {
        // wrap the image as form data inorder to send to the backend.
        let fd = new FormData();
        fd.append('image', this.state.image);
        this.addNotification();
        axios.defaults.withCredentials = true;
        // use axios to send the post request
        try {
          axios.post("/api/search/image/", fd)
            // upon request is success sent
            .then(res => {
                // update result in the state.
                this.setState({
                    result: res.data
                });
                // and set up redirect location.
                const location = {
                    pathname: '/result',
                    state: this.state
                }
                // redirect to result page
                this.props.history.push(location);
            });
        } catch (err) {
          console.log(err);
          this.addErrorNotification();
        }
    }

    notificationSystem= React.createRef();

    // helper for adding a notification
    addNotification = () => {
      const notification = this.notificationSystem.current;
      notification.addNotification({
        title: 'Waiting',
        message: 'Image has been sent. Waiting for result...',
        level: 'warning',
        dismissible: 'none',
        autoDismiss: 20,
      });
    };

    // helper for adding an error notification when an error occurred
    addErrorNotification = () => {
      const notification = this.notificationSystem.current;
      notification.addNotification({
        title: 'Error',
        message: 'Sorry, an error occurred. Please try again later...',
        level: 'error',
        dismissible: 'none',
        autoDismiss: 0,
      });
    };

    render() {
        return (
            <div className="container">
                {/* Home page contains three main components:
                 1. navigation bar on the top of the website
                 */}
                <Navigation {...this.props} />
                <NotificationSystem ref={this.notificationSystem}/>
                <br></br>
                {/* 2. Introduction about this web page */}
                <Intro />
                <br></br>
                <br></br>
                <h3>Upload an nutrition label here:</h3>
                <br />
                <br />
                {/* 3. an file upload section for the user to upload the image. */}
                <div>
                    {/* use input form for the image upload */}
                    <input
                        type="file"
                        name="file"
                        onChange={(e) => this.onFileSelect(e)}
                        encType="multipart/form-data"
                    />
                    {/* button for file upload and redirection */}
                    <button onClick={this.fileUploadHandler}>See Report</button>
                    <br></br>
                    <br></br>
                </div>

                <br></br>
            </div>
        );
    }
}

export default Home;
