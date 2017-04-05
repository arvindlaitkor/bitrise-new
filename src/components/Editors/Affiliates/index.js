/**
 * Affiliates Editor Component
 */
import React, { Component } from 'react';
import * as options from '../../../constants/Options';
import * as strings from '../../../constants/Strings';
import InputField from '../../InputField';
import Dropdown from '../../Dropdown';

const Affiliate = props => (
  <div className="fieldset">
    <h3>{`${strings.BRANCH} ${props.index}`}</h3>
    {props.index !== 1 &&
      <button type="button" className="btn-remove" onClick={() => props.removeAffiliate(props.id)} />}
    <InputField
      id={`${props.id}-name`}
      autoFocus={props.index === 1}
      label={strings.NAME_OF_AFFILIATE}
      value={props.name}
      onChange={value => props.changeData(value, 'name', props.id)}
    />
    <div className="row">
      <div className="col">
        <InputField
          id={`${props.id}-address1`}
          label={strings.ADDRESS_1}
          value={props.address1}
          onChange={value => props.changeData(value, 'address1', props.id)}
        />
        <InputField
          id={`${props.id}-address2`}
          label={strings.ADDRESS_2}
          value={props.address2}
          onChange={value => props.changeData(value, 'address2', props.id)}
        />
        <InputField
          id={`${props.id}-city`}
          label={strings.CITY}
          value={props.city}
          onChange={value => props.changeData(value, 'city', props.id)}
        />
        <InputField
          id={`${props.id}-state`}
          label={strings.STATE}
          value={props.state}
          onChange={value => props.changeData(value, 'state', props.id)}
        />
        <InputField
          id={`${props.id}-country`}
          label={strings.COUNTRY}
          value={props.country}
          onChange={value => props.changeData(value, 'country', props.id)}
        />
        <InputField
          id={`${props.id}-zip`}
          label={strings.ZIP_OR_OTHER_CODE}
          value={props.zip}
          onChange={value => props.changeData(value, 'zip', props.id)}
        />
        <InputField
          id={`${props.id}-phone`}
          label={strings.PHONE}
          value={props.phone}
          onChange={value => props.changeData(value, 'phone', props.id)}
        />
      </div>
      <div className="col">
        <InputField
          id={`${props.id}-web`}
          label={strings.WEB_ADDRESS}
          value={props.web}
          onChange={value => props.changeData(value, 'web', props.id)}
        />
        <InputField
          id={`${props.id}-facebook`}
          label={strings.FACEBOOK_PROFILE}
          value={props.facebook}
          onChange={value => props.changeData(value, 'facebook', props.id)}
        />
        <InputField
          id={`${props.id}-twitter`}
          label={strings.TWITTER_PROFILE}
          value={props.twitter}
          onChange={value => props.changeData(value, 'twitter', props.id)}
        />
        <InputField
          id={`${props.id}-youtube`}
          label={strings.YOUTUBE_PROFILE}
          value={props.youtube}
          onChange={value => props.changeData(value, 'youtube', props.id)}
        />
        <InputField
          id={`${props.id}-yelp`}
          label={strings.YELP_PROFILE}
          value={props.yelp}
          onChange={value => props.changeData(value, 'yelp', props.id)}
        />
        <InputField
          id={`${props.id}-forsquare`}
          label={strings.FOURSQUARE_SWARM_PROFILE}
          value={props.forsquare}
          onChange={value => props.changeData(value, 'forsquare', props.id)}
        />
        <InputField
          id={`${props.id}-instagram`}
          label={strings.INSTAGRAM_PROFILE}
          value={props.instagram}
          onChange={value => props.changeData(value, 'instagram', props.id)}
        />
      </div>
    </div>
  </div>
);

export default class Affiliates extends Component {

  state = {
    data: {
      'affiliate-1': this.affiliateData,
    },
    quantityOptions: (() => {
      const opts = {};
      for (let i = 0; i < options.MAX_AFFILIATES; i += 1) {
        opts[i + 1] = i + 1;
      }
      return opts;
    })(),
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

  affiliateData = {
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
  }

  /**
   * Handles changing of total of affiliate
   */
  handleChangeQuantity = (totalAffiliates) => {
    const data = this.state.data;
    const length = Object.keys(data).length;
    if (totalAffiliates === length) {
      return;
    } else if (totalAffiliates > length) {
      for (let i = 1; i <= totalAffiliates - length; i += 1) {
        data[`affiliate-${length + i}`] = this.affiliateData;
      }
    } else {
      for (let i = length; i > totalAffiliates; i -= 1) {
        delete data[`affiliate-${i}`]; // REFACTOR
      }
    }
    this.setState({ data });
  }

  /**
   * Handles changing of data
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
   * Handles removing an affiliate
   */
  handleRemoveAffiliate = (id) => {
    const data = this.state.data;
    delete data[id];
    this.setState({ data });
  }

  /**
   * Renders component
   */
  render = () =>
    <form
      className="form"
      onSubmit={e => e.preventDefault()}
    >
      <Dropdown
        label={strings.HOW_MANY_BRANCHES}
        options={this.state.quantityOptions}
        currentId={Object.keys(this.state.data).length.toString()}
        onChange={this.handleChangeQuantity}
      />
      {Object.keys(this.state.data).map((key, index) =>
        <Affiliate
          {...this.state.data[key]}
          key={key}
          id={key}
          index={index + 1}
          changeData={this.handleChangeData}
          removeAffiliate={this.handleRemoveAffiliate}
        />)
      }
    </form>
}
