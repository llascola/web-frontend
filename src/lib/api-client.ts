/**
 * Shared API Client
 *
 * A pre-configured fetch wrapper following Bulletproof React guidelines.
 * All API requests should go through this client instead of raw fetch().
 */

type RequestOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: BodyInit | null;
    params?: Record<string, string | number>;
};

/**
 * Pre-configured API client that handles:
 * - Base URL prepending
 * - JSON content type
 * - Authorization header injection
 * - Uniform error handling
 * - 401 redirect to login
 */
export const api = {
    /**
     * Core request method. All other methods delegate to this.
     */
    async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const { method = "GET", headers = {}, body, params } = options;

        const url = new URL(`${import.meta.env.VITE_API_URL}${endpoint}`);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, String(value));
            });
        }

        const token = localStorage.getItem("token");

        const defaultHeaders: Record<string, string> = {
            Accept: "application/json",
        };

        // Only set Content-Type for non-FormData bodies
        if (body && !(body instanceof FormData)) {
            defaultHeaders["Content-Type"] = "application/json";
        }

        if (token) {
            defaultHeaders["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(url.toString(), {
            method,
            headers: { ...defaultHeaders, ...headers },
            body,
        });

        if (response.status === 401) {
            localStorage.removeItem("token");
            const redirectTo = window.location.pathname;
            window.location.href = `/login?redirectTo=${encodeURIComponent(redirectTo)}`;
            throw new Error("Unauthorized");
        }

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.message || data.error || `Request failed with status ${response.status}`);
        }

        return response.json();
    },

    async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
        return this.request<T>(endpoint, { method: "GET", params });
    },

    async post<T>(endpoint: string, body?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: "POST",
            body: body instanceof FormData ? body : JSON.stringify(body),
        });
    },

    async put<T>(endpoint: string, body?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: "PUT",
            body: JSON.stringify(body),
        });
    },

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: "DELETE" });
    },
};
