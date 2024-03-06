'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type NewPodcast = {
    name: string;
    author: string;
    date_of_creation: string;
}

const getAudioDuration = async (file: File): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        const audio = new Audio();
        audio.preload = "metadata";
        audio.onloadedmetadata = () => {
            resolve(audio.duration);
        };
        audio.onerror = (error) => {
            reject(error);
        };
        audio.src = URL.createObjectURL(file);
    });
};

const getAudioDurationFromUrl = async (url: string): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        const audio = new Audio();
        audio.preload = "metadata";
        audio.onloadedmetadata = () => {
            resolve(audio.duration);
        };
        audio.onerror = (error) => {
            reject(error);
        };
        audio.src = url;
    });
}

export default function ProtectedPage() {
    const supabase = createClient();
    const router = useRouter();
    // const router = useRouter();
    useEffect(  () => {

        (async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            
            if (!user) {
                return router.push("/login");
            }

          })();
        
          return () => {
            // this now gets called when the component unmounts
          };

    }, []);

    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const [podcast, setPodcast] = useState<NewPodcast>({
        name: "",
        author: "",
        date_of_creation: new Date().toISOString(),
    });
    const [downloadurl, setDownloadurl] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file && downloadurl == "") {
            return;
        }

        setUploading(true);
        setUploadError(null);

        try {
            if (downloadurl == "" && file) {
                const { data: fileData, error: fileError } = await supabase.storage
                    .from("pods")
                    .upload(`${file.name}`, file);
                let duration = await getAudioDuration(file);

                if (fileError) {
                    throw fileError;
                }
                console.log(fileData);
                const { data: podcastData, error: podcastError } = await supabase.from("podcasts").insert({
                    ...podcast,
                    downloadurl: process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/pods/" + fileData?.path,
                    duration: Math.floor(duration),
                });
                if (podcastError) {
                    throw podcastError;
                }
                console.log(podcastData);
            }
            else {
                let duration = await getAudioDurationFromUrl(downloadurl);
                const { data: podcastData, error: podcastError } = await supabase.from("podcasts").insert({
                    ...podcast,
                    downloadurl: downloadurl,
                    duration: Math.floor(duration),
                });
                if (podcastError) {
                    throw podcastError;
                }
                console.log(podcastData);
            }
        } catch (error) {
            setUploadError((error as Error).message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="animate-in flex-1 flex flex-col gap-6 max-w-4xl px-3 p-20">
            <h1 className="text-2xl font-bold">Upload a podcast</h1>
            <Input
                type="text"
                placeholder="Name"
                onChange={(e) => setPodcast({ ...podcast, name: e.target.value })} required />
            <Input type="text" placeholder="Author" onChange={(e) => setPodcast({ ...podcast, author: e.target.value })} required />
            <Input type="file" accept=".m4a, .mp4" onChange={handleFileChange} />
            <p className="text-center">or</p>
            <Input type="link" placeholder="Link" onChange={(e) => { setDownloadurl(e.target.value) }} />
            <Button onClick={handleUpload} disabled={ uploading || podcast.name == "" || podcast.author == ""}>
                Upload
            </Button>
            {uploading && <p>Uploading...</p>}
            {uploadError && <p>Error: {uploadError}</p>}
            {uploadedUrl && <p>Uploaded URL: {uploadedUrl}</p>}
        </div>
    );
}