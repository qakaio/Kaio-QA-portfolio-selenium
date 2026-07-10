const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Inventory Page - SauceDemo', function () {
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

  it('should display product listing and allow sorting', async function () {
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('inventory');

    const products = await driver.findElements(By.className('inventory_item'));
    expect(products.length).to.be.greaterThan(0);

    const sortDropdown = await driver.findElement(By.className('product_sort_container'));
    await sortDropdown.click();

    const lohiOption = await driver.findElement(By.css('option[value="lohi"]'));
    await lohiOption.click();

    const firstPrice = await driver.findElement(By.className('inventory_item_price')).getText();
    expect(firstPrice).to.match(/\$\d+\.\d{2}/);
  });
});