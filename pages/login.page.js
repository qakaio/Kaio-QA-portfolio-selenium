const { By, until } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.usernameInput = By.id('user-name');
    this.passwordInput = By.id('password');
    this.loginButton = By.id('login-button');
    this.errorMessage = By.css('[data-test="error"]');
  }

  async waitForPage() {
    await this.driver.wait(until.elementLocated(this.usernameInput), 10000);
  }

  async login(username, password) {
    await this.waitForPage();
    const usernameField = await this.driver.findElement(this.usernameInput);
    const passwordField = await this.driver.findElement(this.passwordInput);
    const submitButton = await this.driver.findElement(this.loginButton);

    await usernameField.clear();
    await usernameField.sendKeys(username);
    await passwordField.clear();
    await passwordField.sendKeys(password);
    await submitButton.click();
  }

  async getErrorText() {
    await this.driver.wait(until.elementLocated(this.errorMessage), 10000);
    const error = await this.driver.findElement(this.errorMessage);
    return error.getText();
  }
}

module.exports = LoginPage;
