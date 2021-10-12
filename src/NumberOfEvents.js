import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    query: 32
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ query: value});
    this.props.updateEvents(undefined,value);
  }

  render(){
    return (
      <div>
        <input
          type="text"
          className="number"
          value={this.state.query}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
