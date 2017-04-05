/**
 * Tests of Directory Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import Directory from '../Directory';
import { initialState } from '../../store/appReducer';

const mockStore = configureMockStore([thunk]);

describe('(Container) Directory', () => {
  it('renders correctly', () => {
    const store = mockStore({ app: initialState });
    const wrapper = mount(<Provider store={store}><Directory /></Provider>);
    expect(wrapper).toHaveLength(1);
  });
});
