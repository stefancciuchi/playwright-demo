import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

import { getRequiredEnv } from './utils/helpers/get_required_env';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const username = getRequiredEnv('BROWSERSTACK_USERNAME');
const accessKey = getRequiredEnv('BROWSERSTACK_ACCESS_KEY');
const buildName = process.env.BROWSERSTACK_BUILD_NAME || 'playwright-demo-local';

type Capabilities = Record<string, string | boolean>;

function browserStackProject(name: string, capabilities: Capabilities) {
  const caps = {
    ...capabilities,
    name,
    build: buildName,
    'browserstack.username': username,
    'browserstack.accessKey': accessKey,
    'browserstack.debug': true,
    'browserstack.console': 'verbose',
    'browserstack.networkLogs': true,
  };

  return {
    name,
    use: {
      connectOptions: {
        wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
      },
      screenshot: 'only-on-failure' as const,
    },
  };
}

export default defineConfig({
  testDir: './tests/e2e',
  reporter: [['html', { open: 'never' }]],
  projects: [
    browserStackProject('BS Chrome Windows', {
      browser: 'chrome',
      browser_version: 'latest',
      os: 'windows',
      os_version: '11',
    }),
    browserStackProject('BS Firefox Windows', {
      browser: 'playwright-firefox',
      browser_version: 'latest',
      os: 'windows',
      os_version: '11',
    }),
    browserStackProject('BS Safari macOS', {
      browser: 'playwright-webkit',
      browser_version: 'latest',
      os: 'os x',
      os_version: 'ventura',
    }),
  ],
});
