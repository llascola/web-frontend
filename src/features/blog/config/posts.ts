import PostOne from "../../../posts/server-architecture.mdx";

export interface BlogPost {
    id: string;
    title: string;
    date: string;
    excerpt?: string;
    isFeatured?: boolean;
    Component?: React.ComponentType;
    link: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: "server-architecture",
        title: "Server Architecture Insights",
        date: "Dec 6, 2025",
        isFeatured: true,
        Component: PostOne,
        link: "#article-1",
    },
    {
        id: "react-server-components",
        title: "Understanding React Server Components",
        date: "Nov 28, 2025",
        excerpt: "A deep dive into how RSCs change the way we build React applications...",
        link: "#article-2",
    },
    {
        id: "optimizing-go",
        title: "Optimizing Go for High Throughput",
        date: "Nov 15, 2025",
        excerpt: "Tips and tricks for squeezing every bit of performance out of your Go services...",
        link: "#article-3",
    },
];
