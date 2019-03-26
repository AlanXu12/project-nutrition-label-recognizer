import React, { Component } from 'react'
import '../styles.scss'
import Navigation from '../components/Navigation'
import SearchBar from '../components/SearchBar'

export class Search extends Component {
  render() {
    return (
      <div>
        <Navigation/>
        <br/>
        <br/>
        <SearchBar/>
      </div>
    )
  }
}

export default Search
