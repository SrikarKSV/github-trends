import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../utils/utils';

function UserRepoGrid({ userRepo }) {
  return (
    <article>
      {userRepo.isForked && <span className='forked'>Forked</span>}
      <span className='no-stars'>{userRepo.stars}</span>
      <span className='no-forks'>{userRepo.forks}</span>
      <a href={userRepo.repoLink}>
        <h5>{userRepo.title}</h5>
      </a>
      <p>{userRepo.description}</p>
      <ul>
        <li>Langauge : {userRepo.language}</li>
        <li>Created on : {formatDate(userRepo.createdAt)}</li>
        {userRepo.homepage && <li>Homepage : {userRepo.homepage}</li>}
        <li>Open issues : {userRepo.openIssues}</li>
      </ul>
    </article>
  );
}

UserRepoGrid.propTypes = {
  userRepo: PropTypes.object.isRequired,
};

export default UserRepoGrid;
