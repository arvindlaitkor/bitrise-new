/**
 * About Editor Component
 */
import React, { Component } from 'react';
import moment from 'moment';
import * as options from '../../../constants/Options';
import * as strings from '../../../constants/Strings';
import InputField from '../../InputField';
import RadioGroup from '../../RadioGroup';
import Dropdown from '../../Dropdown';

const getYears = () => {
  const years = {};
  for (let y = 1900; y <= (new Date().getFullYear()); y += 1) {
    const year = y.toString();
    years[year] = year;
  }
  return years;
};

const getMonths = () => {
  const months = {};
  for (let m = 0; m < 12; m += 1) {
    const month = moment().month(m).format('MMMM');
    months[month] = month;
  }
  return months;
};

export default class About extends Component {

  state = {
    data: {
      description: '',
      organizationType: strings.CROSSFIT_BOX_IN_US,
      foundedYear: '1990',
      foundedMonth: 'January',
      foundedDay: '31',
      history: [
        { id: 'history-1', date: '', milestone: '' },
      ],
    },
    organizations: {
      'box-in-us': strings.CROSSFIT_BOX_IN_US,
      'box-outside-us': strings.CROSSFIT_BOX_OUTSIDE_IN_US,
      'box-officers': strings.CROSSFIT_BOX_FOR_OFFICERS_AND_MILITARY,
      'box-other': strings.CROSSFIT_BOX_FOR_OTHER,
    },
    organizationId: 'box-in-us',
    foundedYears: getYears(),
    foundedMonths: getMonths(),
    foundedDays: {},
    isValid: false,
  }

  /**
   * Invokes before render
   */
  componentWillMount() {
    this.setState({ data: { ...this.state.data, ...this.props.data } },
      this.updateDays);
  }

  /**
   * Handles changing of data
   */
  handleChangeData = (value, state, cb = () => {}) =>
    this.setState({ data: { ...this.state.data, [state]: value } }, cb)

  /**
   * Handles updating of calendar days
   */
  updateDays = () => {
    const foundedDays = {};
    const daysInMonth =
      moment(`${this.state.data.foundedYear} ${this.state.data.foundedMonth}`, 'YYYY MMMM')
      .daysInMonth();
    let day = Number(this.state.data.foundedDay);

    for (let d = 1; d <= daysInMonth; d += 1) {
      const dayValue = d.toString();
      foundedDays[dayValue] = dayValue;
    }

    while (day > daysInMonth) day -= 1;

    this.setState({
      foundedDays,
      data: { ...this.state.data, foundedDay: day.toString() },
    });
  }

  /**
   * Handles adding of a history milestone
   */
  handleAddHistory = () => {
    const history = this.state.data.history;
    history.push({ id: `history-${history.length + 1}`, date: '', milestone: '' });
    this.setState({ data: { ...this.state.data, history } });
  }

  /**
   * Handles changing of history
   */
  handleChangeHistory = (value, state, id) => {
    const history = this.state.data.history;
    history.find(i => i.id === id)[state] = value;
    this.setState({ data: { ...this.state.data, history } });
  }

  /**
   * Handles removing of history milestone
   */
  handleRemoveHistory = () => {
    const history = this.state.data.history;
    history.splice(-1, 1);
    this.setState({ data: { ...this.state.data, history } });
  }

  /**
   * Renders component
   */
  render = () =>
    <form
      className="form"
      onSubmit={e => e.preventDefault()}
    >
      <div className="row">
        <div className="col">
          <InputField
            id="input-description"
            variable="description"
            fieldType="text"
            autoFocus
            label={strings.DESCRIPTION}
            value={this.state.data.description}
            isCounter
            maxLength={100}
            rows={3}
            onChange={this.handleChangeData}
          />
          <div className="row">
            <Dropdown
              className="col"
              label={strings.DATE_FOUNDED}
              options={this.state.foundedYears}
              currentId={this.state.data.foundedYear}
              onChange={value => this.handleChangeData(value, 'foundedYear', this.updateDays)}
            />
            <Dropdown
              className="col"
              options={this.state.foundedMonths}
              currentId={this.state.data.foundedMonth}
              onChange={value => this.handleChangeData(value, 'foundedMonth', this.updateDays)}
            />
            <Dropdown
              className="col"
              options={this.state.foundedDays}
              currentId={this.state.data.foundedDay}
              onChange={value => this.handleChangeData(value, 'foundedDay')}
            />
          </div>
          {this.state.data.history.map((item, i) =>
            <div key={item.id} className="row anim">
              <InputField
                className="col"
                id={`${item.id}-date`}
                variable="date"
                label={strings.HISTORY}
                isLabel={i === 0}
                value={this.state.data.history[i].date}
                maxLength={100}
                placeholder={strings.DATE}
                onChange={value => this.handleChangeHistory(value, 'date', item.id)}
              />
              <InputField
                className="col"
                id={`${item.id}-milestone`}
                variable="milestone"
                isLabel={i === 0}
                value={this.state.data.history[i].milestone}
                maxLength={100}
                placeholder={strings.MILESTONE}
                onChange={value => this.handleChangeHistory(value, 'milestone', item.id)}
              />
            </div>)
          }
          <div className="btn-group">
            {this.state.data.history.length <= options.MAX_MILESTONES &&
              <button type="button" className="btn-link" onClick={this.handleAddHistory}>
                {strings.ADD_MILESTONE}
              </button>
            }
            {this.state.data.history.length > 1 &&
              <button type="button" className="btn-link right" onClick={this.handleRemoveHistory}>
                {strings.REMOVE_LAST_MILESTONE}
              </button>
            }
          </div>
        </div>
        <div className="col">
          <RadioGroup
            id="input-organization-type"
            label={strings.ORGANIZATION_TYPE}
            options={this.state.organizations}
            currentId={this.state.organizationId}
            onChange={organizationId => (
              this.setState({
                organizationId,
                data: {
                  ...this.state.data,
                  organizationType: this.state.organizations[organizationId],
                },
              })
            )}
          />
        </div>
      </div>
    </form>
}
