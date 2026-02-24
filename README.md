# Frontend

React single-page application for the personal portfolio site. Includes a public portfolio page, a blog powered by MDX, and a protected admin dashboard with JWT-based authentication.

## Tech Stack

| Category | Technology |
| --- | --- |
| Framework | React 19, TypeScript 5.9 |
| Build | Vite 7.2 |
| Styling | Tailwind CSS 4, class-variance-authority |
| Server State | TanStack React Query 5 |
| Routing | React Router 7 |
| Forms | React Hook Form 7, Zod 4 |
| UI Primitives | Radix UI, Lucide Icons |
| Content | MDX |
| Testing | Vitest, Testing Library, MSW 2, Playwright |
| Contracts | openapi-typescript |

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- The backend server running on `http://localhost:8080` (only required when `VITE_USE_MOCKS=false`)

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server (http://localhost:5173)
npm run dev
```

The dev server proxies `/auth` and `/api` requests to the backend at `http://localhost:8080`.

## Environment Variables

| Variable | Default | Description |
| --- | --- | --- |
| `VITE_USE_MOCKS` | `true` | When `true`, all API calls use in-memory mock implementations instead of the backend |
| `VITE_SESSION_TIMEOUT` | `15` | Session timeout in minutes |

Copy `.env` and adjust values as needed. Variables prefixed with `VITE_` are exposed to client code.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check with `tsc` and produce a production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit and integration tests with Vitest |
| `npm run test:e2e` | Run end-to-end tests with Playwright |
| `npm run api:generate` | Regenerate TypeScript types from the backend OpenAPI spec |

## Project Structure

```
src/
├── assets/              # Static assets (images, fonts)
├── components/
│   └── ui/              # Shared UI primitives (Button, Card, Input, Label)
├── contracts/           # Generated OpenAPI TypeScript types
├── features/
│   ├── auth/            # Authentication & authorization (JWT, RBAC)
│   ├── blog/            # Blog feature with MDX post configuration
│   ├── dashboard/       # Admin dashboard (image upload, status)
│   └── portfolio/       # Public portfolio showcase
├── lib/                 # Shared utilities (API client, React Query config)
├── pages/               # Route-level page components
├── posts/               # MDX blog content
└── testing/             # Test utilities, MSW handlers, setup
```

Each feature module follows a consistent internal layout:

```
features/<name>/
├── api/                 # React Query hooks and API functions
├── components/          # Feature-scoped React components
│   └── __tests__/       # Co-located component tests
├── context/             # React Context providers (when needed)
└── index.ts             # Public barrel export
```

## Architecture

### Routing

Three top-level routes, all lazy-loaded with `React.lazy` and `Suspense`:

| Path | Page | Access |
| --- | --- | --- |
| `/` | Portfolio | Public |
| `/login` | Login | Public |
| `/dashboard` | Dashboard | Protected (requires JWT) |

Route protection is handled by the `ProtectedRoute` component. Fine-grained role-based access uses the `Authorization` component with an `allowedRoles` prop.

### API Layer

A three-tier design decouples components from transport details:

1. **Adapter** (`lib/api.ts`) -- dynamically imports mock or production implementations based on `VITE_USE_MOCKS`.
2. **Client** (`lib/api-client.ts`) -- `fetch` wrapper that handles auth headers, error mapping, 401 redirects, and `FormData` uploads.
3. **Feature hooks** -- React Query mutations/queries per feature (e.g., `useLogin`, `useUploadImage`).

### State Management

| Kind | Approach |
| --- | --- |
| Server state | TanStack React Query (stale time, retry, caching) |
| Auth state | `AuthContext` (JWT storage, expiration, user extraction) |
| Theme state | `ThemeProvider` (light / dark / system, persisted to localStorage) |
| Form state | React Hook Form + Zod schemas |

### OpenAPI Contract

The backend OpenAPI spec is the single source of truth for API types. Regenerate types after any spec change:

```bash
npm run api:generate
```

This produces `src/contracts/openapi-types.ts`, which is imported by API functions to ensure type safety across the boundary.

## Testing

### Unit & Integration Tests

```bash
# Run in watch mode
npm test

# Run once with coverage
npx vitest run --coverage
```

Tests use a custom `render` helper (`src/testing/test-utils.tsx`) that wraps components in all required providers (QueryClient, AuthProvider, ThemeProvider, MemoryRouter). API calls are intercepted by MSW handlers defined in `src/testing/mocks/handlers/`.

### End-to-End Tests

```bash
npm run test:e2e
```

E2E tests use Playwright to exercise full user flows in a real browser environment.

## Styling

Tailwind CSS v4 with a custom design system defined via CSS custom properties in `src/index.css`. The theme uses the OKLCH color space and supports light and dark modes. Components are styled with utility classes, composed via the `cn()` helper (`clsx` + `tailwind-merge`), and use `class-variance-authority` for variant-based APIs.
