/**
 * Tests of Input of Rich Text Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import InputRichText from '../InputRichText';

const wrapper = shallow(<InputRichText />);

describe('(Component) InputRichText', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
