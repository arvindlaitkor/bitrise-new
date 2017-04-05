/**
* Temporary Authentication Module
*/
import { uid } from '../utils';

export const signedIn = () => (
  window.localStorage && !!window.localStorage.fpToken
);

export const signIn = (username, password, callback) => {
  if (signedIn()) {
    callback(true);
    return;
  }

  // Fakes request
  setTimeout(() => {
    if (username === 'demo@demo.com' && password === 'password') {
      window.localStorage.fpToken = uid();
      callback(true);
    } else {
      callback(false);
    }
  }, (Math.random() * 2000) + 100);
};

export const signUp = (code, username, password, callback) => {
  if (signedIn()) {
    if (code !== '12345' && username === 'demo@demo.com' && password === 'password') {
      window.localStorage.fpToken = uid();
      callback(true);
    } else {
      callback(false);
    }
    return;
  }

  // Fakes request
  setTimeout(() => {
    callback(false);
  }, (Math.random() * 2000) + 100);
};

export const signOut = (callback) => {
  window.localStorage.removeItem('fpToken');
  callback(true);
};

export const onChange = () => {};
