import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PortfolioSection from "@/components/PortfolioSection";
import BlogSection from "@/components/BlogSection";

// --- PAGE 1: The Public Portfolio ---
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

// --- PAGE 2: The Private Dashboard ---
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Backend Control Center</h2>
        <Link to="/">
          <Button variant="ghost">← Back to Portfolio</Button>
        </Link>
      </nav>

      {/* Grid Layout for GUI Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Widget 1: Server Status */}
        <Card>
          <CardHeader>
            <CardTitle>Server Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <p className="font-medium">System Online</p>
            </div>
          </CardContent>
        </Card>

        {/* Widget 2: Database */}
        <Card>
          <CardHeader>
            <CardTitle>Database</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">128ms</p>
            <p className="text-xs text-slate-500">Average Query Time</p>
          </CardContent>
        </Card>

        {/* Widget 3: Uptime */}
        <Card>
          <CardHeader>
            <CardTitle>Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">99.9%</p>
            <p className="text-xs text-slate-500">Last 30 Days</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// --- MAIN APP: Routing Logic ---
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
