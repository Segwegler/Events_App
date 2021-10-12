import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import Event from '../Event';

import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';


describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  })

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });

});


describe('<App /> component integration testing', () => {

  test('App passes list of events as a prop to event list', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');

    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);

    AppWrapper.unmount();
  });

  test('App passes locations list to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');

    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);

    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user' , async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);

    CitySearchWrapper.setState({ suggestions: locations });

    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);

    expect(AppWrapper.state('events')).toEqual(eventsToShow);

    AppWrapper.unmount();
  });

  test('get list of all events when a user selects "see all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length -1).simulate('click');
    const allEvents = await getEvents();

    expect(AppWrapper.state('events')).toEqual(allEvents);

    AppWrapper.unmount();
  });

  test('number of events has the correct default number of events', () => {
    const AppWrapper = mount(<App />);
    const defaultNumber = 32;

    expect(AppWrapper.state('numberOfEvents')).toBe(defaultNumber);
    expect(AppWrapper.find(NumberOfEvents).state('query')).toBe(defaultNumber);

    AppWrapper.unmount();
  });


  test('change length of Events list when input changes in NumberOfEvents', async () => {
    const AppWrapper = mount(<App />);
    const setNumber = 1;
    const inputObject = { target: { value: setNumber}};

    AppWrapper.find(NumberOfEvents).find('.number').simulate('change', inputObject);

    const allEvents = await getEvents();
    const limitedEvents = allEvents.slice(0,setNumber);


    expect(AppWrapper.state('events')).toEqual(limitedEvents);


    AppWrapper.unmount();
  });


});
