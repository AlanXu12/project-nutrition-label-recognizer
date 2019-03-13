import React, { Component } from 'react';
// import { DragSource } from 'react-dnd';
// import { ItemTypes } from './Constants';

// state = {
//     drag: false
// }
// dropRef = React.createRef()
// handleDrag = (e) => {
//     e.preventDefault()
//     e.stopPropagation()
// };
// handleDragIn = (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     this.dragCounter++
//     if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
//         this.setState({ drag: true })
//     }
// };
// handleDragOut = (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     this.dragCounter--
//     if (this.dragCounter === 0) {
//         this.setState({ drag: false })
//     }
// };
// handleDrop = (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     this.setState({ drag: false })
//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//         this.props.handleDrop(e.dataTransfer.files)
//         e.dataTransfer.clearData()
//         this.dragCounter = 0;
//     }
// };
// componentDidMount() {
//     let div = this.dropRef.current
//     div.addEventListener('dragenter', this.handleDragIn)
//     div.addEventListener('dragleave', this.handleDragOut)
//     div.addEventListener('dragover', this.handleDrag)
//     div.addEventListener('drop', this.handleDrop)
// };
// componentWillUnmount() {
//     let div = this.dropRef.current
//     div.removeEventListener('dragenter', this.handleDragIn)
//     div.removeEventListener('dragleave', this.handleDragOut)
//     div.removeEventListener('dragover', this.handleDrag)
//     div.removeEventListener('drop', this.handleDrop)
// };
class Home extends Component {
    render() {
        return (
            <div className="container">
                {/* Navigation bar */}
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="/">logo</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Contact</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" data-toggle="dropdown">User</a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="/signin">Sign in</a>
                                    <a className="dropdown-item" href="/signup">Register</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* Introduction for nuXpert */}
                <br></br>
                <div className="Jumbotron">
                    <h1 className="display-4">nuXpert</h1>
                    <p className="lead">how to use: blah blah</p>
                </div>
                <br></br>
                {/* search bar */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                </div>
                {/* drag and drop upload */}
                <div
                    style={{ display: 'inline-block', position: 'relative' }}
                    ref={this.dropRef}
                >
                    {this.state.dragging &&
                        <div
                            style={{
                                border: 'dashed grey 4px',
                                backgroundColor: 'rgba(255,255,255,.8)',
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: 9999
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: 0,
                                    left: 0,
                                    textAlign: 'center',
                                    color: 'grey',
                                    fontSize: 36
                                }}
                            >
                                <div>drop here :)</div>
                            </div>
                        </div>
                    }
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Home;

// credit: 
// react framwork: https://github.com/MyNameIsURL/simple-react-router-demo/tree/master/src
// drag and drop: http://react-dnd.github.io/react-dnd/about