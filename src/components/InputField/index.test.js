/**
 * Tests of Input Field Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import InputField from '../InputField';

const wrapper = shallow(<InputField />);

describe('(Component) InputField', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
