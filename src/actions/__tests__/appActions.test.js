/**
 * Tests of App Actions
 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../appActions';
import * as options from '../../constants/Options';
import * as types from '../../constants/ActionTypes';

const mockStore = configureMockStore([thunk]);

describe('(Actions) AppActions', () => {
  it('should open confirmation exit modal', () => {
    const cb = () => {};
    const expectedActions = [
      { type: types.OPEN_CONFIRM_EXIT_EDITOR, cb },
    ];
    const store = mockStore({});
    Promise.resolve()
      .then(() => store.dispatch(actions.openConfirmExitEditor(cb)))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should close confirmation exit modal', () => {
    const expectedActions = [{ type: types.CLOSE_CONFIRM_EXIT_EDITOR }];
    const store = mockStore({});
    store.dispatch(actions.closeConfirmExitEditor());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should confirm confirmation exit modal', () => {
    const expectedActions = [{ type: types.CLOSE_CONFIRM_EXIT_EDITOR }];
    const store = mockStore({});
    Promise.resolve()
      .then(() => store.dispatch(actions.confirmExitEditor()))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should show loader', () => {
    const expectedActions = [{ type: types.SHOW_LOADER }];
    const store = mockStore({});
    store.dispatch(actions.showLoader());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should hide loader', () => {
    const expectedActions = [{ type: types.HIDE_LOADER }];
    const store = mockStore({});
    store.dispatch(actions.hideLoader());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should load demos', () => {
    const id = 'test';
    const expectedActions = [
      { type: types.SHOW_LOADER },
      { type: types.LOAD_DEMOS, id },
    ];
    const store = mockStore({});
    Promise.resolve()
      .then(() => store.dispatch(actions.loadDemos(id)))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should add demo', () => {
    const expectedActions = [{ type: types.NEW_DEMO }];
    const store = mockStore({});
    store.dispatch(actions.newDemo());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should edit demo', () => {
    const name = 'test';
    const expectedActions = [
      { type: types.SHOW_LOADER },
      { type: types.EDIT_DEMO, name },
    ];
    const store = mockStore({});
    Promise.resolve()
      .then(() => store.dispatch(actions.editDemo(name)))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should set TopBar title with title index', () => {
    const title = 'test';
    const titleIndex = 'text index';
    const expectedActions = [{ type: types.SET_TOPBAR_TITLE, title, titleIndex }];
    const store = mockStore({});
    store.dispatch(actions.setTopBarTitle(title, titleIndex));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should set TopBar title without title index', () => {
    const title = 'test';
    const expectedActions = [{ type: types.SET_TOPBAR_TITLE, title, titleIndex: null }];
    const store = mockStore({});
    store.dispatch(actions.setTopBarTitle(title));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should sign out', () => {
    const expectedActions = [];
    const store = mockStore({});
    Promise.resolve()
      .then(() => store.dispatch(actions.signOut()))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });


  it('should change TopBar Menu', () => {
    const expectedActions = [{ type: types.SHOW_LOADER }];
    const store = mockStore({ app: { isEditDemo: false } });
    Promise.resolve()
      .then(() => store.dispatch(actions.changeTopBarMenu()))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should change TopBar Menu to Sign Out', () => {
    const expectedActions = [];
    const store = mockStore({ app: { isEditDemo: false } });
    Promise.resolve()
      .then(() => store.dispatch(actions.changeTopBarMenu(options.PATH_SIGN_OUT)))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

/*
  it('should change TopBar Menu in Editor', () => {
    const expectedActions = [
      { type: types.OPEN_CONFIRM_EXIT_EDITOR, cb: actions.loadDemos },
    ];
    const store = mockStore({ app: { isEditDemo: true } });
    Promise.resolve()
      .then(() => store.dispatch(actions.changeTopBarMenu()))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });


  it('should change TopBar Menu to Sign Out in Editor', () => {
    const expectedActions = [
      { type: types.OPEN_CONFIRM_EXIT_EDITOR, cb: actions.signOut },
    ];
    const store = mockStore({ app: { isEditDemo: true } });
    Promise.resolve()
      .then(() => store.dispatch(actions.changeTopBarMenu(options.PATH_SIGN_OUT)))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });
*/
});
