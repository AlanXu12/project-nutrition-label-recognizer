import React, { Component } from 'react';
import './ReportCard.css'

class ReportCard extends Component {

  constructor(props) {
    super(props);
    // get all necessay data for creating a ReportCard from History page
    const displayImage = this.props.image;
    const imageId = this.props.imageId;
    const time = this.props.time;
    // get show report function from History page
    // (so that, the ReportCard is able to tell History page to change view)
    this.askParentShowReport = this.askParentShowReport.bind(this);
    this.state = {
      image: displayImage,
      imageId: imageId,
      time: time
    };
  }

  // handler for detailed report icon clicking
  askParentShowReport = (e) => {
    e.preventDefault();
    this.props.showReportFromParant(this.state.imageId);
  }

  render() {
    return (
      <div className="card bg-secondary">
        <div className="show-image">
          <img className="card-img-top" src={ this.state.image } alt="Scanning preview"/>
          <a className="preview" href="#">
            <img
              src={ require('../media/preview-icon.svg') }
              onClick={ this.askParentShowReport }
              alt="Preview icon"
            />
          </a>
        </div>
        <div className="card-body">
          <h4 className="card-subtitle">{ this.state.time }</h4>
        </div>
      </div>
    );
  }
}
export default ReportCard;
