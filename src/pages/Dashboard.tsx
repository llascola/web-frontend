import { useAuth } from "@/features/auth";
import { DashboardNav, StatusWidget, ImageUploadCard } from "@/features/dashboard";

const Dashboard = () => {
    const { logout } = useAuth();

    return (
        <div className="min-h-screen bg-background p-8">
            <DashboardNav onLogout={logout} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatusWidget title="Server Status">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                        <p className="font-medium">System Online</p>
                    </div>
                </StatusWidget>

                <StatusWidget title="Database">
                    <p className="text-2xl font-bold">128ms</p>
                    <p className="text-xs text-muted-foreground">Average Query Time</p>
                </StatusWidget>

                <StatusWidget title="Uptime">
                    <p className="text-2xl font-bold">99.9%</p>
                    <p className="text-xs text-muted-foreground">Last 30 Days</p>
                </StatusWidget>

                <ImageUploadCard />
            </div>
        </div>
    );
};

export default Dashboard;
