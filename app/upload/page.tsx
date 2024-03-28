'use client'
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function ProtectedPage() {
    // ...
    const supabase = createClient();

    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

    useEffect(  async () => {
        async function validateUser(){

            const {
                data: { user },
            } = await supabase.auth.getUser();
            
            if (!user) {
                return redirect("/login");
            }
        }
        await validateUser();

    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            return;
        }

        setUploading(true);
        setUploadError(null);

        try {
            const { data, error } = await supabase.storage
                .from("pods")
                .upload(`asdfghj`, file);

            if (error) {
                throw error;
            }

            const uploadedFileUrl = data?.path;
            setUploadedUrl(uploadedFileUrl);
        } catch (error) {
            setUploadError((error as Error).message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="animate-in flex-1 flex flex-col gap-20 max-w-4xl px-3">
            {/* create a file upload to get url from supabase storage bucket */}
            <input type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload} disabled={!file || uploading}>
                Upload
            </Button>
            {uploading && <p>Uploading...</p>}
            {uploadError && <p>Error: {uploadError}</p>}
            {uploadedUrl && <p>Uploaded URL: {uploadedUrl}</p>}
        </div>
    );
}