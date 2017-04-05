/**
 * Tests of Editor Header Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import EditorHeader from '../EditorHeader';

describe('(Component) EditorHeader', () => {
  it('renders correctly without images', () => {
    const wrapper = shallow(
      <EditorHeader
        navigate={() => {}}
        updateCover={() => {}}
        updateLogo={() => {}}
        publish={() => {}}
      />);
    expect(wrapper).toHaveLength(1);
  });

  it('renders correctly with images and publish button', () => {
    const wrapper = shallow(
      <EditorHeader
        coverImg="test"
        logoImg="test"
        isShowPublish
        navigate={() => {}}
        updateCover={() => {}}
        updateLogo={() => {}}
        publish={() => {}}
      />);
    expect(wrapper).toHaveLength(1);
  });
});
