/**
 * Tests of URL Editor Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import Url from '../Url';

const wrapper = shallow(<Url />);

describe('(Component) Editors.Url', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
