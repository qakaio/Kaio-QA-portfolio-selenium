const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Finish Page - SauceDemo', function () {
  this.timeout(30000);

  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.saucedemo.com/');

    // login
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('should complete a purchase and show the confirmation message', async function () {
    await driver.findElement(By.css('[data-test="add-to-cart-sauce-labs-backpack"]')).click();

    await driver.findElement(By.className('shopping_cart_link')).click();

    await driver.findElement(By.css('[data-test="checkout"]')).click();

    await driver.findElement(By.id('first-name')).sendKeys('Test');
    await driver.findElement(By.id('last-name')).sendKeys('User');
    await driver.findElement(By.id('postal-code')).sendKeys('12345');

    await driver.findElement(By.css('[data-test="continue"]')).click();

    await driver.findElement(By.css('[data-test="finish"]')).click();

    const confirmation = await driver.findElement(By.className('complete-header')).getText();
    expect(confirmation).to.equal('Thank you for your order!');
  });
});