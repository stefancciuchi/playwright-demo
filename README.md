# playwright-demo

### Intro

This is a short demo on Playwright | TypeScript and a couple of additional plugins & integrations, together with a full github ci/cd pipeline.

- The tests have been separated into:
    - Accessibility 
    - E2E (running on chromium like a quick regression suite)
    - E2E (running on multiple browsers and mobile resolutions)
    - Visual Regression testing with Percy
    - Browserstack integration as well for the E2E suite.

A couple of additional things were added to the utils folder as a way to separate the test structure into something that feels easy to read, use and understand.

- utils/
  - app_urls/
  - expected_text/
  - helpers/
  - page_objects/
  - selectors/
  - test_data/

## Demo Links:
- The CI/CD report on all the tests can be viewed [here](https://stefancciuchi.github.io/playwright-demo/)
- Access to the Percy Build Dashboard is [here](https://percy.io/14adfb64/web/automation-demo-59848a07)
- To access the Browserstack Build Dashboard [click here](https://automate.browserstack.com/projects/Default+Project/builds/playwright-demo/1?tab=sessions)

### Installation

You need the following installed:

- Node.js 22 or newer
- npm
- Git

Clone the repository and install the project dependencies:

```powershell
git clone https://gitlab.com/stefan.ciuchi/playwright-demo.git
cd playwright-demo
npm install
npx playwright install
```

Create a local environment file from the template, then open `.env` and set the SauceDemo credentials:

```env
SAUCEDEMO_USERNAME=standard_user
SAUCEDEMO_PASSWORD=secret_sauce
```

The `.env` file is ignored by Git and must not be committed. The Percy and BrowserStack variables are only required when running those integrations.

Run the basic E2E suite to verify the installation:

```powershell
npm run test:e2e:ui
```

For CI, credentials are provided through GitHub Actions secrets instead of a committed `.env` file.

### Axe-Core Integration

Added Axe-Core to the project. The tests are running a full page scan on W3C demo websites. 

In the full page scans folder you will find:
- test run against the app version that has multiple accessibility violations
- test run against the variant which has corrected the wcag violations.

In the component scans folder you will find:
- test run against some specific components on a different demo app with wcag violations
- test run against different specific components on demo app with wcag violations
- test run against some specific components the same demo app with wcag violations corrected and one component added to exclusion to exemplify a violation that is a known issue or something we deliberately want to ignore.

```
npx playwright test accessibility --ui
```

### E2E Tests

A couple of basic login tests that would cover a login page. As mentioned in the beginning, the valid credentials have been stored as Github secrets and environment variables, while the invalid or bad credentials have been stored into test data folder from utils folder.

```
npx playwright test tests/e2e --ui
```

### Cross Browser & Platform E2E Tests

```
npx playwright test tests/e2e --project=firefox --project=webkit '--project=Mobile Chrome' '--project=Mobile Safari' --headed
```

### Percy Integration

Added Percy and ran a build against the SauceDemo web app on its product catalogue after logging in.

```
percy exec -- npx playwright test tests/visual_regression --project=chromium
```

[Click here to access the Percy Build Dashboard](https://percy.io/14adfb64/web/automation-demo-59848a07)

### Browserstack Integration

After configuring the demo project in browserstack, you need to set the username nad accesskey in the env (if running locally) and repo settings when running in ci/cd pipeline.

```
npx playwright test --config=playwright.browserstack.config.ts
```
Visit the following URL if you want to see the browserstack integration in action.

[Click here to access the Browserstack Build Dashboard](https://automate.browserstack.com/projects/Default+Project/builds/playwright-demo/1?tab=sessions)
