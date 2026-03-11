import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/container";
import { BlogPostDetail } from "@/features/blog";
import { usePublishedPost } from "@/features/blog/api/use-blog-posts";

const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: post, isLoading, isError } = usePublishedPost(slug ?? "");

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            {isLoading ? (
                <section className="py-32">
                    <Container className="max-w-3xl">
                        <div className="space-y-4 animate-pulse">
                            <div className="h-10 bg-muted rounded w-3/4" />
                            <div className="h-4 bg-muted rounded w-1/4" />
                            <div className="h-64 bg-muted rounded mt-8" />
                        </div>
                    </Container>
                </section>
            ) : isError || !post ? (
                <section className="py-32">
                    <Container className="max-w-3xl text-center">
                        <h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1>
                        <p className="text-muted-foreground mb-6">
                            The blog post you're looking for doesn't exist or has been removed.
                        </p>
                        <Link to="/blog" className="text-primary hover:underline">
                            Back to Blog
                        </Link>
                    </Container>
                </section>
            ) : (
                <BlogPostDetail post={post} />
            )}
            <Footer />
        </div>
    );
};

export default BlogPostPage;
