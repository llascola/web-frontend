---
name: tdd-workflow
description: A step-by-step guide for practicing Test-Driven Development (TDD) with the project's Vitest, React Testing Library, and MSW stack. Use when building new features test-first or applying the Red-Green-Refactor cycle.
---

# Test-Driven Development (TDD) Workflow

Follow this cycle for every new feature, component, or behavior change.

## The Red → Green → Refactor Cycle

### 🔴 Step 1: RED — Write a Failing Test
1.  **Identify the behavior** you need. Frame it from the user's perspective:
    *   "The user should see a success message after uploading."
    *   "The navigation bar should show a logout button."
2.  **Create or open** the `__tests__/ComponentName.test.tsx` file adjacent to the feature.
3.  **Write the test** using `@testing-library/react`. Assert what the user sees in the DOM.
4.  **Run the test**: `npm run test -- path/to/__tests__/File.test.tsx`
5.  **Confirm it fails (RED)**. If it passes, your test isn't testing anything new.

```tsx
// Example: Testing a component that doesn't exist yet
it("renders a logout button in the nav", () => {
    render(<DashboardNav />);
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
});
```

### 🟢 Step 2: GREEN — Write the Minimum Code
1.  **Create the component** (or modify the existing one).
2.  Write **only enough code** to make the test pass. Resist the urge to add extras.
3.  **Run the test again**: It should now pass (GREEN).

```tsx
// The simplest possible implementation
export const DashboardNav = () => (
    <nav>
        <button>Logout</button>
    </nav>
);
```

### 🔵 Step 3: REFACTOR — Clean Up
1.  **Improve** the code: extract utilities, improve naming, add styling.
2.  **Run the test** after every change. It must stay GREEN.
3.  Common refactors: extract sub-components, use design system tokens, add props.

```tsx
// Refactored version
export const DashboardNav = ({ onLogout }: { onLogout: () => void }) => (
    <nav className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Backend Control Center</h2>
        <Button variant="destructive" onClick={onLogout}>Logout</Button>
    </nav>
);
```

### 🔁 Repeat
Pick the next behavior and start a new RED cycle.

---

## Rules for This Project

| Rule | Rationale |
|---|---|
| Tests live in `__tests__/` adjacent to the feature | Bulletproof React co-location principle |
| Use `render` from `@/testing/test-utils` | Wraps Router, QueryClient, Auth providers |
| Mock APIs with MSW, never `vi.spyOn(fetch)` | Simulates real network lifecycle |
| Assert DOM output, never internal state | Tests survive refactors |
| One behavior per `it()` block | Keeps failures specific and readable |

## When to Use TDD

*   ✅ New feature components (forms, cards, widgets)
*   ✅ API integration logic (mutations, queries)
*   ✅ Auth guards and RBAC checks
*   ✅ Validation schemas (Zod)
*   ✅ Utility/helper functions
*   ⚠️ Skip for pure CSS/layout exploration (test after stabilizing)
