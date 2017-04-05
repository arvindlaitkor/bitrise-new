/**
 * Test of Affiliate Chat Editor Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import AffiliateChat from '../AffiliateChat';

const wrapper = shallow(<AffiliateChat />);

describe('(Component) Editors.AffiliateChat', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
