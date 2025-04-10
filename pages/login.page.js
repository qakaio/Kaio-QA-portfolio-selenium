class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.usernameInput = driver.findElement({ id: 'user-name' });
    this.passwordInput = driver.findElement({ id: 'password' });
    this.loginButton = driver.findElement({ id: 'login-button' });
  }

  async login(username, password) {
    await this.usernameInput.clear();
    await this.usernameInput.sendKeys(username);
    await this.passwordInput.clear();
    await this.passwordInput.sendKeys(password);
    await this.loginButton.click();
  }
}

module.exports = LoginPage;
