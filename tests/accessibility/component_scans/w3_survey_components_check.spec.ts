import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import type { AxeResults } from 'axe-core';
import SURVEY_APP_LINKS from '../../../utils/app_urls/survey_links';
import SURVEY_APP_HOMEPAGE_SELECTORS from '../../../utils/selectors/survey_homepage';

function formatViolations(violations: AxeResults['violations']): string {
  return violations
    .map(({ id, impact, help, nodes }) => `${id} [${impact}]: ${help} (${nodes.length} node(s))`)
    .join('\n');
}

test.beforeEach(async ({ page }) => {
  await page.goto(SURVEY_APP_LINKS.SURVEY_APP_BEFORE);
});

test.describe('survey component scans', () => {
  test('full page should have no accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();

    expect(
      accessibilityScanResults.violations,
      formatViolations(accessibilityScanResults.violations),
    ).toEqual([]);
  });

  test('survey form should have no accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include(SURVEY_APP_HOMEPAGE_SELECTORS.SURVEY_FORM)
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(
      accessibilityScanResults.violations,
      formatViolations(accessibilityScanResults.violations),
    ).toEqual([]);
  });

  test('survey results table should have no accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include(SURVEY_APP_HOMEPAGE_SELECTORS.SURVEY_TABLE)
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(
      accessibilityScanResults.violations,
      formatViolations(accessibilityScanResults.violations),
    ).toEqual([]);
  });
});