import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Result from './Result.jsx'
import './TestMouseTracing.css';

class TestMouseTracing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      curCoordinates: [],
      fakeNutriYRangeArr: [
        {name: "Fat", yMin: 139, yMax: 156 },
        {name: "Sugar", yMin: 233, yMax: 249 },
        {name: "Sodium", yMin: 301, yMax: 319 },
        {name: "Protein", yMin: 252, yMax: 273 },
        {name: "Calories", yMin: 105, yMax: 126 }
      ],
      curNutri: "Default"
    };
  }

  _onMouseMove(e) {
    this.setState({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY
    });
  }

  displayCords = () => {
    this.state.curCoordinates.push({x: this.state.x, y: this.state.y});
    this.setState(
      this.state
    );
    console.log(this.state.curCoordinates);
  }

  displayNutriInfo = () => {
    this.state.fakeNutriYRangeArr.map((nutri) => {
      if (nutri.yMin <= this.state.y && this.state.y <= nutri.yMax) {
        this.setState({
          curNutri: nutri.name
        });
        return;
      }
    });
  }

  render() {
    const { x, y } = this.state;
    const { imgStyle } = {
      backgroundImage: `url(../media/sample-nutrition-label-ca.png)`,
    };
    return (
      <div className="container">
        <div>
          <img className="testImg" onClick={this.displayNutriInfo} onMouseMove={this._onMouseMove.bind(this)} width="500" height="750"/>
        </div>
        <h1>{ x } { y }</h1><br/>
        {this.state.curCoordinates.map((xy, i) => {
          return (
            <div key={i}>
              <p>{ xy.x } { xy.y }</p>
            </div>
          )
        })}
        <h1>{ this.state.curNutri }</h1>
      </div>
    );
  }
}

export default TestMouseTracing;
