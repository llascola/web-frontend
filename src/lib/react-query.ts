import type { UseMutationOptions, DefaultOptions } from "@tanstack/react-query";

/**
 * Default React Query configuration.
 * Shared across the app's QueryClientProvider.
 */
export const queryConfig = {
    queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60, // 1 minute
    },
} satisfies DefaultOptions;

/**
 * Extracts the awaited return type of an async function.
 */
export type ApiFnReturnType<FnType extends (...args: never[]) => Promise<unknown>> =
    Awaited<ReturnType<FnType>>;

/**
 * Type-safe mutation config helper.
 * Use this to type the `mutationConfig` prop on custom mutation hooks.
 *
 * @example
 * type UseLoginOptions = { mutationConfig?: MutationConfig<typeof loginWithEmailAndPassword> };
 */
export type MutationConfig<
    MutationFnType extends (...args: never[]) => Promise<unknown>,
> = UseMutationOptions<
    ApiFnReturnType<MutationFnType>,
    Error,
    Parameters<MutationFnType>[0]
>;
