import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UserCards extends Component {
  static propTypes = {
    repos: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  };

  render() {
    const { devs } = this.props;
    return (
      <div>
        {Array.isArray(devs) ? (
          devs.map((dev) => (
            <article>
              <img
                src={`${dev.profileImg}?s=180`}
                alt={`Avatar of ${dev.fullName}`}
              />
              <div>
                <h4>
                  <a href={`https://github.com${dev.profileLink}`}>
                    {dev.fullName}
                  </a>
                </h4>
                <h5>{dev.userName}</h5>
                <p>
                  Popular repo :{' '}
                  <a href={dev.popularRepoLink}>{dev.popularRepo}</a>
                </p>
                <p>{dev.popularRepoDescription}</p>
              </div>
            </article>
          ))
        ) : (
          <p>{devs}</p>
        )}
      </div>
    );
  }
}
