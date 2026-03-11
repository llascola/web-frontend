import { useState } from "react";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Authorization } from "@/features/auth";
import type { BlogPost } from "@/lib/api";
import { InlineEditButton } from "./InlineEditButton";
import { BlogPostEditor } from "./BlogPostEditor";
import { useDeletePost } from "../api/use-blog-admin";

interface BlogPostDetailProps {
    post: BlogPost;
}

export const BlogPostDetail = ({ post }: BlogPostDetailProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const deleteMutation = useDeletePost();

    const formattedDate = new Date(post.published_at ?? post.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deleteMutation.mutate(post.id, {
                onSuccess: () => {
                    window.location.href = "/blog";
                },
            });
        }
    };

    return (
        <section className="py-32 bg-background min-h-screen">
            <Container className="max-w-3xl">
                <div className="mb-8 flex items-center justify-between">
                    <Button asChild variant="ghost" className="gap-2">
                        <Link to="/blog">
                            <ArrowLeft size={16} /> Back to Blog
                        </Link>
                    </Button>
                    <div className="flex gap-2">
                        <InlineEditButton onClick={() => setIsEditing(true)} />
                        <Authorization allowedRoles={["ADMIN"]}>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="gap-2"
                                onClick={handleDelete}
                                disabled={deleteMutation.isPending}
                            >
                                <Trash2 size={16} /> Delete
                            </Button>
                        </Authorization>
                    </div>
                </div>

                <article>
                    <header className="mb-8 space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <time>{formattedDate}</time>
                            {post.tags.length > 0 && (
                                <div className="flex gap-2">
                                    {post.tags.map((tag) => (
                                        <Link
                                            key={tag}
                                            to={`/blog?tag=${tag}`}
                                            className="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </header>

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
                    </div>
                </article>
            </Container>

            {isEditing && (
                <BlogPostEditor post={post} onClose={() => setIsEditing(false)} />
            )}
        </section>
    );
};
