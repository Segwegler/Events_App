import './nprogress.css';
import React, { Component } from 'react';
import './App.css';
import EventList from './EventList.js';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';


import { extractLocations, getEvents } from './api';

class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32
  }

  componentDidMount() {
    this.mounted = true;

    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all' || location === undefined) ? events : events.filter((event) => event.location === location);

      const limitedEvents = locationEvents.slice(0, !!eventCount ? eventCount : this.state.numberOfEvents );

      this.setState({
        events: limitedEvents
      });
    });
  }

  render(){
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <EventList events={this.state.events}/>
      </div>
    );
  }
}

export default App;
