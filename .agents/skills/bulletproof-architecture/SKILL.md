---
name: bulletproof-architecture
description: Rules for consistently scaling the project using the Bulletproof React Feature-Based directory structure. Use when scaffolding new features, creating components, or reviewing codebase structure.
---

# Bulletproof React Architecture Guidelines

This project strictly adheres to the **Bulletproof React** architecture pattern. When answering prompts, creating components, or scaffolding new features, you MUST follow these directory structure and dependency rules.

## 1. Unidirectional Codebase Flow
Dependencies must only flow inward: **Shared → Features → App/Pages**.
*   **Features** can import from **Shared** (`src/components/ui/`, `src/lib/`, `src/context/`).
*   **App/Pages** (`src/pages/`) can import from **Features** and **Shared**.
*   **Shared** modules CANNOT import from **Features**.
*   **Features** CANNOT import from other **Features**.

## 2. Directory Breakdown

### `src/components/ui/` (Shared Primitives)
Only **generic, domain-agnostic UI primitives** belong here (e.g., `<Button>`, `<Input>`, `<Card>`, `<TypographyH2>`).
*   No business logic.
*   No external spacing (margins) hardcoded on the root elements.
*   Must use `class-variance-authority` (cva) and `cn()` for styling variants.

### `src/features/` (Domain-Driven Modules)
Most of the application logic lives here. When scaffolding a new conceptual area of the app (like `blog`, `portfolio`, or `auth`), create a new folder under `features/`.

A feature folder encapsulates its own domain:
```sh
src/features/awesome-feature/
├── api/         # API hooks (e.g., useFetchComments)
├── components/  # React components specific to this feature (e.g., CommentList.tsx)
├── config/      # Static data or configuration for this feature
├── context/     # Feature-specific state providers
├── utils/       # Helper functions specific to this feature
└── index.ts     # The public API for the feature (Barrel export)
```
*Note: Only create the subdirectories you actually need.*

### `src/features/[name]/index.ts` (Barrel Exports)
Every feature MUST have an `index.ts` file at its root. This file defines the **Public API** of the feature. 
*   Other parts of the application (`src/pages/`) are ONLY allowed to import from the feature's `index.ts`.
*   Do NOT allow deep imports like `import { BlogCard } from "@/features/blog/components/BlogCard"`. If `BlogCard` is needed externally, it must be exported from `src/features/blog/index.ts`.

### `src/pages/` (App Layer)
These components represent full screens/routes (e.g., `Dashboard.tsx`, `Login.tsx`).
*   They contain minimal layout logic.
*   They compose components imported from `src/features/`.

## 3. Styling Rules
*   Use **Tailwind CSS v4** utility classes.
*   Always use semantic CSS variables for colors (e.g., `bg-background`, `text-foreground`, `bg-card`) mapped in `src/index.css` to ensure full Dark Mode compatibility.
*   Do not hardcode hex codes or standard colors (`bg-white`, `text-slate-900`) inside components.

## 4. Axios API Layer
The API layer uses a **single [Axios](https://axios-http.com/) instance** with interceptors for authentication, error mapping, and 401 session handling. Types come from the auto-generated `openapi-types.ts`.

### Structure
```sh
src/lib/api/
├── client.ts      # Axios instance + interceptors + token management
├── types.ts       # Re-exported schema types from openapi-types.ts
└── index.ts       # Barrel export (public API for the module)
```

### Token Management
The Axios interceptor reads auth tokens from a **module-scoped variable**, not directly from `localStorage`. This avoids scope-isolation issues in tests.

```ts
import { setAuthToken, clearAuthToken } from "@/lib/api";
setAuthToken(token);   // Call on login
clearAuthToken();      // Call on logout
```

The `AuthContext` calls these automatically. Tests mock them directly.

### Interceptors
*   **Request**: injects `Authorization: Bearer <token>`, removes `Content-Type` for `FormData`.
*   **Response**: 401 on non-auth endpoints → clears token & redirects to `/login`. All errors are mapped to user-friendly messages via `friendlyMessage()`.

### Rules
*   **Single instance**: `client.ts` exports one `api` Axios instance. All API calls go through it.
*   **Typed generics**: Feature hooks use `api.get<ResponseType>(url)`, `api.post<ResponseType>(url, body)`, etc.
*   **Schema types**: `types.ts` re-exports `components["schemas"]` types. Import from `@/lib/api`.
*   **Mocking via MSW**: Tests use MSW `setupServer` to intercept Axios requests at the network level.
*   **Adding a new endpoint**: Add the operation to the OpenAPI spec, regenerate types, then call `api.get/post/put/delete<T>` in a feature hook.

### Example — Query Hook
```ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { BlogPostList } from "@/lib/api";

export const usePublishedPosts = (params?: { tag?: string }) => {
    return useQuery({
        queryKey: ["blog", "posts", params],
        queryFn: async () => {
            const { data } = await api.get<BlogPostList>("/api/blog/posts", { params });
            return data;
        },
    });
};
```

### Example — Mutation Hook
```ts
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { BlogPost, CreateBlogPostRequest } from "@/lib/api";

const createBlogPost = async (body: CreateBlogPostRequest): Promise<BlogPost> => {
    const { data } = await api.post<BlogPost>("/api/admin/blog/posts", body);
    return data;
};

export const useCreatePost = () => {
    return useMutation({ mutationFn: createBlogPost });
};
```
