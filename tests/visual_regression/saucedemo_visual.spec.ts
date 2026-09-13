import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';
import SAUCEDEMO_LINKS from '../../utils/app_urls/saucedemo_links';
import SAUCEDEMO_LOGIN from '../../utils/selectors/saucedemo_login';
import { getRequiredEnv } from '../../utils/helpers/get_required_env';

test.describe('SauceDemo visual snapshots', () => {
  test('login page', async ({ page }) => {
    await page.goto(SAUCEDEMO_LINKS.SAUCEDEMO_LOGIN);

    await percySnapshot(page, 'SauceDemo - Login');
  });

  test('product catalogue after login', async ({ page }) => {
    await page.goto(SAUCEDEMO_LINKS.SAUCEDEMO_LOGIN);
    await page.fill(SAUCEDEMO_LOGIN.USERNAME_INPUT, getRequiredEnv('SAUCEDEMO_USERNAME'));
    await page.fill(SAUCEDEMO_LOGIN.PASSWORD_INPUT, getRequiredEnv('SAUCEDEMO_PASSWORD'));
    await page.click(SAUCEDEMO_LOGIN.LOGIN_BUTTON);
    await page.waitForURL(SAUCEDEMO_LINKS.SAUCEDEMO_PRODUCT_CATALOGUE);

    await percySnapshot(page, 'SauceDemo - Product Catalogue');
  });
});
