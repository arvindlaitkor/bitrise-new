/**
 * Test of Radio Group Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import RadioGroup from '../RadioGroup';

describe('(Component) RadioGroup', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<RadioGroup />);
    expect(wrapper).toHaveLength(1);
  });

  it('changes correctly', () => {
    let currentId = 1;
    const wrapper = shallow(
      <RadioGroup
        options={{ 1: '1', 2: '2', 3: '3' }}
        currentId={currentId}
        onChange={id => (currentId = id)}
      />);
    wrapper.find('input').last().simulate('change');
    expect(currentId).toEqual('3');
  });
});
