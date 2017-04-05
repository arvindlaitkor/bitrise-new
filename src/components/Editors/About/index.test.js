/**
 * Tests of About Editor Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import About from '../About';

const wrapper = shallow(<About />);

describe('(Component) Editors.About', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
