import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { blogPosts } from "../config/posts";
import { BlogCard } from "./blog-card";

const BlogSection = () => {
    return (
        <section id="blog" className="py-20 bg-muted/50">
            <Container>
                <SectionHeader
                    title="Latest Articles"
                    description="Thoughts on technology, software architecture, and development best practices."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {blogPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default BlogSection;
