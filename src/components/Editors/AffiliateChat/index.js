/**
 * Affiliate Chat Editor Component
 */
import React, { Component } from 'react';
import * as options from '../../../constants/Options';
import * as strings from '../../../constants/Strings';
import Conversation from '../Conversation';

const fillData = () => {
  const data = {};
  for (let i = 0; i < options.MAX_AFFILIATE_CONVERSATIONS; i += 1) {
    data[`message-${i + 1}`] = {
      index: i + 1,
      id: `message-${i + 1}`,
      name: '',
      image: '',
      text: '',
      replies: [],
      isEdit: true,
    };
  }
  return data;
};

export default class AffiliateChat extends Component {

  state = {
    data: fillData(),
    isShowDialog: true,
    isValid: false,
  }

  /**
   * Invokes before render
   */
  componentWillMount() {
    if (this.props.data) {
      this.setState({ data: this.props.data });
    }
  }

  /**
   * Invokes before update
   */
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {
      this.setState({ data: nextProps.data });
    }
  }

  /**
   * Handles changing of a data
   */
  handleChangeData = (value, state, id, cb = () => {}) =>
    this.setState({ data: {
      ...this.state.data,
      [id]: {
        ...this.state.data[id],
        [state]: value,
      },
    } }, cb)

  /**
   * Handles adding a reply
   */
  handleAddReply = (id) => {
    const replies = this.state.data[id].replies;
    const index = replies.length + 1;
    replies.push({
      index,
      id: `message-${id}-reply-${index}`,
      name: '',
      image: '',
      text: '',
      isEdit: true,
    });
    this.handleChangeData(replies, 'replies', id);
  }

  /**
   * Handles removing a reply
   */
  handleRemoveReply = (replyId, rootId) => {
    const replies = this.state.data[rootId].replies;
    const index = replies.findIndex(i => i.id === replyId);
    replies.splice(index, 1);
    this.handleChangeData(replies, 'replies', rootId);
  }

  /**
   * Handles changing a reply fields
   */
  handleChangeReplyData = (value, state, replyId, rootId) => {
    const replies = this.state.data[rootId].replies;
    const index = replies.findIndex(i => i.id === replyId);
    replies[index][state] = value;
    this.handleChangeData(replies, 'replies', rootId);
  }

  /**
   * Handles closing dialog
   */
  handleCloseDialog = () =>
    this.setState({ isShowDialog: false })

  /**
   * Handles clicking reuse data
   */
  handleReuseData = () =>
    this.setState({ isShowDialog: false }, this.props.reuseData)

  /**
   * Renders component
   */
  render = () =>
    <div className="form">
      {this.state.isShowDialog &&
        <div className="form-dialog">
          <div className="form-dialog-text">{strings.USE_ALL_DATA_FROM_HQ_CHAT}</div>
          <button
            type="button"
            className="form-dialog-btn accept"
            onClick={this.handleReuseData}
          >
            {strings.YES}
          </button>
          <button
            type="button"
            className="form-dialog-btn cancel"
            onClick={this.handleCloseDialog}
          >
            {strings.NO}
          </button>
        </div>
      }
      {Object.keys(this.state.data).map(key =>
        <Conversation
          key={key}
          id={key}
          data={this.state.data[key]}
          remove={() => {}}
          addReply={this.handleAddReply}
          removeReply={this.handleRemoveReply}
          changeData={this.handleChangeData}
          changeReplyData={this.handleChangeReplyData}
        />)
      }
    </div>
}
