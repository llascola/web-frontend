# Project Context: Personal Portfolio & Dashboard

This document provides an overview of the frontend architecture, technologies, and features of the project located at `/Users/llascola/my-portfolio/frontend`.

## Tech Stack
- **Framework**: React 19 + TypeScript, scaffolded with Vite.
- **Routing**: React Router (`react-router-dom` v7).
- **Styling**: Tailwind CSS v4, integrated with custom utility functions (likely `clsx` and `tailwind-merge` in `src/lib/utils.ts`).
- **UI Components**: Radix UI primitives and custom components located in `src/components/ui`. Interfaces are enriched with `lucide-react` icons.
- **Content Formatting**: MDX (`@mdx-js/react`) is used to write blog posts that embed React components (e.g., `ServerStatus`) directly into markdown.

## Core Structure
- `src/App.tsx`: The root component that sets up routing and wraps the application in the `AuthProvider`.
- `src/main.tsx`: Entry point for React 19's `createRoot`.
- `src/context/`: Contains React Context providers, specifically `AuthContext.tsx`.
- `src/pages/`: Contains the top-level route components.
- `src/components/`: Contains reusable React components and layout sections.
    - `ui/`: Sub-directory for low-level, primitive UI components (like Buttons, Cards, Inputs).
- `src/posts/`: Contains `.mdx` files for the blog section.

## Routing
There are three primary routes defined in the application:
1. **`/` (Portfolio)**: The main landing page. A single-page scrolling layout comprised of `Navbar`, `Hero`, `About`, `PortfolioSection`, `BlogSection`, and `Footer`.
2. **`/login` (Login)**: A public route offering an authentication form. It communicates with an external API (`${import.meta.env.VITE_API_URL}/auth/login`).
3. **`/dashboard` (Dashboard)**: A protected route, wrapped by a `ProtectedRoute` component. It serves as a "Backend Control Center" where an authenticated user can view server metrics and upload files.

## State Management & Authentication
- **AuthContext**: Manages user authentication state globally.
  - Keeps the `token` in `localStorage` across sessions.
  - Implements a session expiration mechanism. A timestamp is saved on login, and an interval checks if the session has exceeded the timeout (defined by `import.meta.env.VITE_SESSION_TIMEOUT` or defaulting to 15 minutes).
  - Provides `login`, `logout`, `token`, and `isAuthenticated` boolean to consumer components.
- **ProtectedRoute**: A wrapper component that checks the `isAuthenticated` property from `useAuth` and redirects unauthenticated users back to `/login`.

## Key Features & APIs
- **Blog Section**: Uses MDX to allow rendering interactive React components within articles. For example, `src/posts/server-architecture.mdx` imports and uses the `ServerStatus` UI component to build an interactive blog post.
- **File Upload**: The `Dashboard` implements a file upload widget that uploads images to `${import.meta.env.VITE_API_URL}/api/admin/upload-image`, requiring a Bearer token in the Authorization header.
- **Responsive Layout**: Heavy usage of Tailwind CSS grid and flexbox utilities to construct responsive navbars (with mobile hamburger menus) and card layouts.

## Environmental Configuration
The application relies on specific environment variables defined via Vite:
- `VITE_API_URL`: The base URL for backend API requests (auth, uploads).
- `VITE_SESSION_TIMEOUT`: Optional timeout override for session expiration in minutes.
