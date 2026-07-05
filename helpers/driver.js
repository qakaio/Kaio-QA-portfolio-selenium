const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

function createDriver() {
  const options = new chrome.Options();
  
  // Headless mode for CI
  if (process.env.HEADLESS === 'true') {
    options.addArguments('--headless=new');
  }
  
  // Essential CI-friendly options
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
  
  // Use CHROME_BIN if set (from CI workflow)
  if (process.env.CHROME_BIN) {
    options.setChromeBinaryPath(process.env.CHROME_BIN);
    console.log(`Using Chrome binary from CHROME_BIN: ${process.env.CHROME_BIN}`);
  }
  
  // Disable automation flags
  options.excludeSwitches('enable-automation');
  options.excludeSwitches('enable-logging');
  options.excludeSwitches('load-extension');
  
  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
}

module.exports = createDriver;