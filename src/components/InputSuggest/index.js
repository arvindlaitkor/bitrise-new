/**
 * Input Suggest Component
 */
import React, { Component, PropTypes } from 'react';
import reactClickOutside from 'react-click-outside';
import classNames from 'classnames';
import { numberWithCommas } from '../../shared/utils';
import './styles.css';

class InputSuggest extends Component {

  static propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    suggests: PropTypes.object,
    tags: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    id: '',
    label: '',
    suggests: {},
    tags: [],
  }

  state = {
    isOpen: false,
    inputValue: '',
    exclude: [],
  }

  /**
   * Handles opening dropdown
   */
  handleOpen = () => {
    if (!this.state.isOpen) {
      this.setState({ isOpen: true });
    }
  }

  /**
   * Handles changing of input value
   */
  handleChangeInput = (e) => {
    const filterBy = e.target.value.toLowerCase();
    let exclude = [];

    if (filterBy) {
      exclude = Object.keys(this.props.suggests)
        .filter(i => this.props.suggests[i].name.toString().toLowerCase().indexOf(filterBy) === -1);
    }

    this.setState({ inputValue: e.target.value, exclude });
  }

  /**
   * Handles clicking outside
   */
  handleClickOutside = () =>
    this.setState({ isOpen: false });

  /**
   * Handles adding a tag
   */
  handleAddTag = (tagId) => {
    this.props.onChange([...this.props.tags, tagId]);
    this.inputRef.focus();
  }

  /**
   * Handles removing a tag
   */
  handleRemoveTag = (tagId) => {
    const tags = this.props.tags;
    const index = tags.indexOf(tagId);
    tags.splice(index, 1);
    this.props.onChange(tags);
    this.inputRef.focus();
  }

  /**
   * Renders component
   */
  render = () =>
    <div className={classNames('input-suggest', { open: this.state.isOpen })}>
      <label htmlFor={this.props.id}>{this.props.label}</label>
      <div className="input-suggest-field">
        <input
          id={this.props.id}
          ref={ref => (this.inputRef = ref)}
          value={this.state.inputValue}
          onChange={this.handleChangeInput}
          onClick={this.handleOpen}
          onFocus={this.handleOpen}
          maxLength={100}
          autoComplete="off"
        />
        <div className="input-suggest-tags">
          {this.props.tags.map(key =>
            <button
              key={`tag-${key}`}
              type="button"
              onClick={() => this.handleRemoveTag(key)}
            >
              {`${this.props.suggests[key].name} | ${numberWithCommas(this.props.suggests[key].number)}`}
            </button>)
          }
        </div>
      </div>
      {this.state.isOpen &&
        <div className="input-suggest-dropdown">
          {Object.keys(this.props.suggests)
            .filter(i => this.state.exclude.indexOf(i) === -1)
            .filter(i => this.props.tags.indexOf(i) === -1)
            .map(key =>
              <button
                key={`suggest-${key}`}
                type="button"
                onClick={() => this.handleAddTag(key)}
              >
                <b>{this.props.suggests[key].name}</b>
                <span>{` | ${numberWithCommas(this.props.suggests[key].number)}`}</span>
              </button>)
          }
        </div>
      }
    </div>
}

module.exports = reactClickOutside(InputSuggest);
