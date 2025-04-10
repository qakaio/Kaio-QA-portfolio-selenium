const { Builder } = require('selenium-webdriver');

function createDriver() {
  return new Builder().forBrowser('chrome').build();
}

module.exports = createDriver;
