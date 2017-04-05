/**
 * Tests of HQ Chat Editor Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import HqChat from '../HqChat';

describe('(Component) Editors.HqChat', () => {
  it('renders correctly without data', () => {
    const wrapper = shallow(
      <HqChat
        data={[]}
      />);
    expect(wrapper).toHaveLength(1);
  });

  it('renders correctly with data', () => {
    const wrapper = shallow(
      <HqChat
        data={[]}
      />);
    expect(wrapper).toHaveLength(1);
  });
});
