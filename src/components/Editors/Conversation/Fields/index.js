/**
 * Message Conversation Fields Component
 */
import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import * as options from '../../../../constants/Options';
import * as strings from '../../../../constants/Strings';
import InputField from '../../../InputField';
import InputRichText from '../../../InputRichText';
import './styles.css';

const Fields = props => (
  <div className={classNames('message-fields', { child: !props.isRoot })}>
    {!props.isRoot &&
      <button type="button" className="btn-remove" onClick={() => props.removeReply(props.id)} />
    }
    <div className="message-fields-creator">
      <InputField
        id={`${props.id}-name`}
        autoFocus={props.index === 1}
        label={props.isRoot ? strings.CREATOR_NAME : strings.REPLIER_NAME}
        value={props.name}
        maxLength={30}
        placeholder={strings.ENTER_NAME}
        isCounter
        onChange={value => props.changeData(value, 'name', props.id)}
      />
      <Dropzone
        className="message-fields-image"
        activeClassName="active"
        multiple={false}
        maxSize={options.MAX_IMAGE_SIZE}
        accept={options.IMAGE_TYPES}
        onDrop={accepted =>
          props.changeData(accepted.length ? accepted[0].preview : null, 'image', props.id)}
      >
        <div className="message-fields-image-label">
          {props.isRoot ? strings.CREATOR_IMAGE : strings.REPLIER_IMAGE}
        </div>
        <button type="button">{strings.UPLOAD}</button>
      </Dropzone>
    </div>
    <InputRichText
      id={`${props.id}-text`}
      value={props.text}
      maxLength={100}
      placeholder={strings.ENTER_TEXT}
      onChange={value => props.changeData(value, 'text', props.id)}
    />
    <button
      type="button"
      className="btn-link btn-save"
      disabled={!(props.name.length && props.text.length)}
      onClick={() => props.changeData(false, 'isEdit', props.id)}
    >
      {props.isRoot ? strings.SAVE_MESSAGE : strings.SAVE_REPLY}
    </button>
  </div>
);

Fields.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  text: PropTypes.string,
  isRoot: PropTypes.bool,
  removeReply: PropTypes.func,
  changeData: PropTypes.func.isRequired,
};

Fields.defaultProps = {
  id: '',
  index: 0,
  name: '',
  text: '',
  isRoot: false,
  removeReply: () => {},
};

module.exports = Fields;
