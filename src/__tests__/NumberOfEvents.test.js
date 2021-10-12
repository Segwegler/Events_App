import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('NumberOfEvents tests', () => {
  let NumberOfEventsWrapper;
  beforeAll( () => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents ={() =>{}}/>);
  });

  test('<NumberOfEvents /> component input box default value', () => {
    expect(NumberOfEventsWrapper.find('.number').prop('value')).toBe(32);
  });

  test('<NumberOfEvents /> component change input', () => {
    const inputObject = { target: { value: 3}};
    NumberOfEventsWrapper.find('.number').simulate('change', inputObject);
    expect(NumberOfEventsWrapper.find('.number').prop('value')).toBe(3);

  });

  test('<NumberOfEvents /> component state change after input', () => {
    expect(NumberOfEventsWrapper.state('query')).toBe(3);
  });

});
