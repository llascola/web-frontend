---
name: bulletproof-performance
description: Rules for writing performant React logic, efficient state management, and optimized rendering based on Bulletproof React. Use when optimizing components, adding code splitting, or managing heavy state.
---

# React Performance Guidelines

When modifying or writing React logic, state management, or application routing, you MUST adhere to the following Bulletproof React performance principles to guarantee a fast, optimized user experience.

## 1. State Management & Initialization

*   **Lazy State Initialization**: If a piece of state requires an expensive computation or synchronous I/O (e.g., reading from `localStorage`, parsing large JSON structures), you MUST use a lazy initializer function. 
    *   ✅ **Correct**: `const [config, setConfig] = useState(() => expensiveInit())`
    *   ❌ **Incorrect**: `const [config, setConfig] = useState(expensiveInit())`
*   **Granular State**: Do not centralize unrelated data into a single, massive monolithic state object. This drastically increases the radius of component re-renders. Split global states into distinct contextual hooks where they are needed.
*   **Co-location**: Keep state as close physically as possible to the component tree that actually needs to render it. Do not needlessly "lift state up" to a parent component if only a leaf node consumes it.

## 2. Component Rendering & `children` Composition

*   **Optimizing via Composition**: The `children` prop is the most basic and powerful optimization technique. If you have a component managing heavy state, do not explicitly render static child nodes inside it. Instead, design the wrapper to accept `children`. 
    *   **Why**: React knows that JSX passed as the `children` prop comes from an outer, unaffected scope. When the wrapper component's internal state updates, the `children` elements will explicitly NOT be re-rendered.
*   **Zero-Runtime Styling**: Prefer applying utility styles via Tailwind CSS (which resolves purely at build time) rather than executing runtime CSS-in-JS injection libraries.

## 3. Code Splitting & Routing

*   **Route-Level Code Splitting**: Do not eagerly import every screen or page component at the top of the root `App.tsx` router. 
*   Always use **Dynamic Imports** (`React.lazy()` combined with `<Suspense>`) for route-level components in `src/pages/`. This forces the bundler to split the production JavaScript, dramatically reducing the initial page load payload.

## 4. Asset & Network Optimization

*   Whenever dealing with long lists or remote requests, consider if data prefetching or optimistic updates can improve perceived performance.
*   Do not hardcode massive datasets into the React execution context; utilize the `src/config/` abstraction and separate data arrays so they don't bloat component logic visually or structurally.
