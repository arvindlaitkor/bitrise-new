/**
 * Entry Point of the App
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import * as options from './constants/Options';
import store from './store';
import App from './containers/App';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import DemoList from './containers/DemoList';
import Directory from './containers/Directory';
import Editor from './containers/Editor';
import './shared/styles/index.css';

// Creates an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

const checkAuth = (state, replace) => {
  const { auth } = store.getState();
  if (auth.isSignedIn &&
    (state.location.pathname === `/${options.PATH_SIGN_IN}` ||
      state.location.pathname === `/${options.PATH_SIGN_UP}`)) {
    replace(`/${options.PATH_ALL_DEMOS}`);
  } else if (!auth.isSignedIn &&
    !(state.location.pathname === `/${options.PATH_SIGN_IN}` ||
    state.location.pathname === `/${options.PATH_SIGN_UP}`)) {
    replace(`/${options.PATH_SIGN_IN}`);
  }
};

render(
  <Provider store={store}>
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
      <Route onEnter={checkAuth}>
        <Route path={`/${options.PATH_SIGN_IN}`} component={SignIn} />
        <Route path={`/${options.PATH_SIGN_UP}`} component={SignUp} />
        <Route component={App}>
          <Route path={`/${options.PATH_ALL_DEMOS}`} component={DemoList} />
          <Route path={`/${options.PATH_MY_DEMOS}`} component={DemoList} />
          <Route path={`/${options.PATH_DIRECTORY}`} component={Directory} />
          <Route path={`/${options.PATH_NEW_DEMO}`} component={Editor} />
          <Route path={`/${options.PATH_EDIT_DEMO}/:id`} component={Editor} />
          <Redirect from="*" to={`/${options.PATH_ALL_DEMOS}`} />
        </Route>
      </Route>
    </Router>
  </Provider>,
document.getElementById('fp-root'));
