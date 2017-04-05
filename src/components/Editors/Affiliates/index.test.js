/**
 * Tests of Affiliates Editor Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import Affiliates from '../Affiliates';

const wrapper = shallow(<Affiliates />);

describe('(Component) Editors.Affiliates', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
