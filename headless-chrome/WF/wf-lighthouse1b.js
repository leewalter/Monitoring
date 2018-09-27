// forked from https://github.com/BuildingXwithJS/puppeteer-examples
// see sample https://github.com/BuildingXwithJS/puppeteer-examples/blob/master/lighthouse.js
// details of lighthouse at https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md
// modified by Walter Lee

const fs = require('fs');
const {promisify} = require('util');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');

// const flags = {onlyCategories: ['performance']};

const opts = {
  //chromeFlags: ['--headless'],
  logLevel: 'info',
  output: 'json'
};

const config = {
  viewport: {
    width: 1920,
    height: 1080,
  },
};

const fsWriteFile = promisify(fs.writeFile);

(async () => {
  const browser = await puppeteer.launch({
    args: ['--remote-debugging-port=9222'],
  });
  const page = await browser.newPage();
  await page.setViewport(config.viewport);

  const results = await lighthouse('http://www.wellsfargo.com', opts, null);

  await fsWriteFile('lighthouse-results.json', JSON.stringify(results, null, 2), 'utf8');
  console.log(`Lighthous Audit finished, details is at file = lighthouse-results.json`);
//  console.log(`Lighthous audit finished, score is ${results.score}`);

  await browser.close();
})();
