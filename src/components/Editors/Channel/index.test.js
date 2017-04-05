/**
 * Tests Channel Editor Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import Channel from '../Channel';

const wrapper = shallow(
  <Channel
    changeData={() => {}}
  />);

describe('(Component) Editors.Channel', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
