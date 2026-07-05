const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

function createDriver() {
  const options = new chrome.Options();
  
  // Headless mode for CI
  if (process.env.HEADLESS === 'true') {
    options.addArguments('--headless=new');
  }
  
  // Essential CI-friendly options only
  options.addArguments(
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--window-size=1920,1080',
    '--disable-extensions',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-software-rasterizer',
    '--disable-features=VizDisplayCompositor',
    '--disable-features=TranslateUI',
    '--disable-features=BlinkGenPropertyTrees',
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
    '--disable-infobars',
    '--password-store=basic',
    '--use-mock-keychain',
    '--force-color-profile=srgb',
    '--disable-gpu',
    '--disable-software-rasterizer',
    '--disable-features=VizDisplayCompositor,TranslateUI,BlinkGenPropertyTrees',
    '--remote-debugging-port=9222'
  );
  
  // Use CHROME_BIN if set (for CI)
  if (process.env.CHROME_BIN) {
    options.setChromeBinaryPath(process.env.CHROME_BIN);
  }
  
  // Disable automation flags
  options.excludeSwitches('enable-automation');
  options.excludeSwitches('enable-logging');
  options.excludeSwitches('load-extension');
  
  // Use system Chrome - auto-detect
  if (!process.env.CHROME_BIN) {
    const chromePaths = [
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      '/snap/bin/chromium'
    ];
    
    for (const path of chromePaths) {
      if (fs.existsSync(path)) {
        options.setChromeBinaryPath(path);
        process.env.CHROME_BIN = path;
        break;
      }
    }
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