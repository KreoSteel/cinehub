import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Header from "./widgets/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThemeProvider } from "@/app/shared/shadcn-ui/theme-provider";
import { QueryProvider } from "./(app)/providers/QueryClientProvider";
import { RQDevtools } from "./(app)/providers/TanstackDevToolsProvider";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter-custom",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

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
          {process.env.NODE_ENV === "development" &&
            <RQDevtools />
          }
          <Header />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
