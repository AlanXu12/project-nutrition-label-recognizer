import React, { Component } from 'react';

class SearchBar extends Component {

    state = {
        keyword:''
    }


    render() {
        return (
            <form className="form-inline md-form mr-auto mb-4">
                <input className="search" type="text" placeholder="Search"
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            console.log(this.keyword);
                            ev.preventDefault();
                        }
                    }} />
            </form>
        );
    }
}
export default SearchBar;