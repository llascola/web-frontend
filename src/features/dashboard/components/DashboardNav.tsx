import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DashboardNavProps {
    onLogout: () => void;
}

export const DashboardNav = ({ onLogout }: DashboardNavProps) => {
    return (
        <nav className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Backend Control Center</h2>
            <div className="flex gap-4">
                <Link to="/">
                    <Button variant="ghost">← Back to Portfolio</Button>
                </Link>
                <Button variant="destructive" onClick={onLogout}>Logout</Button>
            </div>
        </nav>
    );
};
