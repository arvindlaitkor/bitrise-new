/**
 * Tests of Authenication Reducer
 */
import * as types from '../../constants/ActionTypes';
import reducer, { initialState } from '../authReducer';

describe('(Reducer) Auth', () => {
  it('should handle AUTH_UPDATE', () => {
    expect(reducer([], {
      type: types.AUTH_UPDATE,
      isSignedIn: true,
    }))
    .toEqual({
      signedIn: true,
    });
  });

  it('should handle AUTH_REQUEST', () => {
    const isAuthRequest = false;
    expect(reducer([], { type: types.AUTH_REQUEST, isAuthRequest }))
    .toEqual({
      isAuthRequest,
    });
  });

  it('should handle AUTH_ERROR', () => {
    const message = 'test';
    expect(reducer([], { type: types.AUTH_ERROR, message }))
    .toEqual({
      authErrorMessage: message,
    });
  });

  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return default', () => {
    expect(reducer([], {})).toEqual([]);
  });
});
