/**
 * Authenication Reducer
 */
import * as types from '../constants/ActionTypes';
import * as auth from '../shared/utils/auth';

export const initialState = {
  isSignedIn: auth.signedIn(),
  isAuthRequest: false,
  authErrorMessage: '',
  currentDemo: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case types.AUTH_UPDATE:
      return {
        ...state,
        signedIn: action.isSignedIn,
      };

    case types.AUTH_REQUEST:
      return {
        ...state,
        isAuthRequest: action.isAuthRequest,
      };

    case types.AUTH_ERROR:
      return {
        ...state,
        authErrorMessage: action.message,
      };

    default:
      return state;
  }
}
