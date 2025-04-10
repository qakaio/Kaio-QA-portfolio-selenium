const createDriver = require('../helpers/driver');
const LoginPage = require('../pages/login.page');
const { By } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Inventory Page', function () {
  let driver;

  beforeEach(async function () {
    driver = createDriver();
    await driver.get('https://www.saucedemo.com/');
    const loginPage = new LoginPage(driver);
    await loginPage.login('standard_user', 'secret_sauce');
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('should display a list of products', async function () {
    const products = await driver.findElements(By.className('inventory_item'));
    expect(products.length).to.be.greaterThan(0);
  });
});