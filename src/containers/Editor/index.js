/**
 * Editor Component Container
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/editorActions';
import * as editorsIds from '../../constants/EditorsIds';
import * as Editors from '../../components/Editors';
import EditorHeader from '../../components/EditorHeader';
import './styles.css';

class Editor extends Component {

  state = {
    editorComponent: null,
  }

  /**
   * Invokes before render
   */
  componentWillMount() {
    const isEdit = this.props.location && this.props.location.pathname.split('/')[1] === 'edit';
    const id = (this.props && this.props.params && this.props.params.id) || null;
    this.props.dispatch(actions.initEditor(isEdit, id)).then(this.update);
  }

  /**
   * Invokes after render
   */
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }

  /**
   * Returns cover and logo images
   */
  getImages() {
    let data = '';
    if (this.props.currentEditor === editorsIds.AFFILIATE_CHANNELS) {
      data = this.props.data[editorsIds.AFFILIATES][this.props.currentAffiliate];
      return {
        coverImg: data ? data.coverImg : '',
        logoImg: data ? data.logoImg : '',
      };
    } else if (this.props.currentEditor === editorsIds.AFFILIATE_CHAT) {
      data = this.props.affiliateIds[0] ?
        this.props.data[editorsIds.AFFILIATES][this.props.affiliateIds[0]] : null;
      return {
        coverImg: data ? data.coverImg : '',
        logoImg: data ? data.logoImg : '',
      };
    }
    return {
      coverImg: this.props.data.coverImg,
      logoImg: this.props.data.logoImg,
    };
  }

  /**
   * Invokes when unmount
   */
  componentUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  actions = bindActionCreators(actions, this.props.dispatch);

  /**
   * Handles show hide topbar navigation
   */
  handleScroll = () => {
    const rect = this.header.buttonsBar.getBoundingClientRect();
    const y = rect.top - (rect.height / 2);
    if (this.props.isShowTopBarNavigation && y > 0) {
      this.props.dispatch(actions.toggleTopBarNavigation(false));
    } else if (!this.props.isShowTopBarNavigation && y < 0) {
      this.props.dispatch(actions.toggleTopBarNavigation(true));
    }
  }

  /**
   * Updates editor component
   */
  update = () => {
    const data = this.props.data[this.props.currentEditor];
    const props = { data, ref: ref => (this.editorComponent = ref) };

    this.setState(() => {
      switch (this.props.currentEditor) {

        case editorsIds.HQ_ABOUT:
          return { editorComponent: <Editors.About {...props} /> };

        case editorsIds.HQ_CHANNELS:
          return { editorComponent: <Editors.HqChannels {...props} /> };

        case editorsIds.AFFILIATES:
          return { editorComponent: <Editors.Affiliates {...props} /> };

        case editorsIds.AFFILIATE_CHANNELS: {
          const affiliateData =
            data && this.props.currentAffiliate &&
            Object.prototype.hasOwnProperty.call(data, this.props.currentAffiliate) ?
            data[this.props.currentAffiliate] : undefined;

          return {
            editorComponent: <Editors.AffiliateChannels
              data={affiliateData}
              index={this.props.affiliateIds.indexOf(this.props.currentAffiliate)}
              ref={ref => (this.editorComponent = ref)}
              reuseData={() => this.props.dispatch(actions.reuseData()).then(this.update)}
            /> };
        }

        case editorsIds.HQ_CHAT:
          return { editorComponent: <Editors.HqChat {...props} /> };

        case editorsIds.AFFILIATE_CHAT:
          return {
            editorComponent: <Editors.AffiliateChat
              {...props}
              reuseData={() => this.props.dispatch(actions.reuseData()).then(this.update)}
            />,
          };

        case editorsIds.URL:
          return { editorComponent: <Editors.Url {...props} /> };

        case editorsIds.HQ_BASIC:
        default:
          return { editorComponent: <Editors.HqBasic {...props} /> };
      }
    });
  }

  /**
   * Handles navigation between editors
   */
  navigate = (direction = 1) => {
    this.props.dispatch(actions.saveData(this.editorComponent.state.data))
      .then(() => this.props.dispatch(actions.navigate(direction)))
      .then(() => window.scrollTo(0, 0))
      .then(this.update);
  }

  /**
   * Renders component
   */
  render = () =>
    <div className="editor">
      <EditorHeader
        {...this.getImages()}
        ref={ref => (this.header = ref)}
        navigate={this.navigate}
        updateCover={this.actions.updateCover}
        updateLogo={this.actions.updateLogo}
        publish={this.actions.publish}
        isShowBack={!this.props.isFirstEditor}
        isShowPublish={this.props.isLastEditor}
        isShowTopBarNavigation={this.props.isShowTopBarNavigation}
      />
      <div className="editor-container">
        {this.state.editorComponent}
      </div>
    </div>
}

export default connect(state => ({ ...state.editor }))(Editor);
