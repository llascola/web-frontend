import Navbar from "@/components/Navbar";
import { Hero, About, PortfolioSection } from "@/features/portfolio";
import { BlogSection } from "@/features/blog";
import Footer from "@/components/Footer";

const Portfolio = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <Hero />
            <About />
            <PortfolioSection />
            <BlogSection />
            <Footer />
        </div>
    );
};

export default Portfolio;
