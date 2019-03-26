import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/Navigation.jsx';
import ReportCard from '../components/ReportCard.jsx';
import './History.css';

class History extends Component {

  state = {
    redirect: false,
  }
  // setRedirect = () => {
  //   this.setState({
  //     redirect: true
  //   })
  // }
  // resultRedirect = () => {
  //   if (this.state.redirect) {
  //
  //   }
  // }

  render() {
    return (
      <div>
        <NavBar />
        {/* <ReportCard /> */}
        <div className="card-columns">
          <ReportCard />
          <ReportCard image={"https://stephanieclairmont.com/wp-content/uploads/2015/03/rsz_nutrition_label.gif"}/>
          <ReportCard image={"https://www.khlaw.com/webfiles/Nutrition%20Label.jpg"}/>
          <ReportCard image={"http://www.dreamfoods.com/wp-content/uploads/2014/07/ItalianVolcano_LemonJuice_NutritionFacts.jpg"}/>
          <ReportCard image={"https://www.free-power-point-templates.com/articles/wp-content/uploads/2013/03/nutrition-facts-label-template.jpg"}/>
          <ReportCard image={"http://hallskitchen.ca/wp-content/uploads/Bangkok-Coconut-Curry-Soup-Nutrition-Label-2013.jpg"}/>
          <ReportCard />
          <ReportCard image={"https://ncsweetpotatoes.com/wp-content/uploads/2018/06/Sweet-Potato-Medium-Label-507x1024.jpg"}/>
        </div>
      </div>
    );
  }
}

export default History;
