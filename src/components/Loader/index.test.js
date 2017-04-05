/**
 * Tests of Loader Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../Loader';

const wrapper = shallow(<Loader />);

describe('(Component) Loader', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
