import { render, screen } from "@/testing/test-utils";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ImageUploadCard } from "../ImageUploadCard";
import * as AuthContextModule from "@/features/auth/context/AuthContext";

describe("ImageUploadCard (TDD)", () => {
    const mockAuth = () => {
        vi.spyOn(AuthContextModule, "useAuth").mockReturnValue({
            user: { id: "admin-1", role: "ADMIN" },
            token: "valid-mock-token",
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
        });
    };

    it("🔴 renders the upload title and file input", () => {
        mockAuth();
        render(<ImageUploadCard />);
        expect(screen.getByText("Upload Image")).toBeInTheDocument();
        expect(screen.getByLabelText("Picture")).toBeInTheDocument();
    });

    it("🔴 disables the upload button when no file is selected", () => {
        mockAuth();
        render(<ImageUploadCard />);
        expect(screen.getByRole("button", { name: "Upload" })).toBeDisabled();
    });

    it("🔴 enables the upload button after selecting a file", async () => {
        mockAuth();
        const user = userEvent.setup();
        render(<ImageUploadCard />);

        const fileInput = screen.getByLabelText("Picture");
        const file = new File(["test"], "photo.png", { type: "image/png" });
        await user.upload(fileInput, file);

        expect(screen.getByRole("button", { name: "Upload" })).toBeEnabled();
    });

    it("🔴 shows uploading state and success message after upload", async () => {
        mockAuth();
        const user = userEvent.setup();
        render(<ImageUploadCard />);

        const fileInput = screen.getByLabelText("Picture");
        const file = new File(["test"], "photo.png", { type: "image/png" });
        await user.upload(fileInput, file);

        await user.click(screen.getByRole("button", { name: "Upload" }));

        // React Query loading state
        expect(await screen.findByRole("button", { name: /uploading.../i })).toBeInTheDocument();

        // Mock adapter returns a local blob URL via URL.createObjectURL
        expect(await screen.findByText("Upload Successful!")).toBeInTheDocument();
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", expect.stringContaining("blob:"));
    });
});
