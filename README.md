# qavera-sandbox-app

Sandbox repository used to qualify Qavera's GitHub integration (repository discovery, reviewed
pull-request creation, and GitHub Actions trigger/result flows). It contains a small Playwright
TypeScript suite that runs against the public TodoMVC demo at https://demo.playwright.dev/todomvc.

This repository must never contain secrets, credentials, or customer content.

## Layout

- `tests/*.spec.ts` - Playwright tests discovered by Qavera
- `playwright.config.ts` - Playwright configuration (Chromium only)
- `.github/workflows/qavera-sandbox.yml` - workflow with a `workflow_dispatch` trigger used by the
  GitHub Actions integration

## Running locally

```sh
npm ci
npx playwright install --with-deps chromium
npx playwright test
```

## Branch rules

`main` requires a pull request; direct pushes, force pushes, and deletion are rejected. Qavera
must deliver generated automation only through a review branch and pull request.
