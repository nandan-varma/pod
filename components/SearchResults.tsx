import { Podcast, PodcastList } from "./Podcast";
import { useEffect, useState } from "react";
import { searchPodcasts } from "@/lib/search";

export function SearchResults({ searchTerm }: { searchTerm: string }) {
    const [podcasts, setPodcasts] = useState<Podcast[]>();
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const fetchData = async () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(async () => {
                setPodcasts(await searchPodcasts(searchTerm));
            }, 300);
        };
        fetchData();
        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchTerm]);
    return (
        <>
            {podcasts  ?
                <>
                    <h3 className="text-2xl font-bold">Searching for {'"'}{searchTerm}{'"'} in podcasts</h3>
                    <PodcastList podcasts={podcasts}/>
                </>
                : "Loading..."}
        </>
    )
}