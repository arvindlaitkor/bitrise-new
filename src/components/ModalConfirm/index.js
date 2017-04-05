/**
 * Modal Confirm Component
 */
import React, { PropTypes } from 'react';
import * as strings from '../../constants/Strings';
import './styles.css';

const Modal = props => (
  <div className="modal">
    <butotn className="modal-fade" onClick={props.close} />
    <div className="modal-body">
      <div className="modal-text">{props.text}</div>
      <button className="modal-btn btn-confirm" onClick={props.confirm}>{props.confirmText}</button>
      <button className="modal-btn btn-close" onClick={props.close}>{props.cancelText}</button>
    </div>
  </div>
);

Modal.propTypes = {
  text: PropTypes.string,
  close: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  text: strings.ARE_YOU_SURE,
  cancelText: strings.CANCEL,
  confirmText: strings.YES,
};

module.exports = Modal;
