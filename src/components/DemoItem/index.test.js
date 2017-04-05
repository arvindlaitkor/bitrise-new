/**
 * Test of Demo Item Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import DemoItem from '../DemoItem';

const wrapper = shallow(<DemoItem />);

describe('(Component) DemoItem', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
