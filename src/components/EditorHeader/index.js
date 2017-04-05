/**
 * Editor Header Component
 * Contains cover image, logo image and navigation
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import * as options from '../../constants/Options';
import * as strings from '../../constants/Strings';
import './styles.css';

export default class EditorHeader extends Component {

  static propTypes = {
    coverImg: PropTypes.string,
    logoImg: PropTypes.string,
    navigate: PropTypes.func.isRequired,
    updateCover: PropTypes.func.isRequired,
    updateLogo: PropTypes.func.isRequired,
    isShowBack: PropTypes.bool,
    isShowPublish: PropTypes.bool,
    isShowTopBarNavigation: PropTypes.bool,
  }

  static defaultProps = {
    coverImg: '',
    logoImg: '',
    isShowBack: true,
    isShowPublish: false,
    isShowTopBarNavigation: false,
  }

  /* istanbul ignore next */
  navigateNext = () => this.props.navigate(1);

  /* istanbul ignore next */
  navigateBack = () => this.props.navigate(-1);

  /**
   * Renders component
   */
  render = () =>
    <div className="editor-header">
      <Dropzone
        className={classNames('editor-header-cover', { added: !!this.props.coverImg })}
        activeClassName="active"
        multiple={false}
        maxSize={options.MAX_IMAGE_SIZE}
        accept={options.IMAGE_TYPES}
        onDrop={this.props.updateCover}
        style={{ backgroundImage: `url(${this.props.coverImg})` }}
      >
        <div>{this.props.coverImg ? strings.UPDATE_COVER : strings.ADD_COVER}</div>
      </Dropzone>
      <div
        className="editor-header-btn-bar"
        ref={ref => (this.buttonsBar = ref)}
      >
        <div className="btn-bar-container">
          <Dropzone
            className={classNames('editor-header-logo', { added: !!this.props.logoImg })}
            activeClassName="active"
            multiple={false}
            maxSize={options.MAX_IMAGE_SIZE}
            accept={options.IMAGE_TYPES}
            onDrop={this.props.updateLogo}
            style={{ backgroundImage: `url(${this.props.logoImg})` }}
          >
            <div>
              <span>
                {this.props.logoImg ? strings.UPDATE_PROFILE_PHOTO : strings.ADD_PROFILE_PHOTO}
              </span>
            </div>
          </Dropzone>
          <div className={classNames('editor-header-nav', { fixed: this.props.isShowTopBarNavigation })}>
            {this.props.isShowBack &&
              <button className="btn btn-back" onClick={this.navigateBack}>{strings.BACK}</button>}
            {this.props.isShowPublish ?
              <button className="btn btn-next" onClick={this.props.publish}>{strings.PUBLISH}</button>
              :
              <button className="btn btn-next" onClick={this.navigateNext}>{strings.NEXT}</button>
            }
          </div>
        </div>
      </div>
    </div>
}
