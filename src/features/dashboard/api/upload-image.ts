import { api } from "@/lib/api-client";

export const uploadImage = (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post<{ url: string }>("/api/admin/upload-image", formData);
};
