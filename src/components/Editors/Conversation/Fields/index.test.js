/**
 * Tests of Conversation Fields Editor Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import Fields from '../Fields';

const wrapper = shallow(
  <Fields
    changeData={() => {}}
  />);

describe('(Component) Editors.Conversation.Fields', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
