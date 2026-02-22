import "@testing-library/jest-dom";
import { server } from "./mocks/server";
import { beforeAll, afterEach, afterAll } from "vitest";

// Polyfill URL.createObjectURL for jsdom (used by mock adapters)
if (typeof URL.createObjectURL === "undefined") {
    URL.createObjectURL = () => "blob:http://localhost:5173/mock-blob-id";
}
if (typeof URL.revokeObjectURL === "undefined") {
    URL.revokeObjectURL = () => { };
}

// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
