import { test as base, expect } from '@playwright/test';
import { getRequiredEnv } from '../../utils/helpers/get_required_env';
import SAUCEDEMO_LINKS from '../../utils/app_urls/saucedemo_links';
import SAUCEDEMO_MESSAGES from '../../utils/expected_text/saucedemo_messages';
import SAUCEDEMO_CREDENTIALS from '../../utils/test_data/saucedemo_credentials';
import { LoginPage } from '../../utils/page_objects/login_page_objects';

const saucedemoUsername = getRequiredEnv('SAUCEDEMO_USERNAME');
const saucedemoPassword = getRequiredEnv('SAUCEDEMO_PASSWORD');

const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await use(loginPage);
  },
});

test.describe('SauceDemo Login Page', () => {
  test('should display the login form', async ({ loginPage }) => {
    await expect(loginPage.usernameInput()).toBeVisible();
    await expect(loginPage.passwordInput()).toBeVisible();
    await expect(loginPage.loginButton()).toBeVisible();
  });

  test('should allow user to log in with valid credentials and redirect to product catalogue', async ({ loginPage, page }) => {
    await loginPage.login(saucedemoUsername, saucedemoPassword);

    await expect(page).toHaveURL(SAUCEDEMO_LINKS.SAUCEDEMO_PRODUCT_CATALOGUE);
  });

  test('should show error message for invalid credentials and remain on login page', async ({ loginPage }) => {
    await loginPage.login(
      SAUCEDEMO_CREDENTIALS.INVALID_USERNAME,
      SAUCEDEMO_CREDENTIALS.INVALID_PASSWORD,
    );

    await expect(loginPage.errorMessage()).toBeVisible();
    await expect(loginPage.errorMessage()).toContainText(SAUCEDEMO_MESSAGES.INVALID_CREDENTIALS);
  });

  test('should show error message for locked out user and remain on login page', async ({ loginPage }) => {
    await loginPage.fillUsername(SAUCEDEMO_CREDENTIALS.LOCKED_OUT_USERNAME);
    await loginPage.fillPassword(saucedemoPassword);
    await loginPage.submit();

    await expect(loginPage.errorMessage()).toBeVisible();
    await expect(loginPage.errorMessage()).toContainText(SAUCEDEMO_MESSAGES.LOCKED_OUT_USER);
  });

  test('should show error message when username is missing and remain on login page', async ({ loginPage }) => {
    await loginPage.fillPassword(saucedemoPassword);
    await loginPage.submit();

    await expect(loginPage.errorMessage()).toBeVisible();
    await expect(loginPage.errorMessage()).toContainText(SAUCEDEMO_MESSAGES.USERNAME_REQUIRED);
  });
  
  test('should show error message when password is missing and remain on login page', async ({ loginPage }) => {
    await loginPage.fillUsername(saucedemoUsername);
    await loginPage.submit();

    await expect(loginPage.errorMessage()).toBeVisible();
    await expect(loginPage.errorMessage()).toContainText(SAUCEDEMO_MESSAGES.PASSWORD_REQUIRED);
  });

  test('should show error message when both username and password are missing and remain on login page', async ({ loginPage }) => {
    await loginPage.submit();

    await expect(loginPage.errorMessage()).toBeVisible();
    await expect(loginPage.errorMessage()).toContainText(SAUCEDEMO_MESSAGES.USERNAME_REQUIRED);
  });
});