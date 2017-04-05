/**
 * Tests of Input Suggest Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import InputSuggest from '../InputSuggest';


describe('(Component) InputSuggest', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<InputSuggest onChange={() => {}} />);
    expect(wrapper).toHaveLength(1);
  });
});
