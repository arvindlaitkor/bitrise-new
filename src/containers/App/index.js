/**
 * App Component Container
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/appActions';
import * as options from '../../constants/Options';
import * as strings from '../../constants/Strings';
import Loader from '../../components/Loader';
import TopBar from '../../components/TopBar';
import ModalConfirm from '../../components/ModalConfirm';
import './styles.css';

class App extends Component {

  /**
   * Invokes before render
   */
  componentWillMount() {
    if (this.props.location && this.props.location.pathname === `/${options.PATH_ALL_DEMOS}`) {
      this.props.dispatch(actions.loadDemos(options.PATH_ALL_DEMOS));
    } else if (this.props.location && this.props.location.pathname === `/${options.PATH_MY_DEMOS}`) {
      this.props.dispatch(actions.loadDemos(options.PATH_MY_DEMOS));
    }
  }

  /**
   * Invokes before update
   */
  /* istanbul ignore next */
  componentWillUpdate(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname &&
      nextProps.location.pathname === `/${options.PATH_MY_DEMOS}`) {
      this.props.dispatch(actions.loadDemos(options.PATH_MY_DEMOS));
    }
  }

  actions = bindActionCreators(actions, this.props.dispatch);

  /**
   * Renders component
   */
  render = () =>
    <div className="app-container">
      <TopBar
        title={this.props.topBarTitle}
        titleIndex={this.props.topBarTitleIndex}
        options={this.props.topBarOptions}
        changeTopBarMenu={this.actions.changeTopBarMenu}
        isShowNewDemo={!(this.props.isNewDemo || this.props.isEditDemo)}
        isShowTopBarNavigation={this.props.isShowTopBarNavigation}
        newDemo={this.actions.newDemo}
      />
      {this.props.isLoading ? <Loader /> : this.props.children}
      <div className="footer">{`${strings.FP_DEMO} ${process.env.APP_VERSION}`}</div>
      {this.props.isConfirmExitEditor &&
        <ModalConfirm
          text={strings.ARE_YOU_SURE_EXIT_WITHOUT_SAVING}
          confirmText={strings.EXIT_WITHOUT_SAVING}
          confirm={this.actions.confirmExitEditor}
          close={this.actions.closeConfirmExitEditor}
        />
      }
    </div>
}

export default connect(state => ({
  ...state.app,
  isShowTopBarNavigation: state.editor.isShowTopBarNavigation,
}))(App);
