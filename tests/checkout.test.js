const createDriver = require('../helpers/driver');
const LoginPage = require('../pages/login.page');
const { By } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Checkout Process', function () {
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

  it('should complete the checkout flow', async function () {
    await driver.findElement(By.css('button[data-test="add-to-cart-sauce-labs-backpack"]')).click();
    await driver.findElement(By.className('shopping_cart_link')).click();
    await driver.findElement(By.css('button[data-test="checkout"]')).click();

    await driver.findElement(By.css('input[data-test="firstName"]')).sendKeys('John');
    await driver.findElement(By.css('input[data-test="lastName"]')).sendKeys('Doe');
    await driver.findElement(By.css('input[data-test="postalCode"]')).sendKeys('12345');
    await driver.findElement(By.css('input[data-test="continue"]')).click();

    const summary = await driver.findElement(By.className('summary_info'));
    expect(summary).to.exist;
  });
});