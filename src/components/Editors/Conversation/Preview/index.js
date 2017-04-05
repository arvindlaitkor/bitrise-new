/**
 * Conversation Preview Component
 */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import * as strings from '../../../../constants/Strings';
import './styles.css';

const Preview = props => (
  <div className={classNames('message-preview', { child: !props.isRoot })}>
    <button
      type="button"
      className="message-preview-btn-edit"
      onClick={() => props.changeData(true, 'isEdit', props.id)}
    >
      {strings.EDIT}
    </button>
    <div
      className="message-preview-avatar"
      style={{ backgroundImage: `url(${props.image})` }}
    />
    <div>
      <div className="message-preview-name">{props.name}</div>
      <div className="message-preview-text">{props.text}</div>
    </div>
  </div>
);

Preview.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  isRoot: PropTypes.bool,
  changeData: PropTypes.func.isRequired,
};

Preview.defaultProps = {
  id: '',
  name: '',
  text: '',
  image: '',
  isRoot: false,
};

module.exports = Preview;
