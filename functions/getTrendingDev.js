const fetchData = require('./utils/fetchData');
const formattedResponse = require('./utils/formattedResponse');

exports.handler = async (event) => {
  try {
    const { repos, $ } = await fetchData(event);

    const data = repos.map((repo) => {
      const active = $(repo);

      const fullName = active.find('h1.h3').text().trim();
      const profileLink = active.find('h1.h3 a').attr('href');
      const userName = active.find(`p [href="${profileLink}"]`).text().trim();
      const popularRepo = active.find('h1.h4').text().trim();
      const popularRepoDescription = active
        .find('h1.h4')
        .next('div')
        .text()
        .trim();
      const popularRepoLink = `https://github.com/${userName}/${popularRepo}`;

      return {
        fullName,
        userName,
        profileLink,
        popularRepo,
        popularRepoLink,
        popularRepoDescription,
      };
    });

    if (!data.length) {
      return formattedResponse(404, 'No trending repos/devs found');
    }

    return formattedResponse(200, data);
  } catch (err) {
    console.error(err);
    return formattedResponse(500, {
      err,
    });
  }
};
