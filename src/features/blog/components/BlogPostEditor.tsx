import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card/card";
import { X } from "lucide-react";
import type { BlogPost, CreateBlogPostRequest, UpdateBlogPostRequest } from "@/lib/api";
import { useCreatePost, useUpdatePost } from "../api/use-blog-admin";

interface BlogPostEditorProps {
    post?: BlogPost;
    onClose: () => void;
    onSaved?: (post: BlogPost) => void;
}

export const BlogPostEditor = ({ post, onClose, onSaved }: BlogPostEditorProps) => {
    const [title, setTitle] = useState(post?.title ?? "");
    const [content, setContent] = useState(post?.content ?? "");
    const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
    const [tagsInput, setTagsInput] = useState(post?.tags.join(", ") ?? "");
    const [status, setStatus] = useState<"draft" | "published">(
        (post?.status as "draft" | "published") ?? "draft"
    );

    const createMutation = useCreatePost({
        mutationConfig: {
            onSuccess: (data) => {
                onSaved?.(data);
                onClose();
            },
        },
    });

    const updateMutation = useUpdatePost({
        mutationConfig: {
            onSuccess: (data) => {
                onSaved?.(data);
                onClose();
            },
        },
    });

    const isLoading = createMutation.isPending || updateMutation.isPending;
    const error = createMutation.error || updateMutation.error;

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    const handleSave = () => {
        const tags = tagsInput
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        if (post) {
            const data: UpdateBlogPostRequest = {};
            if (title !== post.title) data.title = title;
            if (content !== post.content) data.content = content;
            if (excerpt !== (post.excerpt ?? "")) data.excerpt = excerpt;
            if (status !== post.status) data.status = status;
            if (JSON.stringify(tags) !== JSON.stringify(post.tags)) data.tags = tags;
            updateMutation.mutate({ id: post.id, data });
        } else {
            const data: CreateBlogPostRequest = { title, content, status, tags, excerpt };
            createMutation.mutate(data);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 backdrop-blur-sm p-4 pt-16">
            <Card className="w-full max-w-4xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{post ? "Edit Post" : "New Post"}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X size={18} />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded">
                            {error instanceof Error ? error.message : "Failed to save post"}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Post title"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Input
                            id="excerpt"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            placeholder="Short description for previews"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags (comma-separated)</Label>
                            <Input
                                id="tags"
                                value={tagsInput}
                                onChange={(e) => setTagsInput(e.target.value)}
                                placeholder="go, architecture, backend"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2" data-color-mode="auto">
                        <Label>Content (Markdown)</Label>
                        <MDEditor
                            value={content}
                            onChange={(val) => setContent(val ?? "")}
                            height={400}
                            preview="live"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading || !title.trim() || !content.trim()}>
                        {isLoading ? "Saving..." : post ? "Update" : "Create"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};
