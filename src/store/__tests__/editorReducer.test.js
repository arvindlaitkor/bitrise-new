/**
 * Tests of Editor Reducer
 */
import api from '../../api';
import * as types from '../../constants/ActionTypes';
import * as editorsIds from '../../constants/EditorsIds';
import reducer, { initialState } from '../editorReducer';

describe('(Reducer) Editor', () => {
  it('should handle TOGGLE_TOPBAR_NAVIGATION', () => {
    const isShowTopBarNavigation = true;
    expect(reducer([], {
      type: types.TOGGLE_TOPBAR_NAVIGATION,
      isShow: isShowTopBarNavigation,
    }))
    .toEqual({
      isShowTopBarNavigation,
    });
  });

  it('should handle EDITOR_INIT for adding a demo', () => {
    expect(reducer(undefined, {
      type: types.EDITOR_INIT,
    }))
    .toEqual({
      ...initialState,
      currentEditor: editorsIds.HQ_BASIC,
    });
  });

  it('should handle EDITOR_INIT for editing a demo', () => {
    expect(reducer(undefined, {
      type: types.EDITOR_INIT,
      isEdit: true,
    }))
    .toEqual({
      ...initialState,
      data: api.demo,
      currentEditor: editorsIds.HQ_BASIC,
    });
  });

  it('should handle EDITOR_NAVIGATE', () => {
    const editorId = editorsIds.HQ_BASIC;
    expect(reducer(undefined, {
      type: types.EDITOR_NAVIGATE,
      editorId,
    }))
    .toEqual({
      ...initialState,
      isFirstEditor: true,
      isLastEditor: false,
      currentEditor: editorId,
      currentStep: 1,
      currentAffiliate: undefined,
    });
  });

  it('should handle EDITOR_CHANGE_AFFILIATE', () => {
    const affiliateId = 'test';
    expect(reducer(undefined, {
      type: types.EDITOR_CHANGE_AFFILIATE,
      affiliateId,
    }))
    .toEqual({
      ...initialState,
      currentAffiliate: affiliateId,
    });
  });

  it('should handle EDITOR_SAVE_DATA of HQ editor', () => {
    const currentEditor = 'test';
    expect(reducer({ ...initialState, currentEditor }, {
      type: types.EDITOR_SAVE_DATA,
    }))
    .toEqual({
      ...initialState,
      currentEditor,
      data: { test: {} },
    });
  });

  it('should handle EDITOR_SAVE_DATA of affiliate editor', () => {
    const currentEditor = editorsIds.AFFILIATE_CHANNELS;
    expect(reducer({ ...initialState, currentEditor }, {
      type: types.EDITOR_SAVE_DATA,
    }))
    .toEqual({
      ...initialState,
      currentEditor,
      data: { [editorsIds.AFFILIATE_CHANNELS]: {} },
    });
  });

  it('should handle EDITOR_UPDATE_IMAGE of HQ', () => {
    const img = 'test';
    const imageType = 'test type';
    expect(reducer(undefined, {
      type: types.EDITOR_UPDATE_IMAGE,
      imageType,
      img,
    }))
    .toEqual({
      ...initialState,
      data: { [imageType]: img },
    });
  });

  it('should handle EDITOR_UPDATE_IMAGE of HQ with empty value', () => {
    const imageType = 'test type';
    expect(reducer(undefined, {
      type: types.EDITOR_UPDATE_IMAGE,
      imageType,
    }))
    .toEqual({
      ...initialState,
      data: { },
    });
  });

  it('should handle EDITOR_UPDATE_IMAGE of an affiliate in channels', () => {
    const currentEditor = editorsIds.AFFILIATE_CHANNELS;
    const imageType = 'test type';
    const img = 'test';
    expect(reducer({ ...initialState, currentEditor }, {
      type: types.EDITOR_UPDATE_IMAGE,
      imageType,
      img,
    }))
    .toEqual({
      ...initialState,
      currentEditor,
      data: { },
    });
  });

  it('should handle EDITOR_UPDATE_IMAGE of an affiliate in chat', () => {
    const currentEditor = editorsIds.AFFILIATE_CHAT;
    const imageType = 'test type';
    const img = 'test';
    expect(reducer({ ...initialState, currentEditor }, {
      type: types.EDITOR_UPDATE_IMAGE,
      imageType,
      img,
    }))
    .toEqual({
      ...initialState,
      currentEditor,
      data: { },
    });
  });

  it('should handle EDITOR_REUSE_DATA', () => {
    const data = { test: 'test' };
    expect(reducer(undefined, {
      type: types.EDITOR_REUSE_DATA,
      data,
    }))
    .toEqual({
      ...initialState,
      data: { null: data },
    });
  });

  it('should handle EDITOR_PUBLISH', () => {
    expect(reducer([], { type: types.EDITOR_PUBLISH }))
    .toEqual({
      isPublishing: true,
    });
  });

  it('should handle EDITOR_PUBLISHED', () => {
    expect(reducer([], { type: types.EDITOR_PUBLISHED }))
    .toEqual({
      isPublishing: false,
    });
  });

  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return default', () => {
    expect(reducer([], {})).toEqual([]);
  });
});
