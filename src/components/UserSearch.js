import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import queryString from 'query-string';
import { withRouter } from 'react-router';
import { getUserDetails } from '../utils/fetchData';
import {
  faBriefcase,
  faGlobe,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import UserRepoGrid from './UserRepoGrid';

function UserBio({ userProfile }) {
  return (
    <>
      {userProfile.bio && (
        <p>
          <span className='bold'>Bio :</span>
          {userProfile.bio}
        </p>
      )}
      {userProfile.company && (
        <p>
          <span className='bold'>
            Company <FontAwesomeIcon size='1x' icon={faBriefcase} /> :
          </span>
          {userProfile.company}
        </p>
      )}
      {userProfile.website && (
        <p>
          <span className='bold'>
            Website
            <FontAwesomeIcon size='1x' icon={faGlobe} />:
          </span>
          {userProfile.website}
        </p>
      )}
      {userProfile.location && (
        <p>
          <span className='bold'>
            Location
            <FontAwesomeIcon size='1x' icon={faMapMarkerAlt} />:
          </span>
          {userProfile.location}
        </p>
      )}
      {userProfile.twitterUsername && (
        <p>
          <span className='bold'>
            Twitter <FontAwesomeIcon size='1x' icon={faTwitter} /> :
          </span>
          {userProfile.twitterUsername}
        </p>
      )}
    </>
  );
}

function UserDetail({
  userProfile,
  userRepoDetail,
  allLanguages,
  setSortStars,
  setSortLanguage,
  sortStars,
  sortLanguage,
  clearFilters,
}) {
  return (
    <>
      {Array.isArray(userRepoDetail) ? (
        <section className='user-detail-container'>
          <a href={userProfile.profileLink} target='_blank' rel='noreferrer'>
            <img
              src={userProfile.avatarLink}
              alt={`Avatar of ${userProfile.username}`}
            />
          </a>
          <h4>{userProfile.fullName}</h4>
          <p>{userProfile.username}</p>
          <UserBio userProfile={userProfile} />
          <p>
            <span className='bold'>Followers :</span>
            {userProfile.followers}
            <span className='bold'>Following :</span>
            {userProfile.following}
          </p>

          <div className='user-repo-detail'>
            <h5>Repositories</h5>
            <p>Sort By: </p>
            <div>
              <label htmlFor='stars'>Stars :</label>
              <select name='stars' id='stars' onChange={setSortStars}>
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
              </select>
              <label htmlFor='language'>Language: </label>
              <select name='language' id='language' onChange={setSortLanguage}>
                {allLanguages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
              {sortStars || sortLanguage ? (
                <button onClick={clearFilters}>Clear Filters</button>
              ) : null}
            </div>

            <div className='user-repo-detail-grid'>
              {userRepoDetail.map((userRepo) => (
                <UserRepoGrid key={userRepo.id} userRepo={userRepo} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <h4>{userRepoDetail}</h4>
      )}
    </>
  );
}

class UserSearch extends Component {
  state = {
    loading: false,
    username: '',
    userProfile: {},
    userRepoDetailOriginal: [],
    userRepoMutated: [],
    allLanguages: [],
    sortStars: '',
    sortLanguage: '',
  };

  updateUserDetails = (username) => {
    this.setState({
      loading: true,
    });

    getUserDetails(username).then(({ profile, repo: repos }) => {
      const uniqueLanguages = Array.from(
        new Set(repos.map((repo) => repo.language))
      );
      this.setState({
        username,
        userProfile: profile,
        userRepoDetailOriginal: repos,
        userRepoMutated: repos,
        loading: false,
        allLanguages: uniqueLanguages,
      });
    });
  };

  setSortLanguage = (e) => {
    this.setState({
      sortLanguage: e.target.value,
    });
  };

  setSortStars = (e) => {
    this.setState({
      sortStars: e.target.value,
    });
  };

  clearFilters = () => {
    this.setState({
      sortLanguage: '',
      sortStars: '',
    });
  };

  componentDidMount() {
    const { username } = queryString.parse(window.location.search);
    if (username) {
      this.updateUserDetails(username);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push({
      pathname: '/user-search',
      search: `?username=${e.target.username.value}`,
    });
    this.updateUserDetails(e.target.username.value);
    e.target.reset();
  };

  isDetailLoaded = () => {
    return this.state.username && !this.state.loading;
  };

  render() {
    return (
      <section>
        <h3>Explore GitHub user profile</h3>
        <form action='#' method='get' onSubmit={this.handleSubmit}>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' id='username' />
          <button type='submit'>Search</button>
        </form>

        {this.state.loading && 'Loading'}

        {this.isDetailLoaded() && (
          <UserDetail
            username={this.state.username}
            userProfile={this.state.userProfile}
            userRepoDetail={this.state.userRepoMutated}
            allLanguages={this.state.allLanguages}
            setSortStars={this.setSortStars}
            setSortLanguage={this.setSortLanguage}
            sortStars={this.state.sortStars}
            sortLanguage={this.state.sortLanguage}
            clearFilters={this.clearFilters}
          />
        )}
      </section>
    );
  }
}

export default withRouter(UserSearch);
