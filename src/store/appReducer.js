/**
 * App Reducer
 */
import api from '../api';
import * as options from '../constants/Options';
import * as types from '../constants/ActionTypes';
import * as strings from '../constants/Strings';

export const initialState = {
  topBarOptions: {
    [options.PATH_MY_DEMOS]: strings.MY_DEMOS,
    [options.PATH_ALL_DEMOS]: strings.ALL_DEMOS,
    [options.PATH_SIGN_OUT]: strings.SIGN_OUT,
  },
  currentDemo: {},
  demoItems: api.demos,
  topBarTitle: strings.ALL_DEMOS,
  topBarTitleIndex: null,
  isLoading: false,
  isNewDemo: false,
  isEditDemo: false,
  isConfirmExitEditor: false,
  confirmCallback: null,
  currentSection: options.PATH_ALL_DEMOS,
  isShowTobBarNavigation: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    /* istanbul ignore next */
    case '@@router/LOCATION_CHANGE': {
      const path = action.payload.pathname.replace(/^\/|\/$/g, '').split('/');
      let isNewDemo = false;
      let isEditDemo = false;
      let topBarTitle = state.topBarTitle;
      let currentSection = state.currentSection;

      if (path[0] === options.PATH_ALL_DEMOS) {
        topBarTitle = strings.ALL_DEMOS;
        currentSection = options.PATH_ALL_DEMOS;
      } else if (path[0] === options.PATH_MY_DEMOS) {
        topBarTitle = strings.MY_DEMOS;
        currentSection = options.PATH_MY_DEMOS;
      } else if (path[0] === options.PATH_DIRECTORY) {
        topBarTitle = strings.DIRECTORY_OF_LINKS;
      } else if (path[0] === options.PATH_SIGN_IN) {
        topBarTitle = strings.SIGN_IN;
      } else if (path[0] === options.PATH_SIGN_UP) {
        topBarTitle = strings.SIGN_UP;
      } else if (path[0] === options.PATH_NEW_DEMO) {
        isNewDemo = true;
      } else if (path[0] === options.PATH_EDIT_DEMO) {
        isEditDemo = true;
      }

      document.title = `${topBarTitle} ${strings.FOOTPRINT_DEMO}`;

      return {
        ...state,
        topBarTitle,
        topBarTitleIndex: null,
        isNewDemo,
        isEditDemo,
        currentSection,
      };
    }

    case types.SET_TOPBAR_TITLE:
      return {
        ...state,
        topBarTitle: action.title,
        topBarTitleIndex: action.titleIndex,
      };

    case types.LOAD_DEMOS: {
      return {
        ...state,
        currentSection: action.id || state.currentSection,
        demoItems: action.id === options.PATH_MY_DEMOS ?
          api.demos.filter(i => i.is_user_creator) : api.demos,
      };
    }

    case types.EDIT_DEMO:
      return {
        ...state,
        isEditDemo: true,
        currentDemo: state.demoItems.find(i => i.id === action.id),
      };

    case types.NEW_DEMO:
      return {
        ...state,
        isNewDemo: true,
      };

    case types.SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      };

    case types.HIDE_LOADER:
      return {
        ...state,
        isLoading: false,
      };

    case types.OPEN_CONFIRM_EXIT_EDITOR:
      return {
        ...state,
        isConfirmExitEditor: true,
        confirmCallback: action.cb,
      };

    case types.CLOSE_CONFIRM_EXIT_EDITOR:
      return {
        ...state,
        isConfirmExitEditor: false,
      };

    default:
      return state;
  }
}
