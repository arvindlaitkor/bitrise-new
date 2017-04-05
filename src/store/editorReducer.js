/**
 * Editor Reducer
 */
import api from '../api';
import * as types from '../constants/ActionTypes';
import * as editorsIds from '../constants/EditorsIds';
import * as strings from '../constants/Strings';

export const initialState = {
  data: {},
  editors: {
    [editorsIds.HQ_BASIC]: strings.HQ_BASIC_INFO,
    [editorsIds.HQ_ABOUT]: strings.ABOUT,
    [editorsIds.HQ_CHANNELS]: strings.ADD_CHANNELS_TO_HQ,
    [editorsIds.AFFILIATES]: strings.ADD_LOCATIONS,
    [editorsIds.AFFILIATE_CHANNELS]: strings.ADD_CHANNELS_TO_AFFILIATE,
    [editorsIds.HQ_CHAT]: strings.ADD_CONVERSATIONS_TO_HQ_CHAT,
    [editorsIds.AFFILIATE_CHAT]: strings.ADD_CONVERSATIONS_TO_AFFILIATE_CHAT,
    [editorsIds.URL]: strings.DEMO_URL,
  },
  isPublishing: false,
  isFirstEditor: true,
  isLastEditor: false,
  currentEditor: null,
  currentStep: 1,
  affiliateIds: [],
  currentAffiliate: null,
  isShowTopBarNavigation: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case types.EDITOR_INIT: {
      const currentEditor = editorsIds.HQ_BASIC;
      const editorIndex = Object.keys(state.editors).indexOf(currentEditor);
      return {
        ...state,
        data: action.isEdit ? api.demo : {},
        isPublishing: false,
        isFirstEditor: editorIndex === 0,
        isLastEditor: editorIndex === Object.keys(state.editors).length - 1,
        currentEditor,
        currentStep: editorIndex + 1,
        affiliateIds: [],
        currentAffiliate: null,
        isShowTopBarNavigation: false,
      };
    }

    case types.EDITOR_NAVIGATE: {
      const editorIndex = Object.keys(state.editors).indexOf(action.editorId);
      return {
        ...state,
        isFirstEditor: editorIndex === 0,
        isLastEditor: editorIndex === Object.keys(state.editors).length - 1,
        currentEditor: action.editorId,
        currentStep: editorIndex + 1,
        currentAffiliate: action.affiliateId,
      };
    }

    case types.EDITOR_CHANGE_AFFILIATE: {
      return {
        ...state,
        currentAffiliate: action.affiliateId,
      };
    }

    case types.EDITOR_SAVE_DATA: {
      if (state.currentEditor === editorsIds.AFFILIATE_CHANNELS) {
        return {
          ...state,
          data: {
            ...state.data,
            [editorsIds.AFFILIATE_CHANNELS]: {
              ...state.data[editorsIds.AFFILIATE_CHANNELS],
              [state.currentAffiliate]: action.data,
            },
          },
        };
      }
      return {
        ...state,
        affiliateIds: action.affiliateIds || state.affiliateIds,
        data: {
          ...state.data,
          [state.currentEditor]: {
            ...state.data[state.currentEditor],
            ...action.data,
          },
        },
      };
    }

    case types.EDITOR_UPDATE_IMAGE: {
      if (state.currentEditor === editorsIds.AFFILIATE_CHANNELS ||
          state.currentEditor === editorsIds.AFFILIATE_CHAT) {
        const index = state.currentEditor === editorsIds.AFFILIATE_CHAT
          ? state.affiliateIds[0] : state.currentAffiliate;

        if (!index) {
          return state;
        }

        /* istanbul ignore next */
        return {
          ...state,
          data: { ...state.data,
            [editorsIds.AFFILIATES]: {
              ...state.data[editorsIds.AFFILIATES],
              [state.currentAffiliate]: {
                ...state.data[editorsIds.AFFILIATES][index],
                [action.imageType]: action.img || '',
              },
            },
          },
        };
      }

      return {
        ...state,
        data: {
          ...state.data,
          [action.imageType]: action.img || state[action.imageType],
        },
      };
    }

    case types.EDITOR_REUSE_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          [state.currentEditor]: {
            ...state.data[state.currentEditor],
            ...action.data,
          },
        },
      };

    case types.EDITOR_PUBLISH:
      return {
        ...state,
        isPublishing: true,
      };

    case types.EDITOR_PUBLISHED:
      return {
        ...state,
        isPublishing: false,
      };

    case types.TOGGLE_TOPBAR_NAVIGATION:
      return {
        ...state,
        isShowTopBarNavigation: action.isShow,
      };

    default:
      return state;
  }
}
