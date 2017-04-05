/**
 * Test of DirectoryLinks Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import DirectoryLinks from '../DirectoryLinks';

const wrapper = shallow(<DirectoryLinks />);

describe('(Component) DirectoryLinks', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
