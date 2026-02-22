---
name: bulletproof-security
description: Guidelines for implementing Authentication, Authorization (RBAC), and securing tokens following Bulletproof React. Use when implementing login flows, protecting routes, managing JWTs, or adding role-based access control.
---

# Security & Authentication Guidelines

When implementing or modifying authentication mechanisms, user state, and component protection in this project, you MUST adhere to the following Bulletproof React security principles.

## 1. Global User Identity State
User information must be treated as a global piece of state accessible from anywhere in the application.
*   **Do not rely on opaque tokens**: The application must not represent the active user simply as a boolean `isAuthenticated` or a raw string `token`. 
*   **Decode JWTs natively**: Always decode the JSON Web Token (`jwt-decode`) natively in the client to extract the explicit `User` object (ID, email, roles, etc.) and expose it through the `useAuth()` hook.

## 2. Token Security & Expiration
*   **Trust the Server, Not the Client Clock**: Never implement manual session timeouts using local `Date` timestamps saved into `localStorage` (e.g. tracking a 15-minute clock from the time of login).
*   **Cryptographic Expiration**: Always parse the strictly-defined `exp` claim out of the decoded JWT. The frontend must rely entirely on the exact epoch timestamp generated and signed by the backend server.
*   **Render Guards**: Malformed or expired tokens must be intercepted and cleared *before* the application renders protected routes, preventing unauthorized cascading render loops.

## 3. Authorization & RBAC
Authentication (who you are) is separate from **Authorization** (what you are allowed to see).
*   **Role-Based Access Control (RBAC)**: All guarded UI elements and route components MUST be protected using explicit roles mapped from the JWT payload.
*   **Authorization Wrapper**: When scaffolding features that should only be visible to specific users (e.g., an "Admin Dashboard" or "Delete Post" button), wrap the elements using the `Authorization` component. 
*   Example:
    ```tsx
    <Authorization allowedRoles={["ADMIN"]}>
        <Button variant="destructive">Delete System</Button>
    </Authorization>
    ```

## 4. XSS Prevention
*   **Data Sanitization**: React inherently sanitizes strings before rendering them to the DOM, effectively preventing standard Cross-Site Scripting (XSS).
*   **Prohibited APIs**: NEVER use `dangerouslySetInnerHTML` to render user-supplied or remote HTML payloads unless absolutely necessary. If required, the payload MUST be scrubbed using a dedicated sanitization library like `DOMPurify` before being mounted.
