import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatTextLength } from '../utils/utils';
import { Link } from 'react-router-dom';

function UserCard({ dev }) {
  return (
    <article className='user-card' style={{ background: '#151f28' }}>
      <img
        className='dev-avatar'
        src={`${dev.profileImg}?s=180`}
        alt={`Avatar of ${dev.fullName}`}
      />
      <div>
        <h4>
          <Link
            className='user-card__name'
            to={`/user-search?username=${dev.profileLink
              .replace(/\//, '')
              .trim()}`}
          >
            {dev.fullName}
          </Link>
        </h4>
        <p>{dev.userName}</p>
        <p>
          Popular repo :{' '}
          <a
            target='_blank'
            rel='noreferrer'
            href={dev.popularRepoLink}
            className='popular-repo'
          >
            {dev.popularRepo}
          </a>
        </p>
        <p>{formatTextLength(dev.popularRepoDescription, 90)}</p>
      </div>
    </article>
  );
}

UserCard.propTypes = {
  devs: PropTypes.object,
};

export default class UserCardGrid extends Component {
  static propTypes = {
    repos: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  };

  render() {
    const { devs } = this.props;
    return (
      <div className='user-card-container'>
        {Array.isArray(devs) ? (
          devs.map((dev) => <UserCard key={dev.id} dev={dev} />)
        ) : (
          <p>{devs}</p>
        )}
      </div>
    );
  }
}
