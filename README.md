# QA Automation Portfolio - SauceDemo (Selenium WebDriver + JavaScript)

![Selenium Tests](https://github.com/qakaio/Kaio-QA-portfolio-selenium/actions/workflows/selenium.yml/badge.svg)
![Allure Report](https://img.shields.io/badge/Allure-Report-brightgreen?logo=allure)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

Complete automation test suite using **Selenium WebDriver** with **JavaScript** (Mocha + Chai), implementing **Page Object Model**, targeting [SauceDemo](https://www.saucedemo.com) e-commerce demo site.

Built by [Kaio Garcia](https://github.com/qakaio) — Senior QA Engineer

---

## Project Status

| Metric | Status |
|--------|--------|
| **Test Cases** | 15+ passing |
| **Architecture** | Page Object Model ✅ |
| **Assertions** | Chai BDD ✅ |
| **Browser** | Chrome ✅ |
| **CI/CD** | GitHub Actions |
| **Reports** | Mochawesome + **Allure Report** |

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Language** | JavaScript (ES6+) |
| **Test Runner** | Mocha |
| **Assertions** | Chai (BDD style) |
| **Automation** | Selenium WebDriver |
| **Pattern** | Page Object Model |

---

## Project Structure

```
Kaio-QA-portfolio-selenium/
├── helpers/
│   └── driver-setup.js          # WebDriver configuration & management
├── pages/
│   ├── login.page.js            # Login page objects & actions
│   ├── inventory.page.js        # Product listing page
│   ├── cart.page.js             # Shopping cart page
│   ├── checkout.page.js         # Checkout flow pages
│   └── finish.page.js           # Order confirmation page
├── tests/
│   ├── login.spec.js            # Valid & invalid login
│   ├── inventory.spec.js        # Product listing visibility
│   ├── cart.spec.js             # Add/remove items
│   ├── checkout.spec.js         # Checkout flow
│   └── finish.spec.js           # Order confirmation
├── .github/workflows/
│   └── selenium.yml             # CI/CD pipeline (Allure + Pages)
├── .gitignore
├── package.json
├── .mocharc.json                # Mocha configuration
└── README.md
```

---

## Test Coverage

| Area | Scenarios | Status |
|------|-----------|--------|
| **Login** | Valid login, Invalid credentials, Locked out user | ✅ |
| **Inventory** | Product listing visibility, Sorting | ✅ |
| **Cart** | Add item, Remove item, Cart badge count | ✅ |
| **Checkout** | User info, Overview, Finish | ✅ |
| **Finish** | Confirmation message validation | ✅ |

---

## Allure Report

**Live Allure Report**: [https://qakaio.github.io/Kaio-QA-portfolio-selenium/allure-report/](https://qakaio.github.io/Kaio-QA-portfolio-selenium/allure-report/)

### Features
- **Test Trends** — Pass/fail history over time
- **Categories** — Tests grouped by severity, type, feature
- **Retries** — Full retry history with timeline
- **Duration Analysis** — Slowest tests identification
- **Screenshots & Traces** — Embedded in report
- **Environment Info** — Browser, OS, Node version tracking

---

## How to Run Locally

### Prerequisites
- Node.js v18+
- Google Chrome installed and in PATH
- ChromeDriver (auto-managed by Selenium 4+)

### Installation
```bash
git clone https://github.com/qakaio/Kaio-QA-portfolio-selenium.git
cd Kaio-QA-portfolio-selenium
npm install
```

### Running Tests
```bash
# Run all tests (headless)
npm test

# Run with verbose output
npm test -- --reporter spec

# Run specific test file
npx mocha tests/login.spec.js

# Run with headed browser (visible)
HEADLESS=false npm test

# Generate Allure report locally
npm run test:allure
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## Architecture Highlights

### Page Object Model
Each page has a dedicated class encapsulating:
- **Locators** — Centralized, reusable selectors
- **Actions** — User interactions (click, fill, select)
- **Validations** — Assertions specific to page state

```javascript
// Example: login.page.js
class LoginPage {
  get usernameInput() { return $('#user-name'); }
  get passwordInput() { return $('#password'); }
  get loginButton() { return $('#login-button'); }
  get errorMessage() { return $('[data-test="error"]'); }

  async login(username, password) {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }
}
```

### WebDriver Management
- **Singleton pattern** for driver instance
- **Automatic ChromeDriver management** (Selenium 4+)
- **Configurable timeouts** and window sizing
- **Proper cleanup** in after hooks

---

## CI/CD Pipeline

### GitHub Actions Workflow (`.github/workflows/selenium.yml`)

```yaml
name: Selenium CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  schedule:
    - cron: '0 9,21 * * *'  # Daily at 09:00 and 21:00 UTC
  workflow_dispatch:

env:
  PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: 1

jobs:
  test:
    name: Selenium Tests
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: npm

      - name: Install Chrome and ChromeDriver
        run: |
          wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
          echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list
          sudo apt-get update
          sudo apt-get install -y google-chrome-stable
          CHROME_VERSION=$(google-chrome --version | awk '{print $3}' | cut -d. -f1)
          wget -q -O /tmp/chromedriver.zip "https://chromedriver.storage.googleapis.com/LATEST_RELEASE_${CHROME_VERSION}"
          CHROMEDRIVER_VERSION=$(cat /tmp/chromedriver.zip)
          wget -q -O /tmp/chromedriver_linux64.zip "https://chromedriver.storage.googleapis.com/${CHROMEDRIVER_VERSION}/chromedriver_linux64.zip"
          sudo unzip -o /tmp/chromedriver_linux64.zip -d /usr/local/bin/
          sudo chmod +x /usr/local/bin/chromedriver
          chromedriver --version

      - name: Install dependencies
        run: npm ci

      - name: Run Selenium Tests with Allure
        run: npm run test:allure
        env:
          CI: true
          DISPLAY: :99
          CHROME_BIN: /usr/bin/google-chrome

      - name: Start Xvfb
        run: |
          sudo Xvfb :99 -screen 0 1920x1080x24 &
          sleep 3

      - name: Upload Allure Results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: allure-results
          path: allure-results
          retention-days: 7

      - name: Upload Screenshots (on failure)
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: screenshots
          path: screenshots/
          retention-days: 7

  allure-report:
    name: Generate Allure Report
    needs: test
    if: always()
    runs-on: ubuntu-latest
    steps:
      - name: Download Allure Results
        uses: actions/download-artifact@v4
        with:
          name: allure-results
          path: allure-results
          if-no-files-found: ignore

      - name: Generate Allure Report
        if: ${{ hashFiles('allure-results/**') != '' }}
        run: |
          npx allure generate allure-results --clean -o allure-report

      - name: Upload Allure Report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: allure-report
          path: allure-report
          retention-days: 30

      - name: Deploy Allure Report to GitHub Pages
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./allure-report
          destination_dir: allure-report

  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: npm
      - run: npm ci
      - run: npm run lint
```

---

## Key Features Demonstrated

| Feature | Implementation |
|---------|----------------|
| **Page Object Model** | Clean separation of concerns |
| **Data-Driven Tests** | External test data files |
| **Error Handling** | Screenshots on failure |
| **Explicit Waits** | WebDriverWait with ExpectedConditions |
| **Cross-Browser Ready** | Configurable browser capabilities |
| **Parallel Execution** | Mocha parallel mode support |

---

## Requirements
- Node.js v18+
- Google Chrome (latest stable)
- npm or yarn

---

## License
MIT License — Feel free to use as reference for your own portfolio.

---

## Author
**Kaio Garcia** — Senior QA Engineer  
🔗 [GitHub](https://github.com/qakaio) • [LinkedIn](https://linkedin.com/in/kaioqa) • [Portfolio](https://qakaio.github.io)

---

## Acknowledgments
- [SauceDemo](https://www.saucedemo.com/) for the excellent demo e-commerce site
- [Selenium Team](https://www.selenium.dev/) for the industry-standard automation framework
- [Mocha](https://mochajs.org/) & [Chai](https://www.chaijs.com/) for elegant testing syntax