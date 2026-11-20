import "../globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { QueryProvider } from "./providers/QueryClientProvider";
import { RQDevtools } from "./providers/TanstackDevToolsProvider";
import { bebasNeue, inter } from "../shared/fonts";

export const metadata: Metadata = {
  title: "CINEHUB - Discover",
  description: "CineHub is a movie discovery and watchlist app built with Next.js, React, and TypeScript. Search movies, explore trending titles, and keep track of your personal watchlist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex mx-auto flex-col">
        <QueryProvider>
          {process.env.NODE_ENV === "development" && <RQDevtools />}
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}