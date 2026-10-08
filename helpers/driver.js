const { Builder } = require('selenium-webdriver');

function createDriver() {
  const options = new Builder.chromeOptions();
  
  // CI-friendly options
  options.addArguments(
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--window-size=1920,1080',
    '--disable-extensions',
    '--remote-debugging-port=9222'
  );
  
  // Use CHROME_BIN if set (from CI workflow)
  if (process.env.CHROME_BIN) {
    options.setChromeBinaryPath(process.env.CHROME_BIN);
  }
  
  // Disable automation flags
  options.excludeSwitches('enable-automation');
  options.excludeSwitches('enable-logging');
  
  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
}

module.exports = createDriver;
