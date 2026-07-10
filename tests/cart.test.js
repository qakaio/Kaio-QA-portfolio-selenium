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
    // Add item to cart
    const addBtn = await driver.findElement(By.css('[data-test="add-to-cart-sauce-labs-backpack"]'));
    await addBtn.click();

    // Verify cart badge shows 1 item
    const cartBadge = await driver.findElement(By.className('shopping_cart_badge'));
    const badgeText = await cartBadge.getText();
    expect(badgeText).to.equal('1');

    // Navigate to cart
    const cartLink = await driver.findElement(By.className('shopping_cart_link'));
    await cartLink.click();

    // Verify cart page has the item
    const cartItems = await driver.findElements(By.className('cart_item'));
    expect(cartItems.length).to.equal(1);

    // Remove item from cart
    const removeBtn = await driver.findElement(By.css('[data-test="remove-sauce-labs-backpack"]'));
    await removeBtn.click();

    // Verify cart is empty - check that cart_item elements are gone
    await driver.sleep(500); // Wait for DOM update
    const remainingItems = await driver.findElements(By.className('cart_item'));
    expect(remainingItems.length).to.equal(0);

    // Verify badge is gone or shows 0
    const badges = await driver.findElements(By.className('shopping_cart_badge'));
    // The badge element is removed from DOM when cart is empty
    expect(badges.length).to.equal(0);
  });
});