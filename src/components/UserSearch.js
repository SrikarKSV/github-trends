import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import queryString from 'query-string';
import { withRouter } from 'react-router';
import { getMoreRepo, getUserDetails } from '../utils/fetchData';
import {
  faBriefcase,
  faGlobe,
  faInfoCircle,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import UserRepoGrid from './UserRepoGrid';
import { filterRepoData, getUniqueLanguages } from '../utils/utils';
import Loading from './Loading';
import { ThemeConsumer } from '../contexts/theme';

function UserBio({ userProfile, theme }) {
  return (
    <div className={`user-bio ${theme}`}>
      {userProfile.bio && (
        <p>
          <span className='bold'>
            Bio <FontAwesomeIcon size='1x' icon={faInfoCircle} /> :
          </span>
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
          <a
            href={
              userProfile.website.slice(0, 8) === 'https://'
                ? userProfile.website
                : `https://${userProfile.website}`
            }
            target='_blank'
            rel='noreferrer'
          >
            {userProfile.website}
          </a>
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
          <a
            href={`https://twitter.com/${userProfile.twitterUsername}`}
            target='_blank'
            rel='noreferrer'
          >
            @{userProfile.twitterUsername}
          </a>
        </p>
      )}
      <div className='follow-stats'>
        <p>
          <span className='bold'>Followers :</span>
          {userProfile.followers}
        </p>
        <p>
          <span className='bold'>Following :</span>
          {userProfile.following}
        </p>
      </div>
    </div>
  );
}

UserBio.propTypes = {
  userProfile: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
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
  copyGitUrl,
  noLeftRepo,
  fetchMoreRepo,
  loadingMoreRepos,
}) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <>
          {Array.isArray(userRepoDetail) ? (
            <section className={`user-detail-container ${theme}`}>
              <img
                src={`${userProfile.avatarLink}&s=200`}
                alt={`Avatar of ${userProfile.username}`}
              />
              <a
                href={userProfile.profileLink}
                target='_blank'
                rel='noreferrer'
              >
                <h4 className={`${theme}`}>{userProfile.fullName}</h4>
              </a>
              <p className={`username ${theme}`}>{userProfile.username}</p>
              <UserBio userProfile={userProfile} theme={theme} />
              <div className={`user-repo-detail ${theme}`}>
                <h5 className='user-repo-detail__heading'>
                  Repositories ({userProfile.noOfRepos})
                </h5>
                <p className='user-repo-detail__sort-by'>Sort By: </p>
                <div className='user-repo-detail__filters'>
                  <div>
                    <label htmlFor='stars'>Stars :</label>
                    <select
                      ref={sortStarsRef}
                      name='stars'
                      id='stars'
                      onChange={setSortStars}
                      style={sortStars ? { background: '#55c57a' } : null}
                    >
                      <option value=''>Not Set</option>
                      <option value='asc'>Ascending</option>
                      <option value='desc'>Descending</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor='language'>Language: </label>
                    <select
                      ref={sortLanguageRef}
                      name='language'
                      id='language'
                      onChange={setSortLanguage}
                      style={sortLanguage ? { background: '#55c57a' } : null}
                    >
                      <option value=''>All</option>
                      {allLanguages.map((language) => (
                        <option key={language} value={language}>
                          {language}
                        </option>
                      ))}
                    </select>
                  </div>
                  {sortStars || sortLanguage ? (
                    <button className='clear-filter' onClick={clearFilters}>
                      Clear Filters
                    </button>
                  ) : null}
                </div>

                <div className='user-repo-detail-grid'>
                  {userRepoDetail.map((userRepo) => (
                    <UserRepoGrid
                      key={userRepo.id}
                      userRepo={userRepo}
                      copyGitUrl={copyGitUrl}
                    />
                  ))}
                </div>
                {noLeftRepo > 0 && (
                  <button className='load-more' onClick={fetchMoreRepo}>
                    {loadingMoreRepos ? 'Loading..' : 'Load More'}
                  </button>
                )}
              </div>
            </section>
          ) : (
            <h4>{userRepoDetail}</h4>
          )}
        </>
      )}
    </ThemeConsumer>
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
  sortStarsRef: PropTypes.object.isRequired,
  sortLanguageRef: PropTypes.object.isRequired,
  copyGitUrl: PropTypes.func.isRequired,
  noLeftRepo: PropTypes.number.isRequired,
  fetchMoreRepo: PropTypes.func.isRequired,
  loadingMoreRepos: PropTypes.bool.isRequired,
};

class UserSearch extends Component {
  state = {
    loading: false,
    loadingMoreRepos: false,
    username: '',
    userProfile: {},
    userRepoDetailOriginal: [],
    userRepoMutated: [],
    sortStars: '',
    sortLanguage: '',
    noLeftRepo: 0,
    page: 1,
    searchInput: '',
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
          noLeftRepo: profile.noOfRepos - 100,
          page: 2,
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

  copyGitUrl = async (event, url) => {
    await navigator.clipboard.writeText(url);
    event.target.innerText = 'Copied!';
    event.target.style.background = '#55c57a';
    setTimeout(() => {
      event.target.innerText = 'Clone repo';
      event.target.style.background = '#e60067';
    }, 2000);
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
    this.setState({
      searchInput: '',
    });
  };

  fetchMoreRepo = () => {
    this.setState({
      loadingMoreRepos: true,
    });
    getMoreRepo(this.state.userProfile.username, this.state.page, this.signal)
      .then((repos) => {
        console.log(repos);
        this.setState(
          ({ page, noLeftRepo, userRepoDetailOriginal }) => ({
            userRepoDetailOriginal: [...userRepoDetailOriginal, ...repos],
            page: page + 1,
            noLeftRepo: noLeftRepo - 100,
            loadingMoreRepos: false,
          }),
          () => this.filterRepos()
        );
      })
      .catch((err) => {
        console.log(err);
      });
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

  handleSearchInput = (e) => {
    this.setState({
      searchInput: e.target.value,
    });
  };

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <section className='user-search-container'>
            <h3 className={`${theme}`}>Explore GitHub user profile</h3>
            <form
              className={`user-search-form ${theme}`}
              action='#'
              method='get'
              onSubmit={this.handleSubmit}
            >
              <label htmlFor='username'>Username</label>
              <input
                value={this.state.searchInput}
                type='search'
                name='username'
                id='username'
                onChange={this.handleSearchInput}
              />
              <button type='submit'>Search</button>
            </form>

            {this.state.loading && <Loading text="Getting user's profile" />}

            {this.isDetailLoaded() && (
              <UserDetail
                userProfile={this.state.userProfile}
                userRepoDetail={this.state.userRepoMutated}
                allLanguages={getUniqueLanguages(
                  this.state.userRepoDetailOriginal
                )}
                setSortStars={this.setSortStars}
                setSortLanguage={this.setSortLanguage}
                sortStars={this.state.sortStars}
                sortLanguage={this.state.sortLanguage}
                clearFilters={this.clearFilters}
                sortStarsRef={this.sortStarsRef}
                sortLanguageRef={this.sortLanguageRef}
                copyGitUrl={this.copyGitUrl}
                noLeftRepo={this.state.noLeftRepo}
                fetchMoreRepo={this.fetchMoreRepo}
                loadingMoreRepos={this.state.loadingMoreRepos}
              />
            )}
          </section>
        )}
      </ThemeConsumer>
    );
  }
}

export default withRouter(UserSearch);
