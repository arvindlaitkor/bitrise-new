/**
 * Directory Links Component
 */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import * as options from '../../constants/Options';
import './styles.css';

const DirectoryLink = props => (
  <li>
    <a
      className={classNames({ inactive: !props.isActive })}
      rel="noreferrer noopener"
      target="_blank"
      href={`http://test.${options.URL_FOOTPRINLABS}${props.path}`}
    >
      {props.name}
    </a>
  </li>
);

DirectoryLink.propsTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

DirectoryLink.defaultProps = {
  isActive: true,
};

const DirectoryLinks = () => (
  <div className="directory-links">
    <div>
      <h3>General</h3>
      <ul>
        <DirectoryLink path="/apps" name="AppsBar (Mobile)" />
        <DirectoryLink path="/app/profile-onboarding" name="Profile Onboarding" isActive={false} />
      </ul>
    </div>
    <div>
      <h3>HQ</h3>
      <ul>
        <DirectoryLink path="/" name="Channel" />
        <DirectoryLink path="/@staff#notabs" name="Channel. Hide tabs and purpose" />
        <DirectoryLink path="/@staff#nocover" name="Channel. Hide cover" />
        <DirectoryLink path="/@staff#nocover-showtabs" name="Channel. Hide cover, show tabs" />
        <DirectoryLink path="/@staff#onboarding" name="Onboarding" />
        <DirectoryLink path="/user/@gerardocorrea" name="Private Messages" />
        <DirectoryLink path="/" name="Chat, not joined" isActive={false} />
      </ul>
    </div>
    <div>
      <h3>Affiliate</h3>
      <ul>
        <DirectoryLink path="/affiliate" name="Channel" />
        <DirectoryLink path="/affiliate/@staff#notabs" name="Channel. Hide tabs and purpose" />
        <DirectoryLink path="/affiliate/@staff#nocover" name="Channel. Hide cover" />
        <DirectoryLink path="/affiliate/@staff#nocover-showtabs" name="Channel. Hide cover, show tabs" />
        <DirectoryLink path="/affiliate/@staff#onboarding" name="Onboarding" />
        <DirectoryLink path="/affiliate/user/@gerardocorrea" name="Private Messages" />
        <DirectoryLink path="/" name="Chat, not joined" isActive={false} />
      </ul>
    </div>
    <div>
      <h3>Apps</h3>
      <ul>
        <DirectoryLink path="/app/auditorium" name="Auditorium" isActive={false} />
        <DirectoryLink path="/app/locations" name="Locations" />
        <DirectoryLink path="/app/history" name="History" isActive={false} />
        <DirectoryLink path="/app/favorites" name="Favorites" isActive={false} />
        <DirectoryLink path="/app/files" name="Files" isActive={false} />
        <DirectoryLink path="/app/members" name="Members" isActive={false} />
        <DirectoryLink path="/app/messages" name="Messages" isActive={false} />
        <DirectoryLink path="/app/search" name="Search" isActive={false} />
        <DirectoryLink path="/app/updates" name="Updates" isActive={false} />
      </ul>
    </div>
  </div>
);

module.exports = DirectoryLinks;
