import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { ProtectedRoute } from "../ProtectedRoute";
import * as AuthContextModule from "../../context/AuthContext";

// Helper component to track where the router ended up
const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid="location-display">{location.pathname}</div>;
};

describe("ProtectedRoute Unit Testing", () => {
    it("renders children identically when the user possesses a valid authentication token", () => {
        vi.spyOn(AuthContextModule, "useAuth").mockReturnValue({
            user: { id: "1", role: "ADMIN" },
            token: "valid-mock-token",
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
        });

        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <Routes>
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <div data-testid="protected-content">Secret Content</div>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByTestId("protected-content")).toBeInTheDocument();
        expect(screen.getByText("Secret Content")).toBeInTheDocument();
    });

    it("immediately redirects to the securely bounded /login route when unauthenticated", () => {
        vi.spyOn(AuthContextModule, "useAuth").mockReturnValue({
            user: null,
            token: null,
            isAuthenticated: false,
            login: vi.fn(),
            logout: vi.fn(),
        });

        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <Routes>
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <div data-testid="protected-content">Secret Content</div>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<LocationDisplay />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
        expect(screen.getByTestId("location-display")).toHaveTextContent("/login");
    });
});
