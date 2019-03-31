import React, { Component } from 'react';
import Cookies from 'js-cookie';
import './Navigation.css'
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink,
    MDBNavbarToggler, MDBCollapse, MDBDropdown, MDBDropdownMenu,
    MDBDropdownToggle, MDBDropdownItem, MDBFormInline, MDBBtn
} from 'mdbreact'

class Navigation extends Component {
    constructor(props) {
        // inherit props from parent.
        super(props);
        this.state = {
            collapseID: '',
            keyword: '_',
            fuzzy_result: {}
        }
    }

    toggleCollapse = () => {
        // activate collapsed content
        this.setState({ isOpen: !this.state.isOpen });
    }

    handleFuzzySearch = async () => {
        // send search to backend using fetch get
        const response = await fetch('/api/fuzzy/nutrient/' + this.state.keyword + '/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        // update state with response infomation
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        if (body) {
            this.setState({
                keyword: this.state.keyword,
                result: body
            });
            // and redirect to the search page.
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
            keyword: this.search.value
        });
    }

    handleSignout = async () => {
        // send signout request to the backend and reset path to home page
        await fetch('/signout/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => {
            const location = {
                pathname: '/',
                state: this.state
            }
            this.props.history.push(location);
        })
    }

    // if no user logged in, show login button
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

    // if user logged in, show logout and history button.
    renderUser = () => (
        <MDBNavItem id="user">
            <MDBDropdown>
                <MDBDropdownToggle nav caret>
                    <span className="mr-2">Welcome! {Cookies.get('username')}</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    <MDBDropdownItem href="/history">History report</MDBDropdownItem>
                    <MDBDropdownItem href='#' onClick={this.handleSignout}>Signout</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
        </MDBNavItem>
    )

    render() {
        return (
            <MDBNavbar color="default-color" light expand="md">
                <MDBNavbarBrand>
                    <strong className="white-text">nuXpert</strong>
                </MDBNavbarBrand>
                {/* toggler to see more choices */}
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem active>
                            <MDBNavLink to="/">Home</MDBNavLink>
                        </MDBNavItem>
                        <div>
                            {/* check if there is a user info inside web's cookie to 
                                show different content */}
                            {Cookies.get('username') ? this.renderUser() : this.renderVisitor()}
                        </div>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBFormInline >
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
                        <button
                            type="submit"
                            onClick={this.handleFuzzySearch}
                            className="fuzzySearchButton" >Search</button>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }


}
export default Navigation;
// nav bar from: https://mdbootstrap.com/docs/react/navigation/navbar/
