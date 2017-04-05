/**
 * Tests of Dropdown Component
 */
import React from 'react';
import { mount } from 'enzyme';
import Dropdown from '../Dropdown';

const options = {
  1: 'Option 1',
  2: 'Option 2',
  3: 'Option 3',
};
let currentId = '1';
const onChange = (newId) => {
  currentId = newId;
};

describe('(Component) Dropdown', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <Dropdown options={options} currentId={currentId} onChange={onChange} />,
    );
    expect(wrapper).toHaveLength(1);
  });

  it('renders without button correctly', () => {
    const wrapper = mount(
      <Dropdown
        options={options}
        currentId={currentId}
        onChange={onChange}
        isShowCurrent={false}
      />,
    );
    expect(wrapper).toHaveLength(1);
  });

  it('should change selected value', () => {
    const wrapper = mount(
      <Dropdown options={options} currentId={currentId} onChange={onChange} />,
    );
    expect(wrapper.text()).toEqual('Option 1');
    wrapper.find('.dropdown-button').simulate('click');
    wrapper.find('.dropdown-body-item').last().simulate('click');
    expect(wrapper.text()).toEqual('Option 3');
  });

  it('should close on click outside', () => {
    const wrapper = mount(
      <Dropdown options={options} currentId={currentId} onChange={onChange} />,
    );
    wrapper.find('.dropdown-button').simulate('click');
    expect(wrapper.find('.dropdown-body')).toHaveLength(1);
    wrapper.instance().handleClickOutside({ target: '' });
    expect(wrapper.find('.dropdown-body')).toHaveLength(0);
  });

  it('should updated correctly', () => {
    const wrapper = mount(
      <Dropdown options={options} currentId={currentId} onChange={onChange} />,
    );
    wrapper.setProps({ currentId: '2' }, () => {
      expect(wrapper.find('.dropdown-button').text()).toEqual(options[2]);
    });
    wrapper.setProps({ currentId: '2' }, () => {
      expect(wrapper.find('.dropdown-button').text()).toEqual(options[2]);
    });
  });
});
