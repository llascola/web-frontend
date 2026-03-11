
export const blogKeys = {
    all: ["blog"] as const,
    admin: () => [...blogKeys.all, "admin"] as const,
    adminPosts: () => [...blogKeys.admin(), "posts"] as const,
    adminPostsList: (params?: { tag?: string; page?: number; page_size?: number }) =>
        [...blogKeys.adminPosts(), params ?? {}] as const,
    posts: () => [...blogKeys.all, "posts"] as const,
    postList: (params?: { tag?: string; page?: number; page_size?: number }) =>
        [...blogKeys.posts(), params ?? {}] as const,
    postsList: (params?: { isAdmin?: boolean; tag?: string; page?: number; page_size?: number }) =>
        [...blogKeys.all, "posts-list", params ?? {}] as const,
    postDetail: (slug: string) => [...blogKeys.posts(), slug] as const,
    tags: () => [...blogKeys.all, "tags"] as const,
};
