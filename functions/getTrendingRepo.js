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

    const data = repos.map((repo, index) => {
      const active = $(repo);
      const title = active.find('h1').text().replace(/\s/g, '');
      const author = title.split('/')[0];
      const repoName = title.split('/')[1];

      // To find the link of number stars and forks
      const starLink = `/${title.replace(/ /g, '')}/stargazers`;
      const forkLink = `/${title.replace(
        / /g,
        ''
      )}/network/members.${repoName}`;

      const repoLink = `https://github.com/${author}/${repoName}`;
      const description = active.find('p').text().trim() || null;
      const language =
        active.find('[itemprop=programmingLanguage]').text().trim() || null;
      const stars = parseInt(
        active.find(`[href="${starLink}"]`).text().trim().replace(',', '') ||
          '0',
        0
      );
      const forks = parseInt(
        active.find(`[href="${forkLink}"]`).text().trim().replace(',', '') ||
          '0',
        0
      );

      let authorImg = '';

      let contributors = active.find('[data-hovercard-type="user"]').toArray();
      contributors = contributors
        .map((contributor, index) => {
          if (index === 0) {
            authorImg = $(contributor).find('img').attr('src').split('?')[0];
            return null;
          }
          return {
            id: index,
            contributorsLink: `https://github.com${$(contributor).attr(
              'href'
            )}`,
            img: $(contributor).find('img').attr('src').split('?')[0],
          };
        })
        .filter((contributor) => contributor !== null);

      return {
        id: index + 1,
        title,
        repoLink,
        authorImg,
        author,
        description,
        language,
        stars,
        forks,
        contributors,
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
