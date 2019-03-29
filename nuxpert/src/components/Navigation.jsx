import React, { Component } from 'react';

import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBFormInline
} from 'mdbreact';

class Navigation extends Component {
    constructor(props) {
        console.log("home page got props:", props);
        super(props);
        this.state = {
            keyword: '_',
            fuzzy_result: {},
            collapseID: '',
            username: this.props.history.location.state ? this.props.history.location.state.username : null
        }
    }

    state = {
        keyword: '_',
        fuzzy_result: new Map(),
        collapseID: '',
        username: this.props.history.location.state ? this.props.history.location.state.username : null
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    handleFuzzySearch = async () => {
        const response = await fetch('/api/fuzzy/nutrient/' + this.state.keyword + '/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        if (body) {
            this.setState({
                keyword: this.state.keyword,
                result: body
            });
            console.log("new search...", this.state);
            const location = {
                pathname: '/search/' + this.state.keyword,
                state: this.state
            }
            this.props.history.push(location);
            window.location.reload();
        }
    }

    handleInputChange = () => {
        this.setState({
            keyword: this.search.value,
            result: {}
        });
        console.log("new keyword:", this.state.keyword);
    }

     async checkUserLoggedin(){
        // response expected to be a username / null
        const response = await fetch('/' , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (response.status !== 200) throw Error(response.json().message);
        if (response !== null){
            this.state.username = 'response';
            return true;
        }else{return false}
    }

    handleSignout = async () => {
        const response = await fetch('/api/fuzzy/nutrient/' + this.state.keyword + '/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (response.status !== 200) throw Error(response.json().message);
    }

    renderVisitor = () => (
        <MDBNavItem id="visitor">
            <MDBDropdown>
                <MDBDropdownToggle nav caret>
                    <span className="mr-2">User</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    <MDBDropdownItem href="/signup">Login</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
        </MDBNavItem>
    )

    renderUser = () => (
        <MDBNavItem id="user">
            <MDBDropdown>
                <MDBDropdownToggle nav caret>
                    <span className="mr-2">Welcome! {this.state.username}</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    <MDBDropdownItem href="/history">History report</MDBDropdownItem>
                    <MDBDropdownItem href="/" onClick = {this.handleSignout}>Signout</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
        </MDBNavItem>

    )

    render() {
        console.log("does user exist?", this.state.username);
        return (
            <MDBNavbar color="default-color" expand="md">
                <MDBNavbarBrand>
                    <strong className="white-text">nuXpert</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem active>
                            <MDBNavLink to="/">Home</MDBNavLink>
                        </MDBNavItem>
                        <div>
                            {this.checkUserLoggedin() ? this.renderUser() : this.renderVisitor()}
                        </div>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBFormInline waves>
                            <div className="md-form my-0">
                                <input
                                    className="form-control mr-sm-2"
                                    type="text"
                                    ref={input => this.search = input}
                                    placeholder="Search Nutrient"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </MDBFormInline>
                        <button onClick={this.handleFuzzySearch}>Search</button>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }


}
export default Navigation;
// nav bar from: https://mdbootstrap.com/docs/react/navigation/navbar/
