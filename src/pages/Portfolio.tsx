import { Hero, About, PortfolioSection } from "@/features/portfolio";
import { BlogSection } from "@/features/blog";

const Portfolio = () => {
    return (
        <div className="min-h-screen bg-background">
            <Hero />
            <About />
            <PortfolioSection />
            <BlogSection />
        </div>
    );
};

export default Portfolio;
