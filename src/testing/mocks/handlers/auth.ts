import { http, HttpResponse, delay } from "msw";

export const authHandlers = [
    http.post("*/auth/login", async ({ request }) => {
        await delay(50);
        const body = (await request.json()) as { email?: string; password?: string };

        if (body.email === "test@example.com" && body.password === "password") {
            return HttpResponse.json({
                token: "mocked.jwt.token",
            });
        }

        return new HttpResponse(JSON.stringify({ message: "Invalid credentials" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }),
];
