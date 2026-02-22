---
name: bulletproof-components
description: Best practices for structuring, composing, and styling React components following Bulletproof React. Use when creating or modifying UI components, applying styles, or wrapping third-party libraries.
---

# Components & Styling Guidelines

When creating or modifying components in this project, you MUST adhere to the following Bulletproof React best practices.

## 1. Component Architecture & Best Practices

*   **Colocate Code**: Keep components, functions, styles, types, and state as close as possible to where they are being used. This improves readability and performance by reducing redundant re-renders.
*   **Avoid Nested Rendering Functions**: NEVER define a render function inside another component's body (`function renderItems() { return <div/> }`). Always extract complex UI logic into separate, standalone components.
*   **Component Composition**: Limit the number of props a component accepts. If a component takes too many props, rely on composition techniques (passing complex elements via `children` or generic slots) instead of passing individual data pieces.
*   **Abstract Shared UI**: Repetitive UI patterns must be abstracted into the component library (`src/components/ui/`).
*   **Wrap Third-Party Libraries**: Always wrap 3rd-party components (like Radix UI primitives) in your own generic wrappers inside `src/components/ui/` to adapt them to the application's specific styling and needs.

## 2. Feature vs. Primitive Components

There is a strict separation between low-level UI primitives and feature-level implementation components.

### UI Primitives (`src/components/ui/`)
*   Should be built as "Headless" or structurally independent entities.
*   Must rely on `class-variance-authority` (cva) to handle visual variants (like button sizes or themes) instead of complex conditional styling.
*   Must use the `cn()` utility (`clsx` + `tailwind-merge`) to merge incoming `className` props securely without conflicts.
*   **NEVER** apply layout margins or positioning (e.g., `mt-4`, `absolute`) to the root of a generic UI component. Positioning should be handled by the parent component that consumes it.

### Feature Components (`src/features/.../components/`)
*   These components consume the UI primitives to build actual business logic and layout sections.
*   They are allowed to manage state, execute side-effects, and fetch data.

## 3. Styling & Theming

*   **Tailwind CSS v4**: All styling is handled purely by Tailwind utility classes.
*   **Semantic Theming**: The application relies on a global variable theme defined in `index.css`. You must strictly use semantic color tokens:
    *   ✅ **Correct**: `bg-background`, `text-foreground`, `bg-card`, `bg-primary`, `text-muted-foreground`.
    *   ❌ **Incorrect**: `bg-white`, `bg-gray-900`, `text-slate-800`.
*   **Zero Runtime Overhead**: Do not use runtime-heavy CSS-in-JS libraries. Rely on Tailwind classes to guarantee performance and immediate styling resolution on render.
