/**
 * Axios API Client
 *
 * Pre-configured Axios instance for all API communication.
 *
 * Interceptors:
 *  - Request:  injects Bearer token, clears Content-Type for FormData
 *  - Response: maps errors to friendly messages, redirects on 401 session expiry
 *
 * Auth token management:
 *  - Call `setAuthToken(token)` when logging in
 *  - Call `clearAuthToken()` when logging out
 *  - The interceptor reads from the module-scoped variable (no localStorage dependency)
 *  - The token is ALSO persisted in localStorage by the AuthContext for refresh purposes
 */

import axios, { AxiosError } from "axios";

// ─── Axios Instance ─────────────────────────────────────────────────────────

export const api = axios.create({
    baseURL: "/",
    headers: { Accept: "application/json" },
});

// ─── Token Management ───────────────────────────────────────────────────────

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
    authToken = token;
};

export const clearAuthToken = () => {
    authToken = null;
};

export const getAuthToken = () => authToken;

// ─── Request Interceptor ────────────────────────────────────────────────────

api.interceptors.request.use((config) => {
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }

    // Let the browser set the multipart boundary for FormData
    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
    }

    return config;
});

// ─── Response Interceptor ───────────────────────────────────────────────────

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string; error?: string }>) => {
        const status = error.response?.status ?? 0;

        // 401 on a non-auth endpoint → session expired → redirect
        if (status === 401 && !error.config?.url?.startsWith("/auth/")) {
            clearAuthToken();
            if (typeof window !== "undefined") {
                const redirectTo = window.location.pathname;
                window.location.href = `/login?redirectTo=${encodeURIComponent(redirectTo)}`;
            }
            return Promise.reject(new Error("Session expired"));
        }

        // Surface a user-friendly message for every other error
        const raw = error.response?.data?.message
            ?? error.response?.data?.error
            ?? "";

        const friendly = friendlyMessage(raw, status);
        return Promise.reject(new Error(friendly));
    },
);

// ─── Error Mapping ──────────────────────────────────────────────────────────

function friendlyMessage(raw: string, status: number): string {
    const lower = raw.toLowerCase();
    if (lower.includes("regex") || lower.includes("email"))
        return "Please enter a valid email address.";
    if (status === 401) return "Invalid email or password.";
    if (status === 409) return "An account with this email already exists.";
    if (status === 400) return "Please check your input and try again.";
    return raw || `Request failed (${status}).`;
}
