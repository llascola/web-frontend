import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import type { BlogPostList, BlogPost, TagList } from "@/lib/api";
import { blogKeys } from "./blog-keys";
import { getAdminBlogPosts } from "./use-blog-admin";

export const usePublishedPosts = (params?: {
    tag?: string;
    page?: number;
    page_size?: number;
    enabled?: boolean;
}) => {
    const { enabled = true, ...queryParams } = params ?? {};
    return useQuery({
        queryKey: blogKeys.postList({
            tag: queryParams.tag,
            page: queryParams.page,
            page_size: queryParams.page_size,
        }),
        queryFn: async () => {
            const { data } = await api.get<BlogPostList>("blog/posts", { params: queryParams });
            return data;
        },
        enabled,
    });
};

export const useBlogPostsList = (params?: {
    isAdmin?: boolean;
    tag?: string;
    page?: number;
    page_size?: number;
    enabled?: boolean;
}) => {
    const { enabled = true, isAdmin = false, tag, page, page_size } = params ?? {};

    return useQuery({
        queryKey: blogKeys.postsList({ isAdmin, tag, page, page_size }),
        queryFn: async () => {
            if (isAdmin) {
                return getAdminBlogPosts({ tag, page, page_size });
            }
            const { data } = await api.get<BlogPostList>("blog/posts", {
                params: { tag, page, page_size },
            });
            return data;
        },
        enabled,
    });
};

export const usePublishedPost = (slug: string) => {
    return useQuery({
        queryKey: blogKeys.postDetail(slug),
        queryFn: async () => {
            const { data } = await api.get<BlogPost>(`blog/posts/${slug}`);
            return data;
        },
        enabled: !!slug,
    });
};

export const useBlogTags = () => {
    return useQuery({
        queryKey: blogKeys.tags(),
        queryFn: async () => {
            const { data } = await api.get<TagList>("blog/tags");
            return data;
        },
    });
};
