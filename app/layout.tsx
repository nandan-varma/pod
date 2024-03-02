import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { AudioPlayerProvider } from "@/components/AudioPlayerContext";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Podcasts App",
  description: "A podcast app made with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <AudioPlayerProvider>
          {children}
          </AudioPlayerProvider>
        <footer className="w-full mb-24 border-t border-t-foreground/10 p-8 flex justify-center text-center text-md">
        <p>
          made by {" "}
          <a
            href="https://github.com/thebrosProj"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            TheBrosProj
          </a>
        </p>
      </footer>
        </main>
      </body>
    </html>
  );
}
