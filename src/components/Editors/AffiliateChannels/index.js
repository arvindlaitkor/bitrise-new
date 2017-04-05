/**
 * Affiliate Channels Editor Component
 */
import React, { Component } from 'react';
import * as options from '../../../constants/Options';
import * as strings from '../../../constants/Strings';
import Channel from '../Channel';

const fillData = () => {
  const data = {};
  for (let i = 0; i < options.MAX_AFIILIATE_CHANNELS; i += 1) {
    data[`channel-${i + 1}`] = {
      index: i + 1,
      name: '',
      description: '',
      availability: '',
      joinType: '',
      audienceNetworks: [],
      cover: '',
    };
  }
  return data;
};

export default class AffiliateChannels extends Component {

  state = {
    data: fillData(),
    isValid: false,
    isShowDialog: true,
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
    if (nextProps.index !== this.props.index ||
      JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {
      this.setState({ data: nextProps.data ? nextProps.data : fillData() });
    }
  }

  /**
   * Handles changing of a data
   */
  handleChangeData = (value, state, id) => {
    this.setState({ data: {
      ...this.state.data,
      [id]: {
        ...this.state.data[id],
        [state]: value,
      },
    } });
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
    <form
      className="form"
      onSubmit={e => e.preventDefault()}
    >
      {this.state.isShowDialog && this.props.index > 0 &&
        <div className="form-dialog">
          <div className="form-dialog-text">{strings.USER_DATA_FROM_PREVIOUS_BRANCH}</div>
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
      <div className="row-cards">
        {Object.keys(this.state.data).map(key =>
          <Channel
            {...this.state.data[key]}
            key={key}
            id={key}
            changeData={this.handleChangeData}
          />)}
      </div>
    </form>
}
