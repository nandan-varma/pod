'use server'
import { Podcast } from "@/components/Podcast";
import { createClient } from "@/utils/supabase/server";

export async function searchPodcasts(searchTerm: string){
    const supabase = await createClient();
    const { data, error } = await supabase.from('podcasts').select().textSearch('name', searchTerm, { type: 'plain', config: 'english' });
    return (data as Podcast[]);
}