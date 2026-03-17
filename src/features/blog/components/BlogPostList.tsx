import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useBlogPostsList, useBlogTags } from "../api/use-blog-posts";
import { BlogCard } from "./blog-card";
import { InlineEditButton } from "./InlineEditButton";
import { BlogPostEditor } from "./BlogPostEditor";
import { Section, SectionContainer, SectionHeader } from "@/components/ui/section/section";

const PAGE_SIZE = 6;

export const BlogPostList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isCreating, setIsCreating] = useState(false);
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";

    const activeTag = searchParams.get("tag") ?? undefined;
    const page = parseInt(searchParams.get("page") ?? "1", 10);

    const { data: postsData, isLoading: postsLoading } = useBlogPostsList({
        isAdmin,
        tag: activeTag,
        page,
        page_size: PAGE_SIZE,
    });

    const { data: tagsData } = useBlogTags();

    const totalPages = postsData ? Math.ceil(postsData.total / PAGE_SIZE) : 0;

    const setTag = (tag: string | undefined) => {
        const params = new URLSearchParams(searchParams);
        if (tag) {
            params.set("tag", tag);
        } else {
            params.delete("tag");
        }
        params.delete("page");
        setSearchParams(params);
    };

    const setPage = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        if (newPage > 1) {
            params.set("page", String(newPage));
        } else {
            params.delete("page");
        }
        setSearchParams(params);
    };

    return (
        <Section className="py-32 bg-background min-h-screen">
            <SectionHeader
                title="Blog"
                description="Thoughts on technology, software architecture, and development best practices."
            >
                <InlineEditButton onClick={() => setIsCreating(true)} variant="create" />
            </SectionHeader>

            <SectionContainer>
                {tagsData && tagsData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-10 justify-center">
                        <Button
                            variant={!activeTag ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTag(undefined)}
                        >
                            All
                        </Button>
                        {tagsData.tags.map((tag) => (
                            <Button
                                key={tag}
                                variant={activeTag === tag ? "default" : "outline"}
                                size="sm"
                                onClick={() => setTag(tag)}
                            >
                                {tag}
                            </Button>
                        ))}
                    </div>
                )}

                {postsLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
                        ))}
                    </div>
                ) : postsData && postsData.posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {postsData.posts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-lg">No posts found.</p>
                        {activeTag && (
                            <Button variant="link" onClick={() => setTag(undefined)} className="mt-2">
                                Clear filter
                            </Button>
                        )}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-12">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(page - 1)}
                            disabled={page <= 1}
                        >
                            <ChevronLeft size={16} />
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            Page {page} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(page + 1)}
                            disabled={page >= totalPages}
                        >
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                )}
            </SectionContainer>

            {isCreating && (
                <BlogPostEditor onClose={() => setIsCreating(false)} />
            )}
        </Section>
    );
};
