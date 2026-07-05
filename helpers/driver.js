const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

function createDriver() {
  const options = new chrome.Options();
  
  // Headless mode for CI
  if (process.env.HEADLESS === 'true') {
    options.addArguments('--headless=new');
  }
  
  // CI-friendly options - extensive list for CI stability
  options.addArguments(
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-extensions',
    '--disable-gpu',
    '--window-size=1920,1080',
    '--disable-extensions',
    '--disable-plugins',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-renderer-backgrounding',
    '--disable-backgrounding-occluded-windows',
    '--disable-client-side-phishing-detection',
    '--disable-default-apps',
    '--disable-hang-monitor',
    '--disable-popup-blocking',
    '--disable-prompt-on-repost',
    '--disable-sync',
    '--metrics-recording-only',
    '--no-first-run',
    '--no-default-browser-check',
    '--enable-automation=false',
    '--disable-infobars',
    '--password-store=basic',
    '--use-mock-keychain',
    '--force-color-profile=srgb',
    '--disable-gpu',
    '--remote-debugging-port=9222'
  );
  
  // Use CHROME_BIN if set (for CI)
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