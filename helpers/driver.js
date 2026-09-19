const { Builder, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

function createDriver() {
  const options = new chrome.Options();

  if (process.env.HEADLESS !== 'false') {
    options.addArguments('--headless=new');
  }

  options.addArguments(
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--window-size=1920,1080',
    '--disable-extensions',
    '--disable-software-rasterizer',
    '--disable-features=VizDisplayCompositor',
    '--remote-debugging-port=9222'
  );

  if (process.env.CHROME_BIN) {
    options.setChromeBinaryPath(process.env.CHROME_BIN);
  }

  options.excludeSwitches('enable-automation');
  options.excludeSwitches('enable-logging');
  options.excludeSwitches('load-extension');

  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  driver.waitForUrl = (expectedFragment, timeout = 10000) =>
    driver.wait(until.urlContains(expectedFragment), timeout);

  return driver;
}

module.exports = createDriver;