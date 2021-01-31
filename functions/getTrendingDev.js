const axios = require('axios');
const cheerio = require('cheerio');
const formattedResponse = require('./utils/formattedResponse');

exports.handler = async (event) => {
  try {
    const { url } = JSON.parse(event.body);
    const res = await axios.get(url, {
      headers: {
        Accept: 'text/html',
      },
    });
    const text = await res.data;
    const $ = cheerio.load(text);

    const repos = $('.Box article.Box-row').toArray();

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
