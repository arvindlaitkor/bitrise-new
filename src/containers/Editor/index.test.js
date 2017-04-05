/**
 * Tests of Editor Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import Editor from '../Editor';
import { initialState } from '../../store/editorReducer';

const mockStore = configureMockStore([thunk]);

describe('(Container) Editor', () => {
  it('renders correctly', () => {
    const store = mockStore({ editor: initialState });
    const wrapper = mount(<Provider store={store}><Editor /></Provider>);
    expect(wrapper).toHaveLength(1);
  });
});
