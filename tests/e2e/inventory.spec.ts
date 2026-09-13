import { test as base, expect } from '@playwright/test';
import SAUCEDEMO_CREDENTIALS from '../../utils/test_data/saucedemo_credentials';
import { getRequiredEnv } from '../../utils/helpers/get_required_env';
import { InventoryPage } from '../../utils/page_objects/inventory_page_objects';
import { LoginPage } from '../../utils/page_objects/login_page_objects';

const saucedemoUsername = getRequiredEnv('SAUCEDEMO_USERNAME');
const saucedemoPassword = getRequiredEnv('SAUCEDEMO_PASSWORD');
const backpackName = 'Sauce Labs Backpack';
const bikeLightName = 'Sauce Labs Bike Light';

const test = base.extend<{ inventoryPage: InventoryPage }>({
  inventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(saucedemoUsername, saucedemoPassword);
    await use(new InventoryPage(page));
  },
});

test.describe('SauceDemo Inventory Page', () => {
  test('should display the product catalogue', async ({ inventoryPage }) => {
    await expect(inventoryPage.productNames()).toHaveCount(6);
    await expect(inventoryPage.productNames().first()).toHaveText(backpackName);
  });

  test('should sort products by price from low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('Price (low to high)');

    await expect(inventoryPage.productNames().first()).toHaveText('Sauce Labs Onesie');
    await expect(inventoryPage.productNames().last()).toHaveText('Sauce Labs Fleece Jacket');
  });

  test('should add and remove a product from the cart', async ({ inventoryPage }) => {
    await inventoryPage.addProduct(backpackName);
    await expect(inventoryPage.cartBadge()).toHaveText('1');

    await inventoryPage.removeProduct(backpackName);
    await expect(inventoryPage.cartBadge()).toHaveCount(0);
  });

  test('should open product details', async ({ inventoryPage, page }) => {
    await inventoryPage.openProductDetails(bikeLightName);

    await expect(page).toHaveURL(/inventory-item\.html/);
    await expect(inventoryPage.productDetailsName()).toHaveText(bikeLightName);
  });
});
