/**
 * Directory Component Container
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/appActions';
import DemoItem from '../../components/DemoItem';
import DirectoryLinks from '../../components/DirectoryLinks';
import './styles.css';

const Directory = (props) => {
  const { editDemo } = bindActionCreators(actions, props.dispatch);
  const items = props.demoItems ? props.demoItems[0] : [];

  return (
    <div className="directory demo-list">
      <DemoItem
        {...items}
        editDemo={editDemo}
      />
      <DirectoryLinks />
    </div>
  );
};

export default connect(state => ({ ...state.app }))(Directory);
