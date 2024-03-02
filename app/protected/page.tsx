'use server'
import HomeButton from "@/components/HomeButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { Podcast, PodcastList } from "@/components/Podcast";
import Player from "@/components/Player";
import { Search } from "@/components/Search";

export default async function ProtectedPage() {
  const supabase = createClient();
  const { data: podcastsData } = await supabase.from("podcasts").select();
  const podcasts = podcastsData as Podcast[];
  // console.log(podcasts);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-gray-500 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <HomeButton />
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="animate-in flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Header />
        <Search />
        <main className="flex-1 flex flex-col gap-6">
          {podcasts ?
            <>
              <h3 className="text-2xl font-bold">Podcasts</h3>
              <PodcastList podcasts={podcasts}/>
            </>
            : "Loading..."}
        </main>
      </div>
      <Player></Player>
    </div>
  );
}
