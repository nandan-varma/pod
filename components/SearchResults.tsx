import { Podcast, PodcastList, PodcastListSkeleton } from "./Podcast";
import { useEffect, useState } from "react";
import { searchPodcasts } from "@/lib/search";

export function SearchResults({ searchTerm }: { searchTerm: string }) {
    const [podcasts, setPodcasts] = useState<Podcast[]>();
    useEffect(() => {
        setPodcasts(undefined);
        const fetchData = async () => {
            setPodcasts(await searchPodcasts(searchTerm));
        };
        fetchData();
    }, [searchTerm]);
    return (
        <>
            {podcasts?.length === 0 ?
                <h3 className="text-2xl font-bold">No results found for {searchTerm} </h3>
                :
                <>
                    <h3 className="text-2xl font-bold">Search results for {searchTerm} </h3>
                    {podcasts ?
                        <PodcastList podcasts={podcasts} />
                        : <PodcastListSkeleton length={5} />
                    }
                </>
            }
        </>
    )
}