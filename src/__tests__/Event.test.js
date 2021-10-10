import React from 'react';
import { shallow } from 'enzyme';

import Event from '../Event';

import { mockData } from '../mock-data';

describe('<Event /> component tests', () => {

let data;
let EventWrapper;
  beforeAll(() => {
    data = mockData[0];
    EventWrapper = shallow(<Event event={data} />);
  })

  test('<event /> component title', () => {
    expect(EventWrapper.find('.title').text()).toBe(data.summary);
  });

  test('<event /> component Time', () => {
    expect(EventWrapper.find('.startTime').text()).toBe((new Date(data.start.dateTime)).toString());
  });

  test('<event /> component location', () => {
    expect(EventWrapper.find('.location').text()).toBe(`@${data.summary} | ${data.location}`);
  });

  test('<event /> component details button', () => {
    expect(EventWrapper.find('.detailsToggle')).toHaveLength(1);
    expect(EventWrapper.find('.detailsToggle').text()).toBe('show details');
  });

  test('<event /> component details hidden', () => {
    expect(EventWrapper.find('.details')).toHaveLength(0);
  });

  test('<event /> component details shown', () => {

    EventWrapper.find('.detailsToggle').at(0).simulate('click');

    expect(EventWrapper.find('.details')).toHaveLength(1);
  });

  test('<event /> component detail content - link', () => {
    expect(EventWrapper.find('.googleLink').prop('href')).toBe(data.htmlLink);
  });

  test('<event /> component detail content - description', () => {
    expect(EventWrapper.find('.description').text()).toBe(data.description);
  });

  test('<event /> component details button - hide', () => {

    expect(EventWrapper.find('.detailsToggle')).toHaveLength(1);
    expect(EventWrapper.find('.detailsToggle').text()).toBe('hide details');

  });

  test('<event /> component details re-hidden', () => {

    EventWrapper.find('.detailsToggle').at(0).simulate('click');

    expect(EventWrapper.find('.details')).toHaveLength(0);
  });

});
