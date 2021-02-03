import React, { Component } from 'react';
import queryString from 'query-string';
import { getUserDetails } from '../utils/fetchData';

export default class UserSearch extends Component {
  state = {
    userProfile: {},
    userRepoOriginal: [],
  };

  componentDidMount() {
    const { username } = queryString.parse(window.location.search);
    if (username) {
      getUserDetails(username).then(({ profile, repo }) => {
        this.setState({
          userProfile: profile,
          userRepoOriginal: repo,
          userRepoRendered: repo,
        });
      });
    }
  }

  render() {
    return (
      <section>
        <h3>Explore GitHub user profile</h3>
        <form action='#' method='get'>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' id='username' />
          <button type='submit'>Search</button>
        </form>
      </section>
    );
  }
}
