/**
 * Input Field Component
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import * as strings from '../../constants/Strings';
import './styles.css';

export default class InputField extends Component {

  static propTypes = {
    className: PropTypes.string,
    fieldType: PropTypes.string,
    label: PropTypes.string,
    variable: PropTypes.string,
    isLabel: PropTypes.bool,
    type: PropTypes.string,
    maxLength: PropTypes.number,
    isCounter: PropTypes.bool,
    isRequired: PropTypes.bool,
    isLabelBold: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    fieldType: 'input',
    label: '',
    variable: '',
    isLabel: true,
    type: 'text',
    maxLength: 100,
    isCounter: false,
    isRequired: true,
    isLabelBold: false,
  };

  state = {
    counter: 0,
  }

  /**
   * Invokes before render
   */
  componentWillMount() {
    const value = this.props.value || '';
    this.setState({ counter: this.props.maxLength - value.length });
  }

  /**
   * Handles input change
   */
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ counter: this.props.maxLength - value.length }, () => {
      if (this.state.counter !== 0) this.props.onChange(value, this.props.variable);
    });
  }

  /**
   * Renders component
   */
  render() {
    const {
      isLabelBold,
      isRequired,
      className,
      fieldType,
      label,
      variable,
      isLabel,
      isCounter,
      ...inputProps
    } = this.props;

    return (
      <div
        className={classNames('input', {
          counter: isCounter,
          [className]: className,
        })}
      >
        {isLabel &&
          <label htmlFor={inputProps.id}>
            <span className={classNames({ bold: isLabelBold })}>{label}</span>
            {!isRequired && <i>{strings.OPTIONAL}</i>}
          </label>
        }
        {(() => {
          switch (fieldType) {

            case 'text':
              return <textarea {...inputProps} onChange={this.handleChange} />;

            case 'input':
            default:
              return <input {...inputProps} onChange={this.handleChange} />;
          }
        })()}
        {isCounter &&
          <div className={classNames('input-counter', { red: this.state.counter === 0 })}>
            {this.state.counter}
          </div>}
      </div>
    );
  }
}
