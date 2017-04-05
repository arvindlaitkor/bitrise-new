/**
 * Tests of Editor Actions
 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../editorActions';
import * as types from '../../constants/ActionTypes';

const mockStore = configureMockStore([thunk]);

describe('(Actions) EditorActions', () => {
  it('should update cover successful', () => {
    const img = 'test img';
    const accepted = [{ preview: img }];
    const expectedActions = [{ type: types.EDITOR_UPDATE_IMAGE, imageType: 'coverImg', img }];
    const store = mockStore({});
    store.dispatch(actions.updateCover(accepted));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should update cover fail', () => {
    const expectedActions = [{ type: types.EDITOR_UPDATE_IMAGE, imageType: 'coverImg', img: null }];
    const store = mockStore({});
    store.dispatch(actions.updateCover());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should update logo successful', () => {
    const img = 'test img';
    const accepted = [{ preview: img }];
    const expectedActions = [{ type: types.EDITOR_UPDATE_IMAGE, imageType: 'logoImg', img }];
    const store = mockStore({});
    store.dispatch(actions.updateLogo(accepted));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should update logo fail', () => {
    const expectedActions = [{ type: types.EDITOR_UPDATE_IMAGE, imageType: 'logoImg', img: null }];
    const store = mockStore({});
    store.dispatch(actions.updateLogo());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should publish', () => {
    const expectedActions = [
      { type: types.EDITOR_PUBLISH },
    ];
    const store = mockStore({});
    Promise.resolve()
      .then(() => store.dispatch(actions.publish()))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should init editor', () => {
    const id = null;
    const isEdit = false;
    const expectedActions = [
      { type: types.EDITOR_INIT, id, isEdit },
      { type: types.SET_TOPBAR_TITLE, title: undefined, titleIndex: null },
    ];
    const store = mockStore({});
    Promise.resolve()
      .then(() => store.dispatch(actions.initEditor(isEdit)))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should save data', () => {
    const expectedActions = [
      { type: types.EDITOR_SAVE_DATA },
    ];
    const store = mockStore({});
    Promise.resolve()
      .then(() => store.dispatch(actions.saveData()))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should toggle TopBar Navigation', () => {
    const isShow = true;
    const expectedActions = [
      { type: types.TOGGLE_TOPBAR_NAVIGATION, isShow },
    ];
    const store = mockStore({});
    store.dispatch(actions.toggleTopBarNavigation(isShow));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
