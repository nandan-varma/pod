'use client'
import { useAudioPlayer } from "./AudioPlayerContext"
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export type Podcast = {
    id: number;
    name: string;
    author: string;
    duration: number;
    downloadurl: string;
    date_of_creation: string;
};

export function Podcast({ podcastData }: { podcastData: Podcast }) {
    const { setCurrentUrl } = useAudioPlayer();

    return (
        <>
            <TableRow>
                <TableCell>{podcastData.name}</TableCell>
                <TableCell>{podcastData.author}</TableCell>
                <TableCell>{podcastData.duration}</TableCell>
                <TableCell><Button onClick={()=>{setCurrentUrl(podcastData.downloadurl)}}>Play</Button></TableCell>
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
                    <Podcast key={podcast.id} podcastData={podcast} />
                ))}
            </TableBody>
        </Table>
    )
}