import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { loginWithEmailAndPassword } from "@/lib/api";
import type { MutationConfig } from "@/lib/react-query";

export const loginSchema = z.object({
    email: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

type UseLoginOptions = {
    mutationConfig?: MutationConfig<typeof loginWithEmailAndPassword>;
};

export const useLogin = ({ mutationConfig }: UseLoginOptions = {}) => {
    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        mutationFn: loginWithEmailAndPassword,
        onSuccess: (...args) => {
            onSuccess?.(...args);
        },
        ...restConfig,
    });
};
