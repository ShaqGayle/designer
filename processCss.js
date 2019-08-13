const css = require('css');
const he = require('he');

const processCss = text => {
  const cleanText = he.decode(text);
  const obj = css.parse(cleanText, { silent: true });
  console.log(obj.stylesheet.rules[0])
  return obj;
};

module.exports = processCss
