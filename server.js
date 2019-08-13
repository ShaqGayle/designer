//const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const processCss = require('./processCss');

//const app = express();
const scrape = async (site) => {
  const response = await axios.get(site);

  const $ = cheerio.load(response.data);

  console.log('Style tags');
  $('style').each((i,e) => {
      console.log(`Element ${i}: ${$(e).html()}`);
  });

  console.log('Style attrs');
  $('[style]').each((i,e) => {
      console.log(`Element ${i}: ${$(e).attr('style')}`);
  });

  console.log('Link tags');
  $('link').each(async (i, e) => {
    let css = null;
    if ($(e).attr('rel') === 'stylesheet') {
      const link = $(e).attr('href');
      console.log(link)
      if (link.startsWith('http'))
        css = await axios.get(link);
      else
        css = await axios.get(site + link);

      if (css) {
        const $ = cheerio.load(css.data);
        console.log(processCss($('body').html()))
      }
    }
  });
}

//app.listen(3000, () => console.log('listening'));

scrape(process.argv[2]);
