const { expect } = require('chai');
const createDriver = require('../helpers/driver');
const LoginPage = require('../pages/login.page');

describe('Login Page', function () {
  let driver;

  beforeEach(async function () {
    driver = createDriver();
    await driver.get('https://www.saucedemo.com/');
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('should login successfully with valid credentials', async function () {
    const loginPage = new LoginPage(driver);
    await loginPage.login('standard_user', 'secret_sauce');
    const url = await driver.getCurrentUrl();
    expect(url).to.include('/inventory');
  });

  it('should show error for invalid credentials', async function () {
    const loginPage = new LoginPage(driver);
    await loginPage.login('invalid_user', 'wrong_password');
    const errorEl = await driver.findElement({ css: '[data-test="error"]' });
    const errorText = await errorEl.getText();
    expect(errorText).to.include('Username and password do not match');
  });
}