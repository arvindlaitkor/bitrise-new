/**
 * HQ Basic Editor Component
 */
import React, { Component } from 'react';
import * as strings from '../../../constants/Strings';
import InputField from '../../InputField';

export default class HqBasic extends Component {

  state = {
    data: {
      name: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      country: '',
      zip: '',
      phone: '',
      web: '',
      facebook: '',
      twitter: '',
      youtube: '',
      yelp: '',
      foursquare: '',
      instagram: '',
      isValid: false,
    },
    isValid: false,
  }

  /**
   * Invokes before render
   */
  componentWillMount() {
    this.setState({ data: { ...this.state.data, ...this.props.data } });
  }

  /**
   * Handles changing of an input
   */
  handleChangeData = (value, state) =>
    this.setState({ data: { ...this.state.data, [state]: value } });

  /**
   * Renders component
   */
  render = () =>
    <form
      className="form"
      onSubmit={e => e.preventDefault()}
    >
      <InputField
        id="input-name"
        variable="name"
        autoFocus
        label={strings.NAME_OF_HEADQUARTERS}
        value={this.state.data.name}
        onChange={this.handleChangeData}
      />
      <div className="row">
        <div className="col">
          <InputField
            id="input-address1"
            variable="address1"
            label={strings.ADDRESS_1}
            value={this.state.data.address1}
            onChange={this.handleChangeData}
          />
          <InputField
            id="input-address2"
            variable="address2"
            label={strings.ADDRESS_2}
            value={this.state.data.address2}
            onChange={this.handleChangeData}
          />
          <InputField
            id="input-city"
            variable="city"
            label={strings.CITY}
            value={this.state.data.city}
            onChange={this.handleChangeData}
          />
          <InputField
            id="input-state"
            variable="state"
            label={strings.STATE}
            value={this.state.data.state}
            onChange={this.handleChangeData}
          />
          <InputField
            id="input-country"
            variable="country"
            label={strings.COUNTRY}
            value={this.state.data.country}
            onChange={this.handleChangeData}
          />
          <InputField
            id="input-zip"
            variable="zip"
            label={strings.ZIP_OR_OTHER_CODE}
            value={this.state.data.zip}
            onChange={this.handleChangeData}
          />
          <InputField
            id="input-phone"
            variable="phone"
            label={strings.PHONE}
            value={this.state.data.phone}
            onChange={this.handleChangeData}
          />
        </div>
        <div className="col">
          <InputField
            id="input-web"
            variable="web"
            label={strings.WEB_ADDRESS}
            value={this.state.data.web}
            onChange={this.handleChangeData}
          />
          <InputField
            id="input-facebook"
            variable="facebook"
            label={strings.FACEBOOK_PROFILE}
            value={this.state.data.facebook}
            onChange={this.handleChangeData}
          />
          <InputField
            id="input-twitter"
            variable="twitter"
            label={strings.TWITTER_PROFILE}
            value={this.state.data.twitter}
            onChange={this.handleChangeData}
          />
          <InputField
            id="input-youtube"
            variable="youtube"
            label={strings.YOUTUBE_PROFILE}
            value={this.state.data.youtube}
            onChange={this.handleChangeData}
          />
          <InputField
            id="input-yelp"
            variable="yelp"
            label={strings.YELP_PROFILE}
            value={this.state.data.yelp}
            onChange={this.handleChangeData}
          />
          <InputField
            id="input-forsquare"
            variable="forsquare"
            label={strings.FOURSQUARE_SWARM_PROFILE}
            value={this.state.data.forsquare}
            onChange={this.handleChangeData}
          />
          <InputField
            id="input-instagram"
            variable="instagram"
            label={strings.INSTAGRAM_PROFILE}
            value={this.state.data.instagram}
            onChange={this.handleChangeData}
          />
        </div>
      </div>
    </form>
}
