/**
 * Test of TopBar Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import TopBar from '../TopBar';

const wrapper = shallow(
  <TopBar
    changeTopBarMenu={() => {}}
  />);

describe('(Component) TopBar', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
