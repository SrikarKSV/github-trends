import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import { filterRepoData, getUniqueLanguages } from '../utils/utils';

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

UserBio.propTypes = {
  userProfile: PropTypes.object.isRequired,
};

function UserDetail({
  userProfile,
  userRepoDetail,
  allLanguages,
  setSortStars,
  setSortLanguage,
  sortStars,
  sortLanguage,
  clearFilters,
  sortStarsRef,
  sortLanguageRef,
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
              <select
                ref={sortStarsRef}
                name='stars'
                id='stars'
                onChange={setSortStars}
              >
                <option value=''>Not Set</option>
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
              </select>
              <label htmlFor='language'>Language: </label>
              <select
                ref={sortLanguageRef}
                name='language'
                id='language'
                onChange={setSortLanguage}
              >
                <option value=''>Any</option>
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

UserDetail.propTypes = {
  userProfile: PropTypes.object.isRequired,
  userRepoDetail: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
    .isRequired,
  allLanguages: PropTypes.array.isRequired,
  setSortStars: PropTypes.func.isRequired,
  setSortLanguage: PropTypes.func.isRequired,
  sortStars: PropTypes.string.isRequired,
  sortLanguage: PropTypes.string.isRequired,
  clearFilters: PropTypes.func.isRequired,
};

class UserSearch extends Component {
  state = {
    loading: false,
    username: '',
    userProfile: {},
    userRepoDetailOriginal: [],
    userRepoMutated: [],
    sortStars: '',
    sortLanguage: '',
  };

  sortStarsRef = React.createRef();
  sortLanguageRef = React.createRef();

  signal = axios.CancelToken.source();

  updateUserDetails = (username) => {
    this.setState({
      loading: true,
    });

    getUserDetails(username, this.signal)
      .then(({ profile, repo: repos }) => {
        this.setState({
          username,
          userProfile: profile,
          userRepoDetailOriginal: repos,
          userRepoMutated: repos,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setSortLanguage = (e) => {
    this.setState(
      {
        sortLanguage: e.target.value,
      },
      () => this.filterRepos()
    );
  };

  setSortStars = (e) => {
    this.setState(
      {
        sortStars: e.target.value,
      },
      () => this.filterRepos()
    );
  };

  clearFilters = () => {
    this.sortStarsRef.current.selectedIndex = 0;
    this.sortLanguageRef.current.selectedIndex = 0;
    this.setState(
      {
        sortLanguage: '',
        sortStars: '',
      },
      () => this.filterRepos()
    );
  };

  componentDidMount() {
    const { username } = queryString.parse(window.location.search);
    if (username) {
      this.updateUserDetails(username);
    }
  }

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled');
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

  filterRepos = () => {
    const repos = filterRepoData(
      this.state.sortStars,
      this.state.sortLanguage,
      this.state.userRepoDetailOriginal
    );
    this.setState({
      userRepoMutated: repos,
    });
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
            userProfile={this.state.userProfile}
            userRepoDetail={this.state.userRepoMutated}
            allLanguages={getUniqueLanguages(this.state.userRepoDetailOriginal)}
            setSortStars={this.setSortStars}
            setSortLanguage={this.setSortLanguage}
            sortStars={this.state.sortStars}
            sortLanguage={this.state.sortLanguage}
            clearFilters={this.clearFilters}
            sortStarsRef={this.sortStarsRef}
            sortLanguageRef={this.sortLanguageRef}
          />
        )}
      </section>
    );
  }
}

export default withRouter(UserSearch);
