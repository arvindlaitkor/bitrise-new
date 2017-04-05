/**
 * Authenication Actions
 */
import { browserHistory } from 'react-router';
import * as options from '../constants/Options';
import * as types from '../constants/ActionTypes';
import * as strings from '../constants/Strings';
import * as auth from '../shared/utils/auth';

export const setAuthState = isSignedIn => ({
  type: types.AUTH_UPDATE,
  isSignedIn,
});

export const sendAuthRequest = isAuthRequest => ({
  type: types.AUTH_REQUEST,
  isAuthRequest,
});

export const setAuthError = message => ({
  type: types.AUTH_ERROR,
  message,
});

export const signIn = (username, password) => (
  (dispatch) => {
    dispatch(sendAuthRequest(true));
    dispatch(setAuthError(''));
    auth.signIn(username, password, (result) => {
      dispatch(sendAuthRequest(false));
      dispatch(setAuthState(result));
      if (result) {
        browserHistory.push(`/${options.PATH_ALL_DEMOS}`);
      } else {
        dispatch(setAuthError(strings.INCORRECT_EMAIL_OR_PASSWORD));
      }
    });
  }
);

export const signUp = (code, username, password) => (
  (dispatch) => {
    dispatch(sendAuthRequest(true));
    auth.signUp(code, username, password, (result) => {
      dispatch(sendAuthRequest(false));
      dispatch(setAuthState(result));
      if (result) {
        browserHistory.push(`/${options.PATH_ALL_DEMOS}`);
      } else {
        dispatch(setAuthError(strings.INCORRECT_EMAIL_OR_PASSWORD));
      }
    });
  }
);
