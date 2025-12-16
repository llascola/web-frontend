import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const Dashboard = () => {
    const { token, logout } = useAuth();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadUrl, setUploadUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            setError(null);
            setUploadUrl(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select a file first.");
            return;
        }

        setUploading(true);
        setError(null);
        setUploadUrl(null);

        const formData = new FormData();
        formData.append("file", selectedFile);

        console.log("Sending token:", token);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/upload-image`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                console.log("Upload failed with status:", response.status);
                const data = await response.json();
                console.log("Error response body:", data);
                throw new Error(data.error || "Failed to upload image");
            }

            const data = await response.json();
            setUploadUrl(data.url);
            setSelectedFile(null);
        } catch (err: any) {
            setError(err.message || "An error occurred during upload.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            {/* Top Navigation */}
            <nav className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Backend Control Center</h2>
                <div className="flex gap-4">
                    <Link to="/">
                        <Button variant="ghost">← Back to Portfolio</Button>
                    </Link>
                    <Button variant="destructive" onClick={logout}>Logout</Button>
                </div>
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

                {/* Widget 4: Image Upload */}
                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Upload Image</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="picture">Picture</Label>
                            <Input id="picture" type="file" onChange={handleFileChange} accept="image/*" />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        {uploadUrl && (
                            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                                <p className="text-sm text-green-600 font-medium">Upload Successful!</p>
                                <a href={uploadUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 underline break-all">
                                    {uploadUrl}
                                </a>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleUpload} disabled={!selectedFile || uploading}>
                            {uploading ? "Uploading..." : "Upload"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
