import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import SURVEY_APP_LINKS from '../../../utils/app_urls/survey_links';

test.describe('full page scan', () => {
  test('should detect all accessibility issues', async ({ page }) => {
    await page.goto(SURVEY_APP_LINKS.SURVEY_APP_BEFORE);

    const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});