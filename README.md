# QA Automation Portfolio - SauceDemo (Selenium WebDriver + JavaScript)

Complete automation test suite using **Selenium WebDriver** with **JavaScript** (Mocha + Chai), implementing **Page Object Model**, targeting [SauceDemo](https://www.saucedemo.com) e-commerce demo site.

Built by [Kaio Garcia](https://github.com/qakaio) — QA Engineer

---

## 📊 Project Status

| Metric | Status |
|--------|--------|
| **Test Cases** | 15+ passing |
| **Architecture** | Page Object Model ✅ |
| **Assertions** | Chai BDD ✅ |
| **Browser** | Chrome ✅ |
| **CI/CD** | Ready for GitHub Actions |

---

## 🚀 Tech Stack

| Category | Technology |
|----------|------------|
| **Language** | JavaScript (ES6+) |
| **Test Runner** | Mocha |
| **Assertions** | Chai (BDD style) |
| **Automation** | Selenium WebDriver |
| **Pattern** | Page Object Model |

---

## 📁 Project Structure

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
│   └── selenium.yml             # CI/CD pipeline (ready)
├── .gitignore
├── package.json
├── mocharc.json                 # Mocha configuration
└── README.md
```

---

## ✅ Test Coverage

| Area | Scenarios | Status |
|------|-----------|--------|
| **Login** | Valid login, Invalid credentials, Locked out user | ✅ |
| **Inventory** | Product listing visibility, Sorting | ✅ |
| **Cart** | Add item, Remove item, Cart badge count | ✅ |
| **Checkout** | User info, Overview, Finish | ✅ |
| **Finish** | Confirmation message validation | ✅ |

---

## 🛠 How to Run Locally

### Prerequisites
- Node.js v18+
- Google Chrome installed and in PATH
- ChromeDriver (auto-managed by Selenium 4+)

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/qakaio/Kaio-QA-portfolio-selenium.git
cd Kaio-QA-portfolio-selenium

# 2. Install dependencies
npm install
```

### Running Tests
```bash
# Run all tests
npm test

# Run with verbose output
npm test -- --reporter spec

# Run specific test file
npx mocha tests/login.spec.js

# Run with headed browser (visible)
HEADLESS=false npm test
```

---

## 🏗 Architecture Highlights

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

## 🔧 CI/CD Ready

### GitHub Actions Workflow (`.github/workflows/selenium.yml`)
```yaml
name: Selenium Tests
on: [push, pull_request, schedule]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Install Chrome
        uses: browser-actions/setup-chrome@latest
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
```

---

## 🎯 Key Features Demonstrated

| Feature | Implementation |
|---------|----------------|
| **Page Object Model** | Clean separation of concerns |
| **Data-Driven Tests** | External test data files |
| **Error Handling** | Screenshots on failure |
| **Explicit Waits** | WebDriverWait with ExpectedConditions |
| **Cross-Browser Ready** | Configurable browser capabilities |
| **Parallel Execution** | Mocha parallel mode support |

---

## 📸 Screenshots

| Test | Screenshot |
|------|------------|
| Valid Login | ![Login](screenshots/login-passed.png) |
| Inventory | ![Inventory](screenshots/inventory.png) |
| Cart | ![Cart](screenshots/cart.png) |
| Checkout Complete | ![Finish](screenshots/finish.png) |

---

## 📋 Requirements

- Node.js v18+
- Google Chrome (latest stable)
- npm or yarn

---

## 📄 License

MIT License — Feel free to use as reference for your own portfolio.

---

## 👤 Author

**Kaio Garcia** — QA Engineer
🔗 [GitHub](https://github.com/qakaio) • [LinkedIn](https://linkedin.com/in/kaioqa) • [Portfolio](https://qakaio.github.io)

---

## 🙏 Acknowledgments

- [SauceDemo](https://www.saucedemo.com/) for the excellent demo e-commerce site
- [Selenium Team](https://www.selenium.dev/) for the industry-standard automation framework
- [Mocha](https://mochajs.org/) & [Chai](https://www.chaijs.com/) for elegant testing syntax
