import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogPostList } from "@/features/blog";

const Blog = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <BlogPostList />
            <Footer />
        </div>
    );
};

export default Blog;
