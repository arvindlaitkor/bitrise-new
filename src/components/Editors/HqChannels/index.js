/**
 * HQ Channels Editor Component
 */
import React, { Component } from 'react';
import * as options from '../../../constants/Options';
import Channel from '../Channel';

const fillData = () => {
  const data = {};
  for (let i = 0; i < options.MAX_HQ_CHANNELS; i += 1) {
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

export default class HqChannels extends Component {

  state = {
    data: fillData(),
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
   * Handles changing of a data
   */
  handleChangeData = (value, state, id) =>
    this.setState({ data: {
      ...this.state.data,
      [id]: {
        ...this.state.data[id],
        [state]: value,
      },
    } })

  /**
   * Renders component
   */
  render = () =>
    <form
      className="form"
      onSubmit={e => e.preventDefault()}
    >
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
