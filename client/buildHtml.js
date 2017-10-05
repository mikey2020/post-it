import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

fs.readFile('client/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }
  console.log(markup);
  const $ = cheerio.load(markup);
  $('head').prepend('<link rel="stylesheet" href="styles.css" />');

  fs.writeFile('client/build/index.html', $.html(), 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('index.html written to /build'.green);
  });
});
