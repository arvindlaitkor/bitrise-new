/**
 * Radio Group Component
 */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './styles.css';

const RadioGroup = props => (
  <div className={classNames('radio-group', { inline: props.isInline })}>
    <div className="radio-group-label">{props.label}</div>
    <div className="radios">
      {Object.keys(props.options).map((key, index) =>
        <div className="radio" key={`checkbox-${key}`}>
          <input
            type="radio"
            name={props.id}
            id={`checkbox-${key}`}
            checked={key === props.currentId || (!props.currentId && index === 0)}
            onChange={() => props.onChange(key)}
          />
          <label htmlFor={`checkbox-${key}`}>{props.options[key]}</label>
        </div>)}
    </div>
  </div>
);

RadioGroup.propTypes = {
  label: PropTypes.string,
  options: PropTypes.object,
  isInline: PropTypes.bool,
};

RadioGroup.defaultProps = {
  label: '',
  options: {},
  isInline: false,
};

module.exports = RadioGroup;
