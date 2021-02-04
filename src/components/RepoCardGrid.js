import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch, faStar } from '@fortawesome/free-solid-svg-icons';
import languages from '../data/githubLanguages';
import { formatTextLength, formatTitle } from '../utils/utils';

function RepoCard({ repo }) {
  return (
    <article
      key={repo.id}
      style={
        languages[repo.language]?.color
          ? { background: languages[repo.language].color }
          : { background: '#151f28' }
      }
      className={`repo-card ${
        repo.language === 'JavaScript' ? 'javascript' : ''
      }`}
    >
      <img
        className='dev-avatar'
        src={
          repo?.authorImg
            ? repo.authorImg
            : 'https://avatars.githubusercontent.com/u/649246'
        }
        alt={repo.title}
      />
      <div className='repo-cards-container__info'>
        <h4>
          <a href={repo.repoLink} target='_blank' rel='noreferrer'>
            {formatTitle(repo.title)}
          </a>
        </h4>
        <p>{formatTextLength(repo.popularRepoDescription, 90)}</p>
        <p>Language : {repo?.language ? repo.language : 'No language used'}</p>
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
          <p>Contributors :</p>
          <div className='contributors-images'>
            {repo.contributors.length
              ? repo.contributors.map((contributor) => (
                  <a
                    key={contributor.id}
                    href={contributor.contributorsLink}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img
                      src={`${contributor.img}?s=50`}
                      alt='Contributor avatar'
                      className='contributors-avatar'
                    />
                  </a>
                ))
              : 'No Contributor'}
          </div>
        </div>
      </div>
    </article>
  );
}

RepoCard.propTypes = {
  repo: PropTypes.object,
};

export default class RepoCardGrid extends Component {
  static propTypes = {
    repos: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  };

  render() {
    const { repos } = this.props;
    return (
      <div className='repo-cards-container'>
        {/* Checking if the response has a data or not */}
        {Array.isArray(repos) ? (
          repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
        ) : (
          <p>{repos}</p>
        )}
      </div>
    );
  }
}
