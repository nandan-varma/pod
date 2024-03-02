'use client'
import { useAudioPlayer } from "./AudioPlayerContext"
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export type Podcast = {
    id: number;
    name: string;
    author: string;
    duration: number;
    downloadurl: string;
    date_of_creation: string;
};

export function PodcastItem({ podcastData }: { podcastData: Podcast }) {
    const { setCurrentUrl } = useAudioPlayer();

    return (
        <>
            <TableRow>
                <TableCell>{podcastData.name}</TableCell>
                <TableCell>{podcastData.author}</TableCell>
                <TableCell>{podcastData.duration}</TableCell>
                <TableCell><Button onClick={() => { setCurrentUrl(podcastData.downloadurl) }}>Play</Button></TableCell>
            </TableRow>
        </>
    )
}

export function PodcastList({ podcasts }: { podcasts: Podcast[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>access</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {podcasts.map((podcast) => (
                    <PodcastItem key={podcast.id} podcastData={podcast} />
                ))}
            </TableBody>
        </Table>
    )
}

export function PodcastListSkeleton({ length }: { length: number }) {
    const skeleton = Array.from({ length: length }, (_, i) => i);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>access</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {skeleton.map((p) => (
                    <TableRow key={p}>
                        <TableCell><Skeleton className="p-4" /></TableCell>
                        <TableCell><Skeleton className="p-4" /></TableCell>
                        <TableCell><Skeleton className="p-4" /></TableCell>
                        <TableCell><Skeleton className="p-4" /></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}