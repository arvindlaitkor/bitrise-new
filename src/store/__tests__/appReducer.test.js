/**
 * Tests of App Reducer
 */
import api from '../../api';
import * as types from '../../constants/ActionTypes';
import * as options from '../../constants/Options';
import reducer, { initialState } from '../appReducer';

describe('(Reducer) App', () => {
  it('should handle NEW_DEMO', () => {
    expect(reducer([], { type: types.NEW_DEMO }))
    .toEqual({
      isNewDemo: true,
    });
  });

  it('should handle SHOW_LOADER', () => {
    expect(reducer([], { type: types.SHOW_LOADER }))
    .toEqual({
      isLoading: true,
    });
  });

  it('should handle HIDE_LOADER', () => {
    expect(reducer([], { type: types.HIDE_LOADER }))
    .toEqual({
      isLoading: false,
    });
  });

  it('should handle SET_TOPBAR_TITLE', () => {
    const title = 'test';
    const titleIndex = 'test';
    expect(reducer([], { type: types.SET_TOPBAR_TITLE, title, titleIndex }))
    .toEqual({
      topBarTitle: title,
      topBarTitleIndex: titleIndex,
    });
  });

  it('should handle LOAD_DEMOS', () => {
    const id = 'test';
    expect(reducer(undefined, { type: types.LOAD_DEMOS, id }))
    .toEqual({
      ...initialState,
      currentSection: id,
      demoItems: api.demos,
    });
  });

  it('should handle LOAD_DEMOS with filter', () => {
    const id = options.PATH_MY_DEMOS;
    expect(reducer(undefined, { type: types.LOAD_DEMOS, id }))
    .toEqual({
      ...initialState,
      currentSection: id,
      demoItems: api.demos.filter(i => i.is_user_creator),
    });
  });

  it('should handle LOAD_DEMOS without id', () => {
    expect(reducer(undefined, { type: types.LOAD_DEMOS }))
    .toEqual({
      ...initialState,
      demoItems: api.demos,
    });
  });

  it('should handle EDIT_DEMO', () => {
    const id = 'test';
    expect(reducer(undefined, { type: types.EDIT_DEMO, id }))
    .toEqual({
      ...initialState,
      isEditDemo: true,
      currentDemo: undefined,
    });
  });

  it('should handle OPEN_CONFIRM_EXIT_EDITOR', () => {
    const cb = () => {};
    expect(reducer([], { type: types.OPEN_CONFIRM_EXIT_EDITOR, cb }))
    .toEqual({
      isConfirmExitEditor: true,
      confirmCallback: cb,
    });
  });

  it('should handle CLOSE_CONFIRM_EXIT_EDITOR', () => {
    expect(reducer([], { type: types.CLOSE_CONFIRM_EXIT_EDITOR }))
    .toEqual({
      isConfirmExitEditor: false,
    });
  });

  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return default', () => {
    expect(reducer([], {})).toEqual([]);
  });
});
