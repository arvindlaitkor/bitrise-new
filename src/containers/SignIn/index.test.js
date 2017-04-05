/**
 * Tests SignIn Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import SignIn from '../SignIn';
import { initialState } from '../../store/authReducer';

const mockStore = configureMockStore([thunk]);

describe('(Container) SignIn', () => {
  it('renders correctly', () => {
    const store = mockStore({ app: initialState });
    const wrapper = mount(<Provider store={store}><SignIn /></Provider>);
    expect(wrapper).toHaveLength(1);
  });
});
