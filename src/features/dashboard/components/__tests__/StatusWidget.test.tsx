import { render, screen } from "@/testing/test-utils";
import { describe, it, expect } from "vitest";
import { StatusWidget } from "../StatusWidget";

describe("StatusWidget (TDD)", () => {
    it("🔴 renders the widget title", () => {
        render(<StatusWidget title="Server Status">Online</StatusWidget>);
        expect(screen.getByText("Server Status")).toBeInTheDocument();
    });

    it("🔴 renders children content", () => {
        render(
            <StatusWidget title="Database">
                <p>128ms</p>
            </StatusWidget>
        );
        expect(screen.getByText("128ms")).toBeInTheDocument();
    });

    it("🔴 wraps content in a card structure", () => {
        render(<StatusWidget title="Uptime">99.9%</StatusWidget>);
        // The card should use the data-slot="card" attribute from shadcn
        const card = screen.getByText("Uptime").closest("[data-slot='card']");
        expect(card).toBeInTheDocument();
    });
});
