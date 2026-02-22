---
name: bulletproof-testing
description: Guidelines for writing resilient Unit, Integration, and End-to-End tests based on Bulletproof React. Use when writing tests, configuring MSW handlers, or setting up Playwright E2E scripts.
---

# Testing Guidelines

When adding new features or modifying existing logic in this project, you MUST adhere to the following testing principles. The goal is to maximize confidence in the application's reliability by testing user behavior rather than implementation details.

## 1. Testing Philosophy
*   **Test Behavior, Not Implementation**: Use `@testing-library/react` exclusively. Do not write tests that assert internal component state (e.g., "does this state variable equal true?"). Instead, assert what is rendered in the DOM (e.g., "does the success banner appear?").
*   **Agnosticism**: If a component is refactored from using `useState` to a custom hook or Redux, the test should still pass flawlessly without modification.

## 2. Unit & Integration Testing Layer (`Vitest`)
*   **Test Co-location**: Tests must live adjacent to their feature component inside a `__tests__` directory.
    *   *Correct*: `src/features/auth/components/__tests__/Authorization.test.tsx`
    *   *Incorrect*: `tests/auth/Authorization.test.tsx`
*   **Integration over Isolated Units**: While isolated unit tests are acceptable for pure mathematical functions, preference should be given to integration tests that render entire component trees (like a form interacting with its submit button and provider).

## 3. Network Mocking (`MSW`)
*   **No Live APIs in Tests**: Your Vitest suite must NEVER hit a live backend or require a running development server.
*   **Mock Service Worker**: When testing a component that fetches data, you MUST intercept the HTTP request at the network layer using `msw` configured in `src/testing/mocks/handlers`.
*   **Avoid Mocking Fetch Directly**: Do not use `vi.spyOn(global, 'fetch')` to intercept responses unless `msw` physically cannot cover the use case. `msw` provides a far closer simulation of the actual browser network lifecycle.

## 4. End-to-End Testing Layer (`Playwright`)
*   **Automated Smoke Tests**: High-value critical paths (e.g., "User can log in and view their dashboard") should be covered by `Playwright` scripts.
*   **Execution**: E2E tests should be located in the `e2e/` root directory and executed via `npm run test:e2e`. They simulate actual headless browser instances against the live application.
