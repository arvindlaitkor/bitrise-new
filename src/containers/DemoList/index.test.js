/**
 * Tests of Demo List Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import DemoList from '../DemoList';
import { initialState } from '../../store/appReducer';

const mockStore = configureMockStore([thunk]);

describe('(Container) DemoList', () => {
  it('renders correctly', () => {
    const store = mockStore({ app: initialState });
    const wrapper = mount(<Provider store={store}><DemoList /></Provider>);
    expect(wrapper).toHaveLength(1);
  });
});
