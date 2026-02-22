import { http, HttpResponse, delay } from "msw";

export const adminHandlers = [
    http.post("*/api/admin/upload-image", async ({ request }) => {
        await delay(50);
        // Mock checking authorization header realistically
        const authHeader = request.headers.get("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return new HttpResponse(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        return HttpResponse.json({
            url: "https://example.com/mock-image-upload.png",
        });
    }),
];
