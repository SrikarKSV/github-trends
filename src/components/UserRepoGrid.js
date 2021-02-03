import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../utils/utils';

function UserRepoGrid({ userRepo }) {
  return (
    <article>
      {userRepo.isForked && <span className='forked'>Forked</span>}
      <span className='no-stars'>{userRepo.stars}</span>
      <span className='no-forks'>{userRepo.forks}</span>
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
    </article>
  );
}

UserRepoGrid.propTypes = {
  userRepo: PropTypes.object.isRequired,
};

export default UserRepoGrid;
