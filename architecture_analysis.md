# Project Architecture Analysis

This document provides a holistic overview of the application's architecture, configuration, and routing structure based on the current codebase.

## 1. High-Level Tech Stack & Configuration
The project is a modern Frontend application built with:
- **React 19**
- **TypeScript** (Strict mode enabled via `tsconfig.app.json`)
- **Vite** as the bundler and development server.
- **Tailwind CSS v4** for styling.

### Vite Configuration (`vite.config.ts`)
- **Plugins**: Uses `@vitejs/plugin-react` for Fast Refresh, `@tailwindcss/vite` for the new v4 engine, and `@mdx-js/rollup` to allow writing components directly inside Markdown files (like the blog posts).
- **Aliases**: Resolves `@/` to the `./src` directory, a standard modern pattern for clean imports.
- **Proxy**: The dev server proxies API requests starting with `/auth` and `/api` to a local backend running at `http://localhost:8001`. This prevents CORS issues during local development.

## 2. Directory Structure (`/src`)
The `src` directory is cleanly organized by domain and responsibility:

- `/assets`: Static resources (images, icons) that require bundling.
- `/components`: Contains all React components. It is strictly split between low-level `ui/` primitives (Buttons, Inputs) and high-level layout sections.
- `/config`: Contains centralized static data (like `posts.ts` for the blog).
- `/context`: Contains React Context providers for global state management (e.g., `AuthContext.tsx`).
- `/lib`: Helper functions and utilities (e.g., `utils.ts` for CSS class merging).
- `/pages`: Top-level route components (`Portfolio`, `Login`, `Dashboard`). These files represent entire screens and orchestrate the lower-level components.
- `/posts`: The actual `.mdx` files representing blog content.

## 3. Routing & State Architecture (`App.tsx`)
The application uses React Router v7 (`BrowserRouter`, `Routes`, `Route`). The root `App.tsx` component serves as the application shell and sets up the strict hierarchy of providers:

```tsx
<ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
    <AuthProvider>
        <BrowserRouter>
            {/* Routes Go Here */}
        </BrowserRouter>
    </AuthProvider>
</ThemeProvider>
```
1.  **ThemeProvider**: Sits at the absolute top level to ensure the entire DOM has access to the color theme (Dark/Light/System) before anything renders.
2.  **AuthProvider**: Wraps the router so authentication state (`token`, `isAuthenticated`) is globally available to all routes.

**The Routes:**
- `/` (Portfolio): Public landing page.
- `/login` (Login): Public authentication page.
- `/dashboard` (Dashboard): Wrapped in a `<ProtectedRoute>`. If `isAuthenticated` is false, it redirects back to the login page.

## 4. Styling & Theming System (`index.css`)
The project utilizes the new **Tailwind v4** syntax (`@import "tailwindcss";` and `@theme inline`).

- **CSS Variables**: Define the entire design system (`--background`, `--primary`, `--card`, etc.) using OKLCH colors. 
- **Dark Mode**: The `.dark` class overrides all semantic OKLCH variables. For example, `--background` swaps from white (oklch(0.99...)) to pure black (oklch(0 0 0)).
- **Base Layer**: A small `@layer base` applies the background and foreground colors to the `<body>` tag, ensuring the theme cascades instantly across the entire application.

## Summary
The project is exceptionally well-architected. It follows the exact modular patterns advocated by the React community (like the Bulletproof React guidelines). The strict separation of concerns (Pages vs. Components vs. UI Primitives), the use of Context for global state, and the semantic nature of the Tailwind configuration make it a highly scalable and maintainable codebase.
