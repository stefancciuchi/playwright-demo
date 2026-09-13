import { Locator, Page } from '@playwright/test';
import SAUCEDEMO_INVENTORY from '../selectors/saucedemo_inventory';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  productNames(): Locator {
    return this.page.locator(SAUCEDEMO_INVENTORY.PRODUCT_NAME);
  }

  productCard(productName: string): Locator {
    return this.page
      .locator(SAUCEDEMO_INVENTORY.PRODUCT_CARD)
      .filter({ hasText: productName });
  }

  async sortBy(option: string): Promise<void> {
    await this.page.locator(SAUCEDEMO_INVENTORY.PRODUCT_SORT).selectOption({ label: option });
  }

  async addProduct(productName: string): Promise<void> {
    await this.productCard(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeProduct(productName: string): Promise<void> {
    await this.productCard(productName).getByRole('button', { name: 'Remove' }).click();
  }

  async openProductDetails(productName: string): Promise<void> {
    await this.productCard(productName)
      .getByRole('button', { name: `View details for ${productName}` })
      .first()
      .click();
  }

  cartBadge(): Locator {
    return this.page.locator(SAUCEDEMO_INVENTORY.CART_BADGE);
  }

  cartLink(): Locator {
    return this.page.locator(SAUCEDEMO_INVENTORY.CART_LINK);
  }

  productDetailsName(): Locator {
    return this.page.locator(SAUCEDEMO_INVENTORY.PRODUCT_DETAILS_NAME);
  }
}
