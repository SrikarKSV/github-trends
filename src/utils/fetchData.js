import axios from 'axios';

function formatRepoDetails(data) {
  const repoDetails = data.map((repo) => {
    return {
      id: repo.id,
      title: repo.name,
      description: repo.description,
      isForked: repo.fork,
      repoLink: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks,
      language: repo.language,
      createdAt: repo.created_at,
      homepage: repo.homepage,
      openIssues: repo.open_issues,
    };
  });

  return repoDetails;
}

function formatUserDetails(data) {
  return {
    profileLink: data.html_url,
    avatarLink: data.avatar_url,
    fullName: data.name,
    username: data.login,
    bio: data.bio,
    company: data.company,
    website: data.blog,
    location: data.location,
    twitterUsername: data.twitter_username,
    followers: data.followers,
    following: data.following,
    noOfRepos: data.public_repos,
  };
}

function fetchUserDetails(username, url, signal, mode) {
  console.log(signal.token);
  return axios
    .get(url, { cancelToken: signal.token })
    .then(({ data }) => {
      if (mode === 'user') {
        return formatUserDetails(data);
      } else {
        return formatRepoDetails(data);
      }
    })
    .catch((err) => {
      if (err?.response?.status === 404) {
        return `${username} doesn't exist`;
      } else if (err?.message === 'Api is being canceled') {
        throw new Error('API call to fetch user detail cancelled');
      }
      return err;
    });
}

export function getUserDetails(username, signal, page = 1) {
  const userProfileURL = `https://api.github.com/users/${username}`;
  const userRepoURL = `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated&page=${page}`;
  return Promise.all([
    fetchUserDetails(username, userProfileURL, signal, 'user'),
    fetchUserDetails(username, userRepoURL, signal, 'repo'),
  ]).then(([profile, repo]) => {
    return { profile, repo };
  });
}
