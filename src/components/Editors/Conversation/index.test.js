/**
 * Tests of Conversation Editor Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import Conversation from '../Conversation';

const wrapper = shallow(
  <Conversation
    id="id"
    data={{
      replies: [],
    }}
    remove={() => {}}
    addReply={() => {}}
    removeReply={() => {}}
    changeData={() => {}}
    changeReplyData={() => {}}
  />);

describe('(Component) Editors.Conversation', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
