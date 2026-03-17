import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button/button";
import { ArrowRight } from "lucide-react";
import { usePublishedPosts } from "../api/use-blog-posts";
import { BlogCard } from "./blog-card";

const BlogSection = () => {
    const { data, isLoading } = usePublishedPosts({ page: 1, page_size: 3 });

    return (
        <section id="blog" className="py-20 bg-muted/50">
            <Container>
                <SectionHeader
                    title="Latest Articles"
                    description="Thoughts on technology, software architecture, and development best practices."
                />

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {data?.posts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                )}

                {data && data.total > 3 && (
                    <div className="mt-12 text-center">
                        <Button asChild variant="outline" className="gap-2">
                            <Link to="/blog">
                                View All Articles
                                <ArrowRight size={16} />
                            </Link>
                        </Button>
                    </div>
                )}
            </Container>
        </section>
    );
};

export default BlogSection;
