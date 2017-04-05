/**
 * Tests of Conversation Preview Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import Preview from '../Preview';

const wrapper = shallow(
  <Preview
    changeData={() => {}}
  />);

describe('(Component) Editors.Conversation.Preview', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
