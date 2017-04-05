/**
 * Tests of Authenication Actions
 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../authActions';
import * as types from '../../constants/ActionTypes';

const mockStore = configureMockStore([thunk]);

describe('(Actions) AuthActions', () => {
  it('should set auth state', () => {
    const isSignedIn = false;
    const expectedActions = [{ type: types.AUTH_UPDATE, isSignedIn }];
    const store = mockStore({});
    store.dispatch(actions.setAuthState(false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should sign in with error', () => {
    const email = 'email@email.com';
    const password = 'test';
    const expectedActions = [
      { type: types.AUTH_REQUEST, isAuthRequest: true },
      { type: types.AUTH_ERROR, message: '' },
    ];
    const store = mockStore({});
    store.dispatch(actions.signIn(email, password));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
