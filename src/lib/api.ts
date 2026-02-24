/**
 * API Router
 *
 * Switches between production and mock implementations
 * based on the VITE_USE_MOCKS environment variable.
 *
 * - Production: real fetch calls to the backend via Vite proxy / nginx
 * - Mock: simulated responses for local development
 */

const isLocalDev = import.meta.env.VITE_USE_MOCKS === "true";

const adapter = isLocalDev
    ? await import("./api.mock")
    : await import("./api.prod");

export const { loginWithEmailAndPassword, uploadAdminImage } = adapter;
export type { AuthRequest, LoginResponse, UploadImageResponse } from "./api.prod";
