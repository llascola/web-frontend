import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TypographyH3, TypographyMuted } from "@/components/ui/typography";
import type { BlogPost } from "@/lib/api";

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
    const formattedDate = new Date(post.published_at ?? post.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <Card className="bg-card border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
            <CardHeader className="flex-none">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{formattedDate}</span>
                    {post.tags.length > 0 && (
                        <div className="flex gap-1.5">
                            {post.tags.slice(0, 2).map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <TypographyH3 className="group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                </TypographyH3>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
                {post.excerpt && (
                    <TypographyMuted className="mb-6 line-clamp-3">{post.excerpt}</TypographyMuted>
                )}
                <div className="mt-auto">
                    <Button asChild variant="link" className="p-0 h-auto gap-2 group/btn">
                        <Link to={`/blog/${post.slug}`}>
                            Read More
                            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
