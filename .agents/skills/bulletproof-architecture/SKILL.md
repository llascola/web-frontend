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

## 4. Mock / Production Adapter Pattern
When the application makes network calls, you MUST separate mock and production code using a **centralized adapter pattern**. Never mix mock logic into production files.

### Structure
All API functions live in three consolidated files inside `src/lib/`:
```sh
src/lib/
├── api-client.ts      # Shared fetch wrapper (auth headers, errors, 401 redirect)
├── api.ts             # Router: switches between .prod and .mock
├── api.prod.ts        # ALL production fetchers (real fetch via api-client)
├── api.mock.ts        # ALL local dev mocks (fake data, simulated latency)
└── react-query.ts     # MutationConfig/QueryConfig type utilities
```

### Rules
*   **Router file** (`api.ts`): The only file imported by consumers. Checks `import.meta.env.VITE_API_URL` and dynamically imports the correct adapter:
    ```ts
    const isLocalDev = !import.meta.env.VITE_API_URL;
    const adapter = isLocalDev
        ? await import("./api.mock")
        : await import("./api.prod");
    export const { loginWithEmailAndPassword, uploadAdminImage } = adapter;
    ```
*   **Prod file** (`api.prod.ts`): Contains ALL production fetchers. Each function uses the shared `api-client`. No mock logic.
*   **Mock file** (`api.mock.ts`): Contains ALL local dev stubs. Must simulate realistic latency. Must never be imported outside the router.
*   **Same contract**: Both files MUST export functions with identical names, signatures, and return types.
*   **Adding a new endpoint**: Add the fetcher to BOTH `api.prod.ts` and `api.mock.ts`, then export it from the router in `api.ts`.
*   **Feature hooks**: Each feature creates its own React Query hook (e.g., `use-login.ts`, `use-upload-image.ts`) that imports from `@/lib/api`.

