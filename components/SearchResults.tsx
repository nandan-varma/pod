import { Podcast, PodcastList } from "./Podcast";
import { useEffect, useState } from "react";
import { searchPodcasts } from "@/lib/search";

export function SearchResults({ searchTerm }: { searchTerm: string }) {
    const [podcasts, setPodcasts] = useState<Podcast[]>();
    useEffect(() => {
        const fetchData = async () => {
            setPodcasts(await searchPodcasts(searchTerm));
        };
        fetchData();
    }, [searchTerm]);
    return (
        <>
        <p>{searchTerm}</p>
            {podcasts  ?
                <>
                    <h3 className="text-2xl font-bold">Podcasts</h3>
                    <PodcastList podcasts={podcasts}/>
                </>
                : "Loading..."}
        </>
    )
}