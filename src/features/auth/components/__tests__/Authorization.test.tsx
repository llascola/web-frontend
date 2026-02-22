import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Authorization } from "../Authorization";
import * as AuthContextModule from "../../context/AuthContext";

describe("Authorization Component (RBAC)", () => {
    it("should render children if the user has an allowed role", () => {
        // Mock the AuthContext
        vi.spyOn(AuthContextModule, "useAuth").mockReturnValue({
            user: { id: "1", role: "ADMIN" },
            token: "mock.token",
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
        });

        render(
            <Authorization allowedRoles={["ADMIN"]}>
                <div data-testid="protected-content">Secret Admin Dashboard</div>
            </Authorization>
        );

        expect(screen.getByTestId("protected-content")).toBeInTheDocument();
        expect(screen.getByText("Secret Admin Dashboard")).toBeInTheDocument();
    });

    it("should NOT render children if the user does NOT have an allowed role", () => {
        // Mock the AuthContext
        vi.spyOn(AuthContextModule, "useAuth").mockReturnValue({
            user: { id: "1", role: "USER" },
            token: "mock.token",
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
        });

        render(
            <Authorization allowedRoles={["ADMIN"]}>
                <div data-testid="protected-content">Secret Admin Dashboard</div>
            </Authorization>
        );

        expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
    });

    it("should render fallback component if user does not have permission", () => {
        // Mock the AuthContext
        vi.spyOn(AuthContextModule, "useAuth").mockReturnValue({
            user: { id: "1", role: "USER" },
            token: "mock.token",
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
        });

        render(
            <Authorization
                allowedRoles={["ADMIN"]}
                fallback={<div data-testid="fallback-content">Access Denied</div>}
            >
                <div data-testid="protected-content">Secret Admin Dashboard</div>
            </Authorization>
        );

        expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
        expect(screen.getByTestId("fallback-content")).toBeInTheDocument();
        expect(screen.getByText("Access Denied")).toBeInTheDocument();
    });
});
