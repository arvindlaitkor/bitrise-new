/**
 * Tests of HQ Channel Editor Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import HqChannels from '../HqChannels';

const wrapper = shallow(<HqChannels />);

describe('(Component) Editors.HqChannels', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
