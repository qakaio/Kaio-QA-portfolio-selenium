const createDriver = require('../helpers/driver');
const LoginPage = require('../pages/login.page');
const { By } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Cart Functionality', function () {
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

  it('should add and remove an item from the cart', async function () {
    const addButton = await driver.findElement(By.css('button[data-test="add-to-cart-sauce-labs-backpack"]'));
    await addButton.click();

    const cartIcon = await driver.findElement(By.className('shopping_cart_link'));
    await cartIcon.click();

    const cartItems = await driver.findElements(By.className('cart_item'));
    expect(cartItems.length).to.equal(1);

    const removeButton = await driver.findElement(By.css('button[data-test="remove-sauce-labs-backpack"]'));
    await removeButton.click();

    const remainingItems = await driver.findElements(By.className('cart_item'));
    expect(remainingItems.length).to.equal(0);
  });
});