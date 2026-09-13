import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import type { AxeResults } from 'axe-core';
import SURVEY_APP_LINKS from '../../../utils/app_urls/survey_links';
import SURVEY_APP_HOMEPAGE_SELECTORS from '../../../utils/selectors/survey_homepage';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa'];

function formatViolations(violations: AxeResults['violations']): string {
  return violations
    .map(({ id, impact, help, nodes }) => `${id} [${impact}]: ${help} (${nodes.length} node(s))`)
    .join('\n');
}

async function expectNoViolations(scan: AxeResults): Promise<void> {
  expect(scan.violations, formatViolations(scan.violations)).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.goto(SURVEY_APP_LINKS.SURVEY_APP_AFTER);
});

test.describe('survey control scans', () => {
  test('park preference radio group should have no accessibility violations', async ({ page }) => {
    const scan = await new AxeBuilder({ page })
      .include(SURVEY_APP_HOMEPAGE_SELECTORS.PARK_PREFERENCE_RADIO_GROUP)
      .withTags(WCAG_TAGS)
      .analyze();

    await expectNoViolations(scan);
  });

  test('city selector should have no accessibility violations', async ({ page }) => {
    const scan = await new AxeBuilder({ page })
      .include(SURVEY_APP_HOMEPAGE_SELECTORS.CITY_SELECTOR)
      .withTags(WCAG_TAGS)
      .analyze();

    await expectNoViolations(scan);
  });

  test('newsletter fields should have no accessibility violations', async ({ page }) => {
    const scan = await new AxeBuilder({ page })
      .include(SURVEY_APP_HOMEPAGE_SELECTORS.NEWSLETTER_FIELDS)
      .withTags(WCAG_TAGS)
      .analyze();

    await expectNoViolations(scan);
  });

  test('newsletter fields can exclude the known legacy city selector issue', async ({ page }) => {
    const scan = await new AxeBuilder({ page })
      .include('form')
      .exclude(SURVEY_APP_HOMEPAGE_SELECTORS.CITY_SELECTOR)
      .withTags(WCAG_TAGS)
      .analyze();

    await expectNoViolations(scan);
  });
});
