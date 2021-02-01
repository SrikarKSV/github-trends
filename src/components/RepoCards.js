import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch, faStar } from '@fortawesome/free-solid-svg-icons';

export default class RepoCards extends Component {
  static propTypes = {
    repos: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  };

  render() {
    const { repos } = this.props;
    return (
      <div className='repo-cards-container'>
        {/* Checking if the response has a data or not */}
        {Array.isArray(repos) ? (
          repos.map((repo) => (
            <article key={repo.authorImg}>
              <img src={repo.authorImg} alt={repo.title} />
              <div className='repo-cards-container__info'>
                <h4>
                  <a href={repo.repoLink} target='_blank' rel='noreferrer'>
                    {repo.title}
                  </a>
                </h4>
                <p>{repo.description}</p>
                <p>Language : {repo.language}</p>
                <p>
                  <span>
                    <FontAwesomeIcon icon={faStar} size='1x' />
                    {repo.stars}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faCodeBranch} size='1x' />
                    {repo.forks}
                  </span>
                </p>
                <div>
                  <p>Contributors</p>
                  <div className='contributors-images'>
                    {repo.contributors.length
                      ? repo.contributors.map((contributors) => (
                          <a
                            href={contributors.contributorsLink}
                            target='_blank'
                            rel='noreferrer'
                          >
                            <img
                              src={`${contributors.img}?s=60`}
                              alt='Contributor avatar'
                            />
                          </a>
                        ))
                      : 'No Contributor'}
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p>{repos}</p>
        )}
      </div>
    );
  }
}
