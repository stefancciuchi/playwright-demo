import { test, expect } from '@playwright/test';
import SAUCEDEMO_LINKS from '../../utils/app_urls/saucedemo_links';
import SAUCEDEMO_LOGIN from '../../utils/selectors/saucedemo_login';
import SAUCEDEMO_MESSAGES from '../../utils/expected_text/saucedemo_messages';
import SAUCEDEMO_CREDENTIALS from '../../utils/test_data/saucedemo_credentials';

const saucedemoUsername = process.env.SAUCEDEMO_USERNAME;
const saucedemoPassword = process.env.SAUCEDEMO_PASSWORD;

test.describe('SauceDemo Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SAUCEDEMO_LINKS.SAUCEDEMO_LOGIN);
  });

  test('should display the login form', async ({ page }) => {
    await expect(page.locator(SAUCEDEMO_LOGIN.USERNAME_INPUT)).toBeVisible();
    await expect(page.locator(SAUCEDEMO_LOGIN.PASSWORD_INPUT)).toBeVisible();
    await expect(page.locator(SAUCEDEMO_LOGIN.LOGIN_BUTTON)).toBeVisible();
  });

  test('should allow user to log in with valid credentials and redirect to product catalogue', async ({ page }) => {
    if (!saucedemoUsername || !saucedemoPassword) {
      throw new Error('SAUCEDEMO_USERNAME and SAUCEDEMO_PASSWORD must be set');
    }

    await page.fill(SAUCEDEMO_LOGIN.USERNAME_INPUT, saucedemoUsername);
    await page.fill(SAUCEDEMO_LOGIN.PASSWORD_INPUT, saucedemoPassword);
    await page.click(SAUCEDEMO_LOGIN.LOGIN_BUTTON);

    await expect(page).toHaveURL(SAUCEDEMO_LINKS.SAUCEDEMO_PRODUCT_CATALOGUE);
  });

  test('should show error message for invalid credentials and remain on login page', async ({ page }) => {
    await page.fill(SAUCEDEMO_LOGIN.USERNAME_INPUT, SAUCEDEMO_CREDENTIALS.INVALID_USERNAME);
    await page.fill(SAUCEDEMO_LOGIN.PASSWORD_INPUT, SAUCEDEMO_CREDENTIALS.INVALID_PASSWORD);
    await page.click(SAUCEDEMO_LOGIN.LOGIN_BUTTON);

    await expect(page.locator(SAUCEDEMO_LOGIN.ERROR_MESSAGE_CONTAINER)).toBeVisible();
    await expect(page.locator(SAUCEDEMO_LOGIN.ERROR_MESSAGE_CONTAINER)).toContainText(SAUCEDEMO_MESSAGES.INVALID_CREDENTIALS);
  });

  test('should show error message for locked out user and remain on login page', async ({ page }) => {
    await page.fill(SAUCEDEMO_LOGIN.USERNAME_INPUT, SAUCEDEMO_CREDENTIALS.LOCKED_OUT_USERNAME);
    await page.fill(SAUCEDEMO_LOGIN.PASSWORD_INPUT, saucedemoPassword || '');
    await page.click(SAUCEDEMO_LOGIN.LOGIN_BUTTON);

    await expect(page.locator(SAUCEDEMO_LOGIN.ERROR_MESSAGE_CONTAINER)).toBeVisible();
    await expect(page.locator(SAUCEDEMO_LOGIN.ERROR_MESSAGE_CONTAINER)).toContainText(SAUCEDEMO_MESSAGES.LOCKED_OUT_USER);
  });

  test('should show error message when username is missing and remain on login page', async ({ page }) => {
    await page.fill(SAUCEDEMO_LOGIN.PASSWORD_INPUT, saucedemoPassword || '');
    await page.click(SAUCEDEMO_LOGIN.LOGIN_BUTTON);

    await expect(page.locator(SAUCEDEMO_LOGIN.ERROR_MESSAGE_CONTAINER)).toBeVisible();
    await expect(page.locator(SAUCEDEMO_LOGIN.ERROR_MESSAGE_CONTAINER)).toContainText(SAUCEDEMO_MESSAGES.USERNAME_REQUIRED);
  });
  
  test('should show error message when password is missing and remain on login page', async ({ page }) => {
    await page.fill(SAUCEDEMO_LOGIN.USERNAME_INPUT, saucedemoUsername || '');
    await page.click(SAUCEDEMO_LOGIN.LOGIN_BUTTON);

    await expect(page.locator(SAUCEDEMO_LOGIN.ERROR_MESSAGE_CONTAINER)).toBeVisible();
    await expect(page.locator(SAUCEDEMO_LOGIN.ERROR_MESSAGE_CONTAINER)).toContainText(SAUCEDEMO_MESSAGES.PASSWORD_REQUIRED);
  });

  test('should show error message when both username and password are missing and remain on login page', async ({ page }) => {
    await page.click(SAUCEDEMO_LOGIN.LOGIN_BUTTON);

    await expect(page.locator(SAUCEDEMO_LOGIN.ERROR_MESSAGE_CONTAINER)).toBeVisible();
    await expect(page.locator(SAUCEDEMO_LOGIN.ERROR_MESSAGE_CONTAINER)).toContainText(SAUCEDEMO_MESSAGES.USERNAME_REQUIRED);
  });
});