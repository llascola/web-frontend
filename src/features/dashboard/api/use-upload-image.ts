import { useMutation } from "@tanstack/react-query";
import type { MutationConfig } from "@/lib/react-query";
import { api } from "@/lib/api";
import type { UploadImageResponse } from "@/lib/api";

const uploadAdminImage = async (file: File): Promise<UploadImageResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post<UploadImageResponse>("/api/admin/upload-image", formData);
    return data;
};

type UseUploadImageOptions = {
    mutationConfig?: MutationConfig<typeof uploadAdminImage>;
};

export const useUploadImage = ({ mutationConfig }: UseUploadImageOptions = {}) => {
    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        mutationFn: uploadAdminImage,
        onSuccess: (...args) => {
            onSuccess?.(...args);
        },
        ...restConfig,
    });
};
