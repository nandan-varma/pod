'use server'
import HomeButton from "@/components/HomeButton";
import AuthButton from "../components/AuthButton";
import Header from "@/components/Header";

export default async function Index() {
  // const supabase = createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/login");
  // }
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <HomeButton />
          <AuthButton />
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-2 max-w-4xl px-3 text-center">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Podcasts App</h2>
          <p className="text-lg">
            A podcast app made with Next.js and Supabase
          </p>
          <h3 className="text-2xl font-bold p-8">Login to continue</h3>
        </main>
      </div>
    </div>
  );
}
