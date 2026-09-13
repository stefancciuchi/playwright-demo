import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

import { getRequiredEnv } from './utils/helpers/get_required_env';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const browserstackUsername = getRequiredEnv('BROWSERSTACK_USERNAME');
const browserstackAccessKey = getRequiredEnv('BROWSERSTACK_ACCESS_KEY');

const capabilities = {
  browser: 'chrome',
  browser_version: 'latest',
  os: 'windows',
  os_version: '11',
  name: 'Playwright E2E',
  build: process.env.BROWSERSTACK_BUILD_NAME || 'playwright-demo',
  'browserstack.username': browserstackUsername,
  'browserstack.accessKey': browserstackAccessKey,
  'browserstack.debug': true,
  'browserstack.console': 'verbose',
  'browserstack.networkLogs': true,
  'browserstack.video': true,
};

const wsEndpoint = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(capabilities))}`;

export default defineConfig({
  testDir: './tests/e2e',
  reporter: 'html',
  use: {
    connectOptions: {
      wsEndpoint,
    },
  },
});
