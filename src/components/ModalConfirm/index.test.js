/**
 * Tests of Modal Confirm Component
 */
import React from 'react';
import { shallow } from 'enzyme';
import ModalConfirm from '../ModalConfirm';

const wrapper = shallow(
  <ModalConfirm
    confirm={() => {}}
    close={() => {}}
  />);

describe('(Component) ModalConfirm', () => {
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
});
