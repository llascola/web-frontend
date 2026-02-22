---
name: bulletproof-state
description: Guidelines for managing Form State, Server Cache State, and Application State efficiently following Bulletproof React. Use when adding data fetching, building forms, or structuring global state.
---

# State Management Guidelines

When adding new features, handling API requests, or building forms in this project, you MUST adhere to the following Bulletproof React state management principles to avoid manual boilerplate and ensure optimal performance.

## 1. Separation of State Concerns

Do not put everything in a monolithic global state (like Redux or a massive Context). Instead, divide your state into distinct categories based on their usage:

*   **Application State**: For low-velocity global UI state (like Theme, Auth Token, or Modal toggles). Use React Context for this.
*   **Component State**: For isolated component-specific state (like toggle buttons or active tabs). Use standard `useState()`.
*   **Server Cache State**: For any asynchronous data fetching or mutations from the backend API.
*   **Form State**: For handling user inputs, multi-step wizards, and client-side validation.

---

## 2. Server Cache State (Data Fetching & Mutations)

**Rule: Never use manual `useState` and `useEffect` blocks to manage API calls.**

When executing network requests, you MUST use **`@tanstack/react-query`**:
1.  **Extract API Logic**: Remote fetch calls must be extracted into a standalone API file (e.g., `src/features/[feature]/api/[endpoint].ts`). No raw `fetch` calls directly inside components.
2.  **Use React Query Hooks**: Utilize `useQuery` (for reading data) and `useMutation` (for writing/submitting data).
3.  **Consume Lifecycle States**: Rely natively on the boolean states provided by React Query (e.g., `isPending`, `isError`, `isSuccess`) instead of manually tracking `const [loading, setLoading] = useState(false)`.

---

## 3. Form State & Validation

**Rule: Never use manual controlled inputs (`value={state}`, `onChange={(e) => setState(e.target.value)}`) for complex forms.**

When building forms or accepting user input that needs to be validated and sent to the server:
1.  **Use React Hook Form**: Orchestrate form state using the `useForm` hook from `react-hook-form` to prevent unnecessary component re-renders on every keystroke.
2.  **Schema Validation with Zod**: Define a strict schema using `zod` for every form. This ensures full TypeScript safety from the initial input all the way through to the API payload.
3.  **Use the Resolver**: Bind the `zod` schema to React Hook Form using the `@hookform/resolvers/zod` package. Provide clear, user-facing error messages in the schema definition itself.
