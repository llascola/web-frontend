import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api";
import type { AuthRequest, LoginResponse } from "@/lib/api";
import type { MutationConfig } from "@/lib/react-query";

export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

const loginWithEmailAndPassword = async (credentials: AuthRequest): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials);
    return data;
};

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
