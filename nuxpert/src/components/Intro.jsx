import React, { Component } from 'react';

class Intro extends Component {

    render() {
        return (
            <div className="Jumbotron">
                <h1 className="display-4">nuXpert</h1>
                <p className="lead">
                We see nutrition labels everywhere everyday, 
                but by reading the label directly, not all people really understand the nutrition facts listed on the label:
                what they do to your body, what is the suggested daily amount that one should take daily. 
                Thus here we want to provide a tool that helps people comprehend the nutrition label more easily and precisely.</p>
            </div>
        );
    }
}
export default Intro;