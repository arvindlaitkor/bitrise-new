/**
 * Channel Editor Component
 */
import React, { Component, PropTypes } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import * as strings from '../../../constants/Strings';
import Fields from './Fields';
import Preview from './Preview';
import './styles.css';

const SortableItem = SortableElement(props => <Preview {...props} />);

const RepliesPreview = SortableContainer(({ items, changeData }) =>
  <div className="replies">
    {items.map((item, index) =>
      <SortableItem {...item} key={item.id} index={index} changeData={changeData} />)
    }
  </div>);

export default class Conversation extends Component {

  static propsTypes = {
    id: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired,
    addReply: PropTypes.func.isRequired,
    sortReply: PropTypes.func.isRequired,
    removeReply: PropTypes.func.isRequired,
    changeData: PropTypes.func.isRequired,
    changeReplyData: PropTypes.func.isRequired,
  }

  onSort = ({ oldIndex, newIndex }) => {
    this.props.changeData(arrayMove(this.props.data.replies, oldIndex, newIndex), 'replies', this.props.id);
  }

  /**
   * Renders component
   */
  render() {
    const { replies, ...root } = this.props.data;

    const addReply = () => this.props.addReply(this.props.id);

    const removeReply = replyId => this.props.removeReply(replyId, this.props.id);

    const changeReplyData = (value, state, replyId) =>
      this.props.changeReplyData(value, state, replyId, this.props.id);

    return (
      <div className="conversation">
        <h3>{strings.CONVERSATION} {root.index}</h3>
        <button type="button" className="btn-remove" />
        {root.isEdit ?
          <Fields {...root} isRoot changeData={this.props.changeData} />
          :
          <Preview {...root} isRoot changeData={this.props.changeData} />
        }
        <RepliesPreview
          items={replies.filter(i => !i.isEdit)}
          onSortEnd={this.onSort}
          changeData={changeReplyData}
          helperClass="drag"
        />
        {!root.isEdit && replies.filter(i => i.isEdit).length === 0 &&
          <button type="button" className="btn-link btn-add-reply" onClick={addReply}>
            {strings.ADD_REPLY}
          </button>
        }
        {replies.filter(i => i.isEdit).map(i =>
          <Fields
            {...i}
            key={i.id}
            changeData={changeReplyData}
            removeReply={removeReply}
          />)
        }
      </div>
    );
  }
}
