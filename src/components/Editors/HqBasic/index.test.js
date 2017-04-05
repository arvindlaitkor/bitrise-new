/**
 * Tests of HQ Basic Editor Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import HqBasic from '../HqBasic';

const wrapper = shallow(<HqBasic />);

describe('(Component) Editors.HqBasic', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
