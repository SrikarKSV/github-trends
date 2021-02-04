import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate } from '../utils/utils';
import languages from '../data/githubLanguages';
import { faCodeBranch, faStar } from '@fortawesome/free-solid-svg-icons';

function UserRepoGrid({ userRepo, copyGitUrl }) {
  return (
    <article
      style={
        languages[userRepo.language]
          ? { background: languages[userRepo.language].color }
          : { background: '#151f28' }
      }
    >
      {userRepo.isForked && <span className='forked'>Forked</span>}
      <div className='repo-stars-forks'>
        <span className='no-stars'>
          <FontAwesomeIcon size='1x' icon={faStar} />
          {userRepo.stars}
        </span>
        <span className='no-forks'>
          <FontAwesomeIcon icon={faCodeBranch} size='1x' />
          {userRepo.forks}
        </span>
      </div>
      <a target='_blank' rel='noreferrer' href={userRepo.repoLink}>
        <h5>{userRepo.title}</h5>
      </a>
      <p>{userRepo.description}</p>
      <ul>
        <li>
          Langauge :
          {userRepo.language
            ? userRepo.language
            : userRepo.isForked
            ? 'GitHub API seems to not return langauge of forked repo'
            : 'No language used'}
        </li>
        <li>Created on : {formatDate(userRepo.createdAt)}</li>
        {userRepo.homepage && (
          <li>
            Homepage :{' '}
            <a target='_blank' rel='noreferrer' href={userRepo.homepage}>
              {userRepo.homepage}
            </a>
          </li>
        )}
        <li>Open issues : {userRepo.openIssues}</li>
      </ul>
      <button onClick={(e) => copyGitUrl(e, userRepo.cloneURL)}>
        Clone repo
      </button>
    </article>
  );
}

UserRepoGrid.propTypes = {
  userRepo: PropTypes.object.isRequired,
};

export default UserRepoGrid;
