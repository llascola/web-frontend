import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// --- PAGE 1: The Public Portfolio ---
const Portfolio = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-10">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
          Hi, I'm <span className="text-blue-600">Llascola</span>
        </h1>
        <p className="text-xl text-slate-600">
          Full Stack Go Developer | Systems Architect
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <Button variant="default">Download Resume</Button>
          <Link to="/dashboard">
            <Button variant="outline">View Backend GUI</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- PAGE 2: The Private Dashboard ---
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