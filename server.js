//const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

//const app = express();

axios.get('https://www.google.com')
  .then(res => {
    const $ = cheerio.load(res.data);
    console.log($('style').text());
  })
  .catch(console.log);

//app.listen(3000, () => console.log('listening'));
