import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";
import type { BlogPost, CreateBlogPostRequest, UpdateBlogPostRequest, MessageResponse, BlogPostList } from "@/lib/api";
import type { MutationConfig } from "@/lib/react-query";
import { blogKeys } from "./blog-keys";

// --- Mutation functions ---

const createBlogPost = async (body: CreateBlogPostRequest): Promise<BlogPost> => {
    const { data } = await api.post<BlogPost>("admin/blog/posts", body);
    return data;
};

const updateBlogPost = async ({ id, data: body }: { id: string; data: UpdateBlogPostRequest }): Promise<BlogPost> => {
    const { data } = await api.put<BlogPost>(`admin/blog/posts/${id}`, body);
    return data;
};

const deleteBlogPost = async (id: string): Promise<MessageResponse> => {
    const { data } = await api.delete<MessageResponse>(`admin/blog/posts/${id}`);
    return data;
};

export const getAdminBlogPosts = async (params?: { tag?: string; page?: number; page_size?: number }): Promise<BlogPostList> => {
    const { data } = await api.get<BlogPostList>("admin/blog/posts", { params });
    return data;
};

// --- Hooks ---

type UseCreatePostOptions = {
    mutationConfig?: MutationConfig<typeof createBlogPost>;
};

export const useCreatePost = ({ mutationConfig }: UseCreatePostOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        mutationFn: createBlogPost,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: blogKeys.posts() });
            onSuccess?.(...args);
        },
        ...restConfig,
    });
};

type UseUpdatePostOptions = {
    mutationConfig?: MutationConfig<typeof updateBlogPost>;
};

export const useUpdatePost = ({ mutationConfig }: UseUpdatePostOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        mutationFn: updateBlogPost,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: blogKeys.posts() });
            onSuccess?.(...args);
        },
        ...restConfig,
    });
};

type UseDeletePostOptions = {
    mutationConfig?: MutationConfig<typeof deleteBlogPost>;
};

export const useDeletePost = ({ mutationConfig }: UseDeletePostOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        mutationFn: deleteBlogPost,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: blogKeys.posts() });
            onSuccess?.(...args);
        },
        ...restConfig,
    });
};


type UseAllAdminPostsListOptions = {
    enabled?: boolean;
};

export const useAllAdminPostsList = (options?: UseAllAdminPostsListOptions) => {
    const enabled = options?.enabled ?? true;
    return useQuery({
        queryKey: blogKeys.adminPostsList(),
        queryFn: () => getAdminBlogPosts(),
        enabled,
    });
};