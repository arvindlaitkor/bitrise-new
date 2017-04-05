/**
 * Topbar Component
 */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Dropdown from '../Dropdown';
import './styles.css';

const TopBar = props => (
  <div className={classNames('topbar', { shownav: props.isShowTopBarNavigation })}>
    <div className="topbar-logo">Demo</div>
    <div className="topbar-title">
      {props.titleIndex && <b>{props.titleIndex}</b>}
      <span>{props.title}</span>
    </div>
    {props.isShowNewDemo && <button className="topbar-btn-add" onClick={props.newDemo}>New Demo</button>}
    <Dropdown
      className="topbar-btn-menu"
      options={props.options}
      onChange={props.changeTopBarMenu}
      isShowCurrent={false}
    />
  </div>
);

TopBar.propTypes = {
  title: PropTypes.string,
  titleIndex: PropTypes.number,
  options: PropTypes.object,
  changeTopBarMenu: PropTypes.func.isRequired,
  newDemo: PropTypes.func,
  isShowNewDemo: PropTypes.bool,
  isShowTopBarNavigation: PropTypes.bool,
};

TopBar.defaultProps = {
  title: '',
  titleIndex: 0,
  options: {},
  isShowNewDemo: true,
  newDemo: () => {},
  isShowTopBarNavigation: false,
};

module.exports = TopBar;
