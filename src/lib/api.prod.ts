import { api } from "@/lib/api-client";

// --- Auth ---

export interface LoginCredentials {
    email: string;
    password?: string;
}

export interface AuthResponse {
    token: string;
}

export const loginWithEmailAndPassword = (credentials: LoginCredentials): Promise<AuthResponse> => {
    return api.post<AuthResponse>("/auth/login", credentials);
};

// --- Upload ---

export const uploadAdminImage = async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("file", file);

    return api.post<{ url: string }>("/api/admin/upload-image", formData);
};
