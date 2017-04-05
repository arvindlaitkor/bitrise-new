/**
 * Input RichText Component
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './styles.css';

export default class InputRichText extends Component {

  static propTypes = {
    maxLength: PropTypes.number,
    isRequired: PropTypes.bool,
    variable: PropTypes.string,
  }

  static defaultProps = {
    maxLength: 100,
    isRequired: true,
    variable: '',
  }

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
      if (this.state.counter !== 0) this.props.onChange(value);
    });
  }

  /**
   * Renders component
   */
  render() {
    const {
      isRequired,
      isCounter,
      variable,
      ...textareaProps
    } = this.props;

    return (
      <div className={classNames('input rich-text counter')}>
        <textarea {...textareaProps} cols={4} onChange={this.handleChange} />
        <div className={classNames('input-counter', { red: this.state.counter === 0 })}>
          {this.state.counter}
        </div>
        <button className="btn-emotion" />
        <button className="btn-image" />
      </div>
    );
  }
}
