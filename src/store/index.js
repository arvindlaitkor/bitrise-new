/**
 * Combines Reducers and Creates the Store
 */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer as routing, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import app from './appReducer';
import auth from './authReducer';
import editor from './editorReducer';

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/* eslint-enable no-underscore-dangle */

const store = createStore(
  combineReducers({
    app,
    auth,
    editor,
    routing,
  }),
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(browserHistory)),
  ));

module.exports = store;
