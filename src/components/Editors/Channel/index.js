/**
 * Channel Editor Component
 */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import * as options from '../../../constants/Options';
import * as strings from '../../../constants/Strings';
import InputField from '../../InputField';
import InputSuggest from '../../InputSuggest';
import RadioGroup from '../../RadioGroup';

const Channel = props => (
  <div className="fieldset channel">
    <InputField
      id={`${props.id}-name`}
      label={`${strings.CHANNEL} ${props.index} ${strings.NAME}`}
      maxLength={30}
      autoFocus={props.index === 1}
      isCounter
      isLabelBold
      value={props.name}
      onChange={value => props.changeData(value, 'name', props.id)}
    />
    <InputField
      id={`${props.id}-description`}
      label={`${strings.CHANNEL} ${props.index} ${strings.DESCRIPTION_PURPOSE}`}
      maxLength={100}
      isCounter
      isRequired={false}
      value={props.description}
      onChange={value => props.changeData(value, 'description', props.id)}
    />
    <RadioGroup
      isInline
      id={`${props.id}-availability`}
      label={strings.IS_CHANNEL_PUBLIC_OR_PRIVATE}
      options={{
        [`${props.id}-public`]: strings.PUBLIC,
        [`${props.id}-private`]: strings.PRIVATE,
      }}
      currentId={props.availability}
      onChange={value => props.changeData(value, 'availability', props.id)}
    />
    <RadioGroup
      isInline
      id={`${props.id}-join-type`}
      label={strings.IS_CHANNEL_JOINED_OR_SUBSCRIBED}
      options={{
        [`${props.id}-joined`]: strings.JOINED,
        [`${props.id}-subscribed`]: strings.SUBSCRIBED,
      }}
      currentId={props.joinType}
      onChange={value => props.changeData(value, 'joinType', props.id)}
    />
    {props.index === 1 &&
      <InputSuggest
        id={`${props.id}-audience`}
        label={`${strings.SELECT_AUDIENCE_NETWORK}`}
        suggests={options.AUDIENCE_SUGGESTS}
        tags={props.audience}
        onChange={value => props.changeData(value, 'audience', props.id)}
      />
    }
    <Dropzone
      className={classNames('dropimage', { added: !!props.coverImg })}
      activeClassName="active"
      multiple={false}
      maxSize={options.MAX_IMAGE_SIZE}
      accept={options.IMAGE_TYPES}
      onDrop={(accept) => {
        if (accept.length) {
          props.changeData(accept[0].preview, 'coverImg', props.id);
        }
      }}
      style={{ backgroundImage: `url(${props.coverImg})` }}
    >
      <div>{props.coverImg ? strings.UPDATE_COVER : strings.ADD_COVER}</div>
    </Dropzone>
  </div>
);

Channel.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  availability: PropTypes.string,
  coverImg: PropTypes.string,
  joinType: PropTypes.string,
  changeData: PropTypes.func.isRequired,
};

Channel.defaultProps = {
  id: '',
  index: 0,
  name: '',
  availability: '',
  coverImg: '',
  joinType: '',
  description: '',
};

module.exports = Channel;
