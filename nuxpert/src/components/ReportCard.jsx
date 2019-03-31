import React, { Component } from 'react';
import './ReportCard.css'

class ReportCard extends Component {

  constructor(props) {
    super(props);
    console.log("this.props: ", this.props);
    console.log("this.props.image: ", this.props.image);
    console.log("this.props.imageId: ", this.props.imageId);
    // get all necessay data for creating a ReportCard from History page
    const displayImage = this.props.image;
    const imageId = this.props.imageId;
    const time = this.props.time;
    console.log("this.props: ", this.props);
    console.log("this.askParentShowReport: ", this.askParentShowReport);
    console.log("this.askParentDeleteReport: ", this.askParentDeleteReport);
    console.log("this.props.deleteReportFromParent: ", this.props.deleteReportFromParent);
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
          <img className="card-img-top" src={ this.state.image } alt="Card image top"/>
          <a className="preview" href="#">
            <img src={require('../media/preview-icon.svg')} onClick={ this.askParentShowReport }/>
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
