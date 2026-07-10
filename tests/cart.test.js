const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Cart Functionality - SauceDemo', function () {
  this.timeout(60000);
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

  it('should add an item to the cart and verify cart page', async function () {
    // Add item to cart
    const addBtn = await driver.findElement(By.css('[data-test="add-to-cart-sauce-labs-backpack"]'));
    await addBtn.click();

    // Wait for cart badge to update
    await driver.wait(until.elementLocated(By.className('shopping_cart_badge')), 10000);
    const cartBadge = await driver.findElement(By.className('shopping_cart_badge'));
    const badgeText = await cartBadge.getText();
    expect(badgeText).to.equal('1');

    // Navigate to cart
    const cartLink = await driver.findElement(By.className('shopping_cart_link'));
    await cartLink.click();

    // Wait for cart page to load
    await driver.wait(until.urlContains('cart'), 15000);

    // Verify cart page has the item
    const cartItems = await driver.findElements(By.className('cart_item'));
    expect(cartItems.length).to.equal(1);
  });
});