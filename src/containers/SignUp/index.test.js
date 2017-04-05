/**
 * Tests of SignUp Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import SignUp from '../SignUp';
import { initialState } from '../../store/authReducer';

const mockStore = configureMockStore([thunk]);

describe('(Container) SignUp', () => {
  it('renders correctly', () => {
    const store = mockStore({ app: initialState });
    const wrapper = mount(<Provider store={store}><SignUp /></Provider>);
    expect(wrapper).toHaveLength(1);
  });
});
