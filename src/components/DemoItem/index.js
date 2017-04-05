/**
 * Demo Item Component
 */
import React, { PropTypes } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import * as options from '../../constants/Options';
import * as strings from '../../constants/Strings';
import './styles.css';

const DemoItem = (props) => {
  /* istanbul ignore next */
  const handleClickEdit = () => props.editDemo(props.name);
  const url = `http://${props.name}.${options.URL_FOOTPRINTDEMO}`;
  const directoryUrl = `http://${props.name}.${options.URL_DIRECTORY}`;
  const percentComplete = Math.round((props.data_points / props.data_points_total) * 100);

  return (
    <div className="demo-item">
      <div className={classNames('demo-item-header', { 'no-bg': props.cover_img === '' })}>
        <div
          className="demo-item-cover"
          style={{ backgroundImage: `url(${props.cover_img})` }}
        />
        <div
          className="demo-item-logo"
          style={{ backgroundImage: `url(${props.logo_img})` }}
        />
        <div className="demo-item-title">{props.display_name}</div>
      </div>
      <ul className="demo-item-info">
        <li><b>{`${strings.URL}:`}</b> <span><a href={url} target="_blank" rel="noreferrer noopener">{url}</a></span></li>
        <li><b>{`${strings.DATA_POINTS}:`}</b> <span>{`${props.data_points}/${props.data_points_total}`}</span></li>
        <li><b>{`${strings.PERCENT_COMPLETE}:`}</b> <span>{`${percentComplete}%`}</span></li>
        <li><b>{`${strings.CREATED_BY}:`}</b> <span>Chris McCoy</span></li>
        <li><b>{`${strings.CREATED_ON}:`}</b> <span>{props.create_at && moment.unix(props.create_at).format('MMMM D, YYYY')}</span></li>
        <li><b>{`${strings.LAST_EDITED}:`}</b> <span>{props.update_at && moment.unix(props.update_at).format('MMMM D, YYYY')}</span></li>
        <li><b>{`${strings.DIRECTORY}:`}</b> <span><a href={directoryUrl} target="_blank" rel="noreferrer noopener">{directoryUrl}</a></span></li>
      </ul>
      <button
        className="demo-item-btn-edit"
        onClick={handleClickEdit}
      >{strings.EDIT}</button>
    </div>
  );
};

DemoItem.propTypes = {
  name: PropTypes.string,
  display_name: PropTypes.string,
  create_at: PropTypes.number,
  update_at: PropTypes.number,
  cover_img: PropTypes.string,
  logo_img: PropTypes.string,
  data_points: PropTypes.number,
  data_points_total: PropTypes.number,
  editDemo: PropTypes.func,
};

DemoItem.defaultProps = {
  id: '',
  name: '',
  display_name: '',
  create_at: 0,
  update_at: 0,
  cover_img: '',
  logo_img: '',
  data_points: 0,
  data_points_total: 0,
  editDemo: () => {},
};

module.exports = DemoItem;
