import React, { Component } from 'react';


class Event extends Component {
  state = {
    details: false
  }

  toggleDetails = () => {
    this.setState({
      details: !this.state.details
    });
  }

  render() {
    const { event } = this.props;

    let date = new Date(event.start.dateTime);


    return (
      <div>
        <h1 className = 'title'>{ event.summary }</h1>
        <h4 className = 'startTime'>{ date.toString() }</h4>
        <h4 className = 'location'>{ `@${event.summary} | ${event.location}` }</h4>
        {this.state.details ?
         (
          <div className = 'details'>
            <h2>About event:</h2>
            <h4><a className = 'googleLink' href={event.htmlLink}>See details on Google Calendar</a></h4>
            <p className = 'description'>{event.description}</p>
          </div>
         ) :
         null}
        <button className = 'detailsToggle' onClick={() => this.toggleDetails()} >{this.state.details ? 'hide' : 'show'} details</button>
      </div>
    );
  }
}

export default Event;
