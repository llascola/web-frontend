import { useState } from "react";
import { useUploadImage } from "../api/use-upload-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export const ImageUploadCard = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const uploadMutation = useUploadImage({
        mutationConfig: {
            onSuccess: () => {
                setSelectedFile(null);
            },
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            uploadMutation.reset();
        }
    };

    const handleUpload = () => {
        if (!selectedFile) return;
        uploadMutation.mutate(selectedFile);
    };

    return (
        <Card className="md:col-span-3">
            <CardHeader>
                <CardTitle>Upload Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input id="picture" type="file" onChange={handleFileChange} accept="image/*" />
                </div>
                {uploadMutation.isError && (
                    <p className="text-sm text-destructive">
                        {uploadMutation.error instanceof Error ? uploadMutation.error.message : "Upload failed"}
                    </p>
                )}
                {uploadMutation.isSuccess && uploadMutation.data && (
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-md">
                        <p className="text-sm text-primary font-medium">Upload Successful!</p>
                        <a href={uploadMutation.data.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline break-all">
                            {uploadMutation.data.url}
                        </a>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <Button onClick={handleUpload} disabled={!selectedFile || uploadMutation.isPending}>
                    {uploadMutation.isPending ? "Uploading..." : "Upload"}
                </Button>
            </CardFooter>
        </Card>
    );
};
