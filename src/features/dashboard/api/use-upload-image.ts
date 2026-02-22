import { useMutation } from "@tanstack/react-query";
import type { MutationConfig } from "@/lib/react-query";

// In local dev mode, the adapter pattern routes to the mock.
// In production, this uses the real fetcher via api-client.
import { uploadAdminImage } from "@/lib/api";

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
