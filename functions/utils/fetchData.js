const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (event) => {
  const { url } = JSON.parse(event.body);
  const res = await axios.get(url, {
    headers: {
      Accept: 'text/html',
    },
  });
  const text = await res.data;
  const $ = cheerio.load(text);

  const repos = $('.Box article.Box-row').toArray();

  return {
    repos,
    $,
  };
};
