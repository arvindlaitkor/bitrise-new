/**
 * Test of App Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import * as options from '../../constants/Options';
import App from '../App';
import { initialState } from '../../store/appReducer';

const mockStore = configureMockStore([thunk]);

describe('(Container) App', () => {
  it('renders correctly', () => {
    const store = mockStore({
      app: initialState,
      editor: { isShowTopBarNavigation: false },
    });
    const wrapper = mount(<Provider store={store}><App /></Provider>);
    expect(wrapper).toHaveLength(1);
  });

  it('renders correctly with loader', () => {
    const store = mockStore({
      app: { ...initialState, isLoading: true },
      editor: { isShowTopBarNavigation: false },
    });
    const wrapper = mount(<Provider store={store}><App /></Provider>);
    expect(wrapper).toHaveLength(1);
  });

  it('renders correctly with confirmation modal', () => {
    const store = mockStore({
      app: { ...initialState, isConfirmExitEditor: true },
      editor: { isShowTopBarNavigation: false },
    });
    const wrapper = mount(<Provider store={store}><App /></Provider>);
    expect(wrapper).toHaveLength(1);
  });

  it('handles correctly path PATH_ALL_DEMOS', () => {
    const store = mockStore({
      app: { ...initialState, location: { pathname: `/${options.PATH_ALL_DEMOS}` } },
      editor: { isShowTopBarNavigation: false },
    });
    const wrapper = mount(<Provider store={store}><App /></Provider>);
    expect(wrapper).toHaveLength(1);
  });

  it('handles correctly path PATH_ALL_DEMOS', () => {
    const store = mockStore({
      app: { ...initialState, location: { pathname: `/${options.PATH_MY_DEMOS}` } },
      editor: { isShowTopBarNavigation: false },
    });
    const wrapper = mount(<Provider store={store}><App /></Provider>);
    expect(wrapper).toHaveLength(1);
  });
});
