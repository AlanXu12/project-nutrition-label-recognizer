import React, { Component } from 'react';
import './Navigation.css'
class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand logo" href="/"></a>
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
        );
    }
}
export default Navigation;