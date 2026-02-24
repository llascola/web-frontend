import type { AuthRequest, LoginResponse, UploadImageResponse } from "./api.prod";

// --- Auth ---

const DEV_EMAIL = "admin@dev.local";
const DEV_PASSWORD = "admin";

const createDevToken = (): string => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(
        JSON.stringify({
            sub: "dev-admin-1",
            email: DEV_EMAIL,
            role: "ADMIN",
            exp: Math.floor(Date.now() / 1000) + 86400,
        })
    );
    const signature = btoa("dev-signature");
    return `${header}.${payload}.${signature}`;
};

export const loginWithEmailAndPassword = async (credentials: AuthRequest): Promise<LoginResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (credentials.email === DEV_EMAIL && credentials.password === DEV_PASSWORD) {
        return { access_token: createDevToken(), refresh_token: "mock-refresh-token" };
    }

    throw new Error("Invalid credentials");
};

// --- Upload ---

export const uploadAdminImage = async (file: File): Promise<UploadImageResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { url: URL.createObjectURL(file) };
};
