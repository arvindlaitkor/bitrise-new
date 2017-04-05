/**
 * Demo List Component Container
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/appActions';
import DemoItem from '../../components/DemoItem';
import './styles.css';

const DemoList = (props) => {
  const { editDemo } = bindActionCreators(actions, props.dispatch);

  return (
    <div className="demo-list">
      {props.demoItems && props.demoItems.map(i =>
        <DemoItem
          {...i}
          key={`item-${i.id}`}
          editDemo={editDemo}
        />)
      }
    </div>
  );
};

export default connect(state => ({ ...state.app }))(DemoList);
