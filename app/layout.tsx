import { UniverseProvider } from "@/components/providers/UniverseProvider";
import { AppShell } from "@/components/shell/AppShell";
import { FilmGrain } from "@/components/immersive/FilmGrain";
import { getAllSearchItems } from "@/lib/search/index";
import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Breaking Bad Universe",
    template: "%s · Breaking Bad Universe",
  },
  description:
    "Interactive 3D knowledge graph of the Breaking Bad and Better Call Saul universe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchItems = getAllSearchItems();

  return (
    <html
      lang="en"
      className={`${bebas.variable} ${dmSans.variable} h-full antialiased dark`}
      data-universe="breaking-bad"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <FilmGrain />
        <UniverseProvider>
          <AppShell searchItems={searchItems}>{children}</AppShell>
        </UniverseProvider>
      </body>
    </html>
  );
}
