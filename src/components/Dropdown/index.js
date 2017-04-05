/**
 * Dropdown Component
 */
import React, { Component, PropTypes } from 'react';
import reactClickOutside from 'react-click-outside';
import classNames from 'classnames';
import './styles.css';

class Dropdown extends Component {

  static propTypes = {
    label: PropTypes.string,
    options: PropTypes.object.isRequired,
    currentId: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    isShowCurrent: PropTypes.bool,
  }

  static defaultProps = {
    label: '',
    className: '',
    currentId: '',
    isShowCurrent: true,
  }

  state = {
    isOpen: false,
    currentId: this.props.currentId,
  }

  /**
   * Invokes before update
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentId !== this.state.currentId) {
      this.setState({ currentId: nextProps.currentId });
    }
  }

  /**
   * Handles open/close dropdown
   */
  handleToggle = () =>
    this.setState({ isOpen: !this.state.isOpen });

  /**
   * Handles changing (click on item)
   */
  handleChange = (currentId) => {
    this.handleToggle();
    this.setState({ currentId }, () =>
      this.props.onChange(currentId));
  }

  /**
   * Handles clicking outside
   */
  handleClickOutside = () =>
    this.setState({ isOpen: false });

  /**
   * Renders component
   */
  render = () =>
    <div
      className={classNames('dropdown', {
        open: this.state.isOpen,
        'empty-button': !this.props.isShowCurrent,
        [this.props.className]: this.props.className,
      })}
    >
      {this.props.isShowCurrent && <div className="dropdown-label">{this.props.label}</div>}
      <button
        className="dropdown-button"
        onClick={this.handleToggle}
      >
        {this.props.isShowCurrent && this.props.options[this.state.currentId]}
      </button>
      {this.state.isOpen &&
        <div
          className="dropdown-body"
          ref={ref => (this.bodyRef = ref)}
        >
          {Object.keys(this.props.options).map(key =>
            <button
              key={key}
              className="dropdown-body-item"
              onClick={() => this.handleChange(key)}
            >
              {this.props.options[key]}
            </button>)
          }
        </div>
      }
    </div>
}

module.exports = reactClickOutside(Dropdown);
