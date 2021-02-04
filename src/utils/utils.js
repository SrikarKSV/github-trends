export function formatDate(date) {
  const fullDate = new Date(date);
  return `${fullDate.getDate()}-${
    fullDate.getMonth() + 1
  }-${fullDate.getFullYear()}`;
}

export function getUniqueLanguages(repos) {
  // If the username does not exist then return the string back
  return Array.isArray(repos)
    ? Array.from(
        new Set(
          repos.map((repo) => {
            if (!repo.language) {
              return 'No language used';
            }
            return repo.language;
          })
        )
      )
    : repos;
}

export function filterRepoData(stars, language, repos) {
  let newRepos = [...repos];
  if (language) {
    newRepos =
      language === 'No language used'
        ? (newRepos = newRepos.filter((repo) => !repo.language))
        : newRepos.filter((repo) => repo.language === language);
  }
  if (stars) {
    newRepos =
      stars === 'asc'
        ? newRepos.sort((repo1, repo2) => repo1.stars - repo2.stars)
        : newRepos.sort((repo1, repo2) => repo2.stars - repo1.stars);
  }
  return newRepos;
}
