import { render, screen } from "@/testing/test-utils";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Dashboard from "../Dashboard";
import * as AuthContextModule from "@/features/auth/context/AuthContext";

describe("Dashboard Page Integration", () => {
    // Inject a mocked session to bypass the frontend token requirement boundary
    const mockAuth = () => {
        vi.spyOn(AuthContextModule, "useAuth").mockReturnValue({
            user: { id: "admin-1", role: "ADMIN" },
            token: "valid-mock-token",
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
        });
    };

    it("renders strictly isolated dashboard widgets", () => {
        mockAuth();
        render(<Dashboard />);

        expect(screen.getByText("Backend Control Center")).toBeInTheDocument();
        expect(screen.getByText("Server Status")).toBeInTheDocument();
        expect(screen.getByText("Database")).toBeInTheDocument();
        expect(screen.getByText("Uptime")).toBeInTheDocument();
    });

    it("disables network mutations gracefully without a valid file", async () => {
        mockAuth();
        const user = userEvent.setup();
        render(<Dashboard />);

        // Assert initial state boundary
        const uploadButton = screen.getByRole("button", { name: "Upload" });
        expect(uploadButton).toBeDisabled();

        // Mutate local state via DOM injection
        const fileInput = screen.getByLabelText("Picture");
        const file = new File(["dummy content"], "hello.png", { type: "image/png" });
        await user.upload(fileInput, file);

        // Assert React Query mutation enabler triggered correctly
        expect(uploadButton).toBeEnabled();
    });

    it("executes network boundaries cleanly and tracks valid React Query mutations", async () => {
        mockAuth();
        const user = userEvent.setup();
        render(<Dashboard />);

        const fileInput = screen.getByLabelText("Picture");
        const file = new File(["dummy buffer details"], "test-screenshot.png", { type: "image/png" });
        await user.upload(fileInput, file);

        const uploadButton = screen.getByRole("button", { name: "Upload" });
        await user.click(uploadButton);

        // React Query's `useMutation` instantly reflects network polling
        expect(await screen.findByRole("button", { name: /uploading.../i })).toBeInTheDocument();

        // The mock adapter returns a local blob URL via URL.createObjectURL
        expect(await screen.findByText("Upload Successful!")).toBeInTheDocument();

        const links = screen.getAllByRole("link");
        const blobLink = links.find((link) => link.getAttribute("href")?.startsWith("blob:"));
        expect(blobLink).toBeInTheDocument();
    });
});
