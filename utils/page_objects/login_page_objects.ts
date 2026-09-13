import { Page } from '@playwright/test';
import SAUCEDEMO_LINKS from '../app_urls/saucedemo_links';
import SAUCEDEMO_LOGIN from '../selectors/saucedemo_login';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto(SAUCEDEMO_LINKS.SAUCEDEMO_LOGIN);
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }

  async fillUsername(username: string): Promise<void> {
    await this.page.fill(SAUCEDEMO_LOGIN.USERNAME_INPUT, username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.page.fill(SAUCEDEMO_LOGIN.PASSWORD_INPUT, password);
  }

  async submit(): Promise<void> {
    await this.page.click(SAUCEDEMO_LOGIN.LOGIN_BUTTON);
  }
  
  usernameInput() {
    return this.page.locator(SAUCEDEMO_LOGIN.USERNAME_INPUT);
  }

  passwordInput() {
    return this.page.locator(SAUCEDEMO_LOGIN.PASSWORD_INPUT);
  }

  loginButton() {
    return this.page.locator(SAUCEDEMO_LOGIN.LOGIN_BUTTON);
  }

  errorMessage() {
    return this.page.locator(SAUCEDEMO_LOGIN.ERROR_MESSAGE_CONTAINER);
  }
}