/**
 * Url Editor Component
 */
import React, { Component } from 'react';
import * as strings from '../../../constants/Strings';
import * as options from '../../../constants/Options';
import InputField from '../../InputField';
import './styles.css';

export default class Url extends Component {

  state = {
    data: {
      url: '',
    },
    isChecking: false,
    isTaken: false,
    isValid: false,
  }

  /**
   * Invokes before render
   */
  componentWillMount() {
    this.setState({ data: { ...this.state.data, ...this.props.data } });
  }

  /**
   * Handles changing of an input
   */
  handleChangeInput = (value, state, cb = () => {}) =>
    this.setState({ data: { ...this.state.data, [state]: value } }, cb)

  /**
   * Handles checking URL availability
   */
  handleCheckAvailability = () =>
    this.setState({ isTaken: false, isChecking: true }, () =>
      setTimeout(() =>
        this.setState({ isTaken: true, isChecking: false }), (Math.random() * 1000) + 100),
    )

  /**
   * Renders component
   */
  render = () =>
    <form
      className="form url-editor"
      onSubmit={e => e.preventDefault()}
    >
      <div>
        <InputField
          id="input-url"
          label={strings.URL_FOR_THE_DEMO}
          isLabelBold
          autoFocus
          value={this.state.data.url}
          disabled={this.state.isChecking}
          onChange={value => this.handleChangeInput(value, 'url')}
        />
        <div className="domain">{`.${options.URL_FOOTPRINTDEMO}`}</div>
      </div>
      <button
        type="button"
        className="btn-link"
        disabled={this.state.isChecking}
        onClick={this.handleCheckAvailability}
      >
        {strings.CHECK_IF_AVAILABLE}
      </button>
      {this.state.isTaken &&
        <div className="url-editor-message red">{strings.THIS_NAME_IS_ALREADY_TAKEN}</div>
      }
    </form>
}
