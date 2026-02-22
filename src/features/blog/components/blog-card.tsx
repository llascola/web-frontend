import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TypographyH3, TypographyMuted } from "@/components/ui/typography";
import type { BlogPost } from "../config/posts";

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
    if (post.isFeatured) {
        return (
            <Card className="md:col-span-2 overflow-hidden bg-card border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <CardHeader className="bg-muted/30 border-b border-border">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-primary">Featured</span>
                        <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                    <TypographyH3 className="text-2xl group-hover:text-primary transition-colors">{post.title}</TypographyH3>
                </CardHeader>
                <CardContent className="prose prose-slate dark:prose-invert max-w-none p-6">
                    <div className="max-h-60 overflow-hidden relative">
                        {post.Component && <post.Component />}
                        {/* Dynamic gradient that respects the theme (from-card) */}
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent pointer-events-none"></div>
                    </div>
                    <div className="mt-6 text-center">
                        <Button asChild variant="link" className="gap-2 group/btn">
                            <a href={post.link}>
                                Read Full Article
                                <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-card border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
            <CardHeader className="flex-none">
                <span className="text-sm text-muted-foreground mb-2 block">{post.date}</span>
                <TypographyH3 className="group-hover:text-primary transition-colors line-clamp-2">{post.title}</TypographyH3>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
                <TypographyMuted className="mb-6 line-clamp-3">
                    {post.excerpt}
                </TypographyMuted>
                <div className="mt-auto">
                    <Button asChild variant="link" className="p-0 h-auto gap-2 group/btn">
                        <a href={post.link}>
                            Read More
                            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
