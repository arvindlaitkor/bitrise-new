/**
 * SignIn Component Container
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions/authActions';
import * as strings from '../../constants/Strings';
import { isValidEmail } from '../../shared/utils';
import Loader from '../../components/Loader';
import './styles.css';

class SignIn extends Component {

  state = {
    email: '',
    password: '',
  }

  /**
   * Handles after renders
   */
  componentDidMount() {
    this.props.dispatch(actions.setAuthError(''));
  }

  /**
   * Handles changing of inputs
   */
  handleChangeData = field => e =>
    this.setState({ [field]: e.target.value })

  /**
   * Handles submit
   */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(actions.signIn(this.state.email, this.state.password));
  }

  /**
   * Renders component
   */
  render() {
    const submitDisabled =
      !isValidEmail(this.state.email) ||
      this.state.password.length < 2 ||
      this.props.isAuthRequest;

    return (
      <div className="signin">
        <div className="signin-topbar">
          <div className="signin-logo" />
        </div>
        <div className="signin-form">
          <h1>{strings.SIGN_IN}</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="email"
              autoFocus
              placeholder={strings.EMAIL_ADDRESS}
              value={this.state.email}
              disabled={this.props.isAuthRequest}
              onChange={this.handleChangeData('email')}
            />
            <input
              type="password"
              placeholder={strings.PASSWORD}
              value={this.state.password}
              disabled={this.props.isAuthRequest}
              onChange={this.handleChangeData('password')}
            />
            <button
              type="submit"
              disabled={submitDisabled}
              onClick={this.handleSubmit}
            >
              {this.props.isAuthRequest ? <Loader /> : strings.SIGN_IN}
            </button>
          </form>
          <div>{strings.DONT_HAVE_DEMO_ACCOUNT} <Link to="/signup">{strings.CREATE_ONE}</Link></div>
          {this.props.authErrorMessage && <div className="signin-message">{this.props.authErrorMessage}</div>}
        </div>
      </div>
    );
  }
}

export default connect(state => ({ ...state.auth }))(SignIn);
