import { render, screen } from "@/testing/test-utils";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { DashboardNav } from "../DashboardNav";

describe("DashboardNav (TDD)", () => {
    it("🔴 renders the dashboard title", () => {
        render(<DashboardNav onLogout={vi.fn()} />);
        expect(screen.getByText("Backend Control Center")).toBeInTheDocument();
    });

    it("🔴 renders a link back to the portfolio", () => {
        render(<DashboardNav onLogout={vi.fn()} />);
        const link = screen.getByRole("link", { name: /back to portfolio/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/");
    });

    it("🔴 renders a logout button that calls onLogout", async () => {
        const onLogout = vi.fn();
        const user = userEvent.setup();
        render(<DashboardNav onLogout={onLogout} />);

        const logoutButton = screen.getByRole("button", { name: /logout/i });
        expect(logoutButton).toBeInTheDocument();

        await user.click(logoutButton);
        expect(onLogout).toHaveBeenCalledOnce();
    });
});
