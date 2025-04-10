const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Cart Functionality - SauceDemo', function () {
  this.timeout(30000);
  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.saucedemo.com/');

    // login
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('inventory');
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('should add and remove an item from the cart', async function () {
    const addBtn = await driver.findElement(By.css('[data-test="add-to-cart-sauce-labs-backpack"]'));
    await addBtn.click();

    const cartLink = await driver.findElement(By.className('shopping_cart_link'));
    await cartLink.click();

    const cartItems = await driver.findElements(By.className('cart_item'));
    expect(cartItems.length).to.equal(1);

    const removeBtn = await driver.findElement(By.css('[data-test="remove-sauce-labs-backpack"]'));
    await removeBtn.click();

    const remainingItems = await driver.findElements(By.className('cart_item'));
    expect(remainingItems.length).to.equal(0);
  });
});