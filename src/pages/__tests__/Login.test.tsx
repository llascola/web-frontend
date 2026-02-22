import { render, screen, waitFor } from "@/testing/test-utils";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Login from "../Login";

describe("Login Page Integration", () => {
    it("renders the login form elements natively", () => {
        render(<Login />);
        expect(screen.getByText("Login", { selector: "div" })).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });

    it("displays strict zod validation errors on empty submissions", async () => {
        const user = userEvent.setup();
        render(<Login />);

        const submitButton = screen.getByRole("button", { name: /login/i });
        await user.click(submitButton);

        // Assert Zod natively traps the user and renders warnings in the DOM
        expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
    });

    it("handles remote server error responses securely", async () => {
        const user = userEvent.setup();
        render(<Login />);

        await user.type(screen.getByLabelText(/username/i), "hacker@example.com");
        await user.type(screen.getByLabelText(/password/i), "wrongpass");

        await user.click(screen.getByRole("button", { name: /login/i }));

        // The universal MSW auth handler returns a 401 for invalid credentials
        expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
    });

    it("handles successful secure login lifecycles gracefully", async () => {
        const user = userEvent.setup();
        render(<Login />);

        await user.type(screen.getByLabelText(/username/i), "test@example.com");
        await user.type(screen.getByLabelText(/password/i), "password");

        await user.click(screen.getByRole("button", { name: /login/i }));

        // Button should switch to loading state automatically via React Query
        expect(await screen.findByRole("button", { name: /logging in\.\.\./i })).toBeInTheDocument();

        // Awaits the mutation success and rapid navigation
        await waitFor(() => {
            expect(screen.queryByRole("button", { name: /logging in\.\.\./i })).not.toBeInTheDocument();
        });
    });
});
