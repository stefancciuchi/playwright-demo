import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

import { getRequiredEnv } from './utils/helpers/get_required_env';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const browserstackUsername = getRequiredEnv('BROWSERSTACK_USERNAME');
const browserstackAccessKey = getRequiredEnv('BROWSERSTACK_ACCESS_KEY');

type BrowserStackCapabilities = Record<string, string | boolean>;

function createBrowserStackProject(name: string, capabilities: BrowserStackCapabilities) {
  const projectCapabilities = {
    ...capabilities,
    name,
    build: process.env.BROWSERSTACK_BUILD_NAME || 'playwright-demo',
    'browserstack.username': browserstackUsername,
    'browserstack.accessKey': browserstackAccessKey,
    'browserstack.debug': true,
    'browserstack.console': 'verbose',
    'browserstack.networkLogs': true,
    'browserstack.video': true,
  };

  const wsEndpoint = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(projectCapabilities))}`;

  return {
    name,
    use: {
      connectOptions: {
        wsEndpoint,
      },
    },
  };
}

export default defineConfig({
  testDir: './tests/e2e',
  reporter: 'html',
  projects: [
    createBrowserStackProject('BS Chrome Windows', {
      browser: 'chrome',
      browser_version: 'latest',
      os: 'windows',
      os_version: '11',
    }),
    createBrowserStackProject('BS Firefox Windows', {
      browser: 'firefox',
      browser_version: 'latest',
      os: 'windows',
      os_version: '11',
    }),
    createBrowserStackProject('BS Safari macOS', {
      browser: 'safari',
      browser_version: 'latest',
      os: 'os x',
      os_version: 'ventura',
    }),
    createBrowserStackProject('BS Chrome Android', {
      browser: 'chrome',
      browser_version: 'latest',
      device_name: 'Google Pixel 7',
      real_mobile: true,
      os: 'android',
      os_version: '13.0',
    }),
    createBrowserStackProject('BS Safari iPhone', {
      browser: 'safari',
      browser_version: 'latest',
      device_name: 'iPhone 14',
      real_mobile: true,
      os: 'ios',
      os_version: '16',
    }),
  ],
});
