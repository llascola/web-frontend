import { api } from "@/lib/api-client";
import type { components } from "@/contracts/openapi-types";

// --- Auth ---

export type AuthRequest = components["schemas"]["AuthRequest"];
export type LoginResponse = components["schemas"]["LoginResponse"];
export type UploadImageResponse = components["schemas"]["UploadImageResponse"];

export const loginWithEmailAndPassword = (credentials: AuthRequest): Promise<LoginResponse> => {
    return api.post<LoginResponse>("/auth/login", credentials);
};

// --- Upload ---

export const uploadAdminImage = async (file: File): Promise<UploadImageResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    return api.post<UploadImageResponse>("/api/admin/upload-image", formData);
};
