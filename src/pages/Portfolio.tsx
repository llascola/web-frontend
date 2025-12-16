import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PortfolioSection from "@/components/PortfolioSection";
import BlogSection from "@/components/BlogSection";

const Portfolio = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <About />
            <PortfolioSection />
            <BlogSection />

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 py-8 text-center">
                <p>&copy; {new Date().getFullYear()} Luciano Scola. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Portfolio;
