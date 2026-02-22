/**
 * API Router
 *
 * Switches between production and mock implementations
 * based on the VITE_API_URL environment variable.
 *
 * - Production: real fetch calls to the backend via api-client
 * - Mock: simulated responses for local development
 */

const isLocalDev = !import.meta.env.VITE_API_URL;

const adapter = isLocalDev
    ? await import("./api.mock")
    : await import("./api.prod");

export const { loginWithEmailAndPassword, uploadAdminImage } = adapter;
export type { LoginCredentials, AuthResponse } from "./api.prod";
