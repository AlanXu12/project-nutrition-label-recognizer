import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBFormInline
} from 'mdbreact';

class Navigation extends Component {
    constructor(props) {
        console.log("nav got props:", props);
        console.log("nav got Cookies.get:", Cookies.get());
        super(props);
        this.state = {
            keyword: '_',
            fuzzy_result: {},
            collapseID: '',
            username: Cookies.get('username') 
        }
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

    handleSignout = async () => {
        console.log("before signout");
        const response = await fetch('/signout/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        console.log("after signout", response, Cookies.get());
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
                    <span className="mr-2">Welcome! {Cookies.get('username')}</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    <MDBDropdownItem href="/history">History report</MDBDropdownItem>
                    <MDBDropdownItem href="/" onClick = {this.handleSignout}>Signout</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
        </MDBNavItem>

    )

    render() {
        console.log("does user exist?", Cookies.get('username'));
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
                            {Cookies.get('username') ? this.renderUser() : this.renderVisitor()}
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
