const { Builder, By, until } = require('selenium-webdriver');
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

    // Wait for cart badge to update
    await driver.wait(until.elementLocated(By.className('shopping_cart_badge')), 5000);
    const cartBadge = await driver.findElement(By.className('shopping_cart_badge'));
    const badgeText = await cartBadge.getText();
    expect(badgeText).to.equal('1');

    // Navigate to cart
    const cartLink = await driver.findElement(By.className('shopping_cart_link'));
    await cartLink.click();

    // Wait for cart page to load - check for cart_list element
    await driver.wait(until.elementLocated(By.className('cart_list')), 10000);

    // Verify cart page has the item
    const cartItems = await driver.findElements(By.className('cart_item'));
    expect(cartItems.length).to.equal(1);

    // Remove item from cart
    const removeBtn = await driver.findElement(By.css('[data-test="remove-sauce-labs-backpack"]'));
    await removeBtn.click();

    // Wait for item to be removed
    await driver.sleep(1000);

    // Verify cart is empty
    const remainingItems = await driver.findElements(By.className('cart_item'));
    expect(remainingItems.length).to.equal(0);

    // Navigate back to inventory to check badge
    const continueBtn = await driver.findElement(By.css('[data-test="continue-shopping"]'));
    await continueBtn.click();

    await driver.wait(until.urlContains('inventory'), 5000);

    // Check badge - it might show 0 or be removed entirely
    const badges = await driver.findElements(By.className('shopping_cart_badge'));
    if (badges.length > 0) {
      // Badge exists - check if it shows 0
      const badgeText = await badges[0].getText();
      expect(badgeText).to.equal('0');
    } else {
      // Badge removed from DOM entirely - also valid
      expect(badges.length).to.equal(0);
    }
  });
});