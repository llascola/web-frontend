import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PortfolioSection from "@/components/PortfolioSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

const Portfolio = () => {
    return (
        <div className="min-h-screen bg-white">
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
