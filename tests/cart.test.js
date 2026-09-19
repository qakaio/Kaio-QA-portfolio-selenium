const { By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const createDriver = require('../helpers/driver');
const LoginPage = require('../pages/login.page');

describe('Cart Functionality - SauceDemo', function () {
  this.timeout(30000);
  let driver;

  beforeEach(async function () {
    driver = createDriver();
    await driver.get('https://www.saucedemo.com/');

    const loginPage = new LoginPage(driver);
    await loginPage.login('standard_user', 'secret_sauce');
    await driver.waitForUrl('/inventory');
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('should add an item to the cart', async function () {
    const addBtn = await driver.findElement(By.css('[data-test="add-to-cart-sauce-labs-backpack"]'));
    await addBtn.click();

    await driver.wait(until.elementLocated(By.className('shopping_cart_badge')), 10000);
    const cartBadge = await driver.findElement(By.className('shopping_cart_badge'));
    const badgeText = await cartBadge.getText();
    expect(badgeText).to.equal('1');
  });
});