/**
 * Editor Actions
 */
import { browserHistory } from 'react-router';
import * as types from '../constants/ActionTypes';
import * as editorsIds from '../constants/EditorsIds';
import * as strings from '../constants/Strings';
import * as appActions from './appActions';

export const toggleTopBarNavigation = isShow => ({
  type: types.TOGGLE_TOPBAR_NAVIGATION,
  isShow,
});

export const updateCover = (accepted = []) => ({
  type: types.EDITOR_UPDATE_IMAGE,
  imageType: 'coverImg',
  img: accepted.length ? accepted[0].preview : null,
});

export const updateLogo = (accepted = []) => ({
  type: types.EDITOR_UPDATE_IMAGE,
  imageType: 'logoImg',
  img: accepted.length ? accepted[0].preview : null,
});

export const reuseData = () => (
  (dispatch, getState) => (
    Promise.resolve()
    .then(() => {
      let data = {};
      const state = getState() && getState().editor;

      if (state.currentEditor === editorsIds.AFFILIATE_CHAT) {
        data = state.data[editorsIds.HQ_CHAT];
      } else if (state.currentEditor === editorsIds.AFFILIATE_CHANNELS) {
        const previousAffilate =
          state.affiliateIds[state.affiliateIds.indexOf(state.currentAffiliate) - 1];
        data = state.data[editorsIds.AFFILIATE_CHANNELS];
        data[state.currentAffiliate] = data[previousAffilate];
      }

      return dispatch({ type: types.EDITOR_REUSE_DATA, data });
    })
  )
);

export const publish = () => (
  (dispatch, getState) => (
    Promise.resolve()
    .then(() => dispatch({ type: types.EDITOR_PUBLISH }))
    .then(() => dispatch(appActions.setTopBarTitle(strings.PUBLISHING)))
    .then(() => dispatch(appActions.showLoader()))
    .then(() => new Promise(resolve => setTimeout(resolve, (Math.random() * 1000) + 1000)))
    .then(() => dispatch({ type: types.EDITOR_PUBLISHED }))
    .then(() => {
      const appState = getState() && getState().app;
      browserHistory.push(appState.currentSection || '/');
    })
    .then(() => dispatch(appActions.hideLoader()))
  )
);

export const setTopBarTitle = () => (
  (dispatch, getState) => {
    const state = getState() && getState().editor;
    let title = state.editors[state.currentEditor];

    if (state.currentEditor === editorsIds.AFFILIATE_CHANNELS) {
      title = `${title} – Branch ${state.affiliateIds.indexOf(state.currentAffiliate) + 1}`;
    }

    return dispatch(appActions.setTopBarTitle(title, state && state.currentStep));
  }
);

export const initEditor = (isEdit = false, id = null) => (
  dispatch => (
    Promise.resolve()
    .then(() => dispatch({ type: types.EDITOR_INIT, isEdit, id }))
    .then(() => dispatch(setTopBarTitle()))
  )
);

export const navigate = direction => (
  (dispatch, getState) =>
    Promise.resolve()
    .then(() => {
      const state = getState() && getState().editor;

      const affiliateIndex = state.affiliateIds.indexOf(state.currentAffiliate) + direction;
      if (state.currentEditor === editorsIds.AFFILIATE_CHANNELS &&
          affiliateIndex >= 0 && affiliateIndex < state.affiliateIds.length) {
        return dispatch({
          type: types.EDITOR_CHANGE_AFFILIATE,
          affiliateId: state.affiliateIds[affiliateIndex],
        });
      }

      let affiliateId = state.currentAffiliate;
      if (direction === -1 && state.currentEditor === editorsIds.HQ_CHAT) {
        affiliateId = state.affiliateIds[state.affiliateIds.length - 1];
      } else if (direction === 1 && state.currentEditor === editorsIds.AFFILIATES) {
        affiliateId = state.affiliateIds[0];
      }

      let editorId = state.currentEditor;
      const editorIndex = Object.keys(state.editors).indexOf(state.currentEditor) + direction;
      if (editorIndex >= 0 && editorIndex < Object.keys(state.editors).length) {
        editorId = Object.keys(state.editors)[editorIndex];
      }

      return dispatch({ type: types.EDITOR_NAVIGATE, editorId, affiliateId });
    })
    .then(() => dispatch(setTopBarTitle()))
);

export const saveData = data => (
  (dispatch, getState) => (
    Promise.resolve()
    .then(() => {
      const state = getState() && getState().editor;
      if (state.currentEditor === editorsIds.AFFILIATES) {
        return dispatch({ type: types.EDITOR_SAVE_DATA, data, affiliateIds: Object.keys(data) });
      }
      return dispatch({ type: types.EDITOR_SAVE_DATA, data });
    })
  )
);
