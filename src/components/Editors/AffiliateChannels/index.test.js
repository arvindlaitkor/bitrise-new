/**
 * Test of Affiliate Channels Editor Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import AffiliateChannels from '../AffiliateChannels';

const wrapper = shallow(<AffiliateChannels />);

describe('(Component) Editor.AffiliateChannels', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
