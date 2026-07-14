import { UniverseProvider } from "@/components/providers/UniverseProvider";
import { AppShell } from "@/components/shell/AppShell";
import { getAllSearchItems } from "@/lib/search/index";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Breaking Bad Universe",
    template: "%s · Breaking Bad Universe",
  },
  description:
    "A living knowledge graph of the Breaking Bad and Better Call Saul universe.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <UniverseProvider>
          <AppShell searchItems={searchItems}>{children}</AppShell>
        </UniverseProvider>
      </body>
    </html>
  );
}
