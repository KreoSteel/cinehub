"use client"
import Tab from "../shared/ui/Tabs";
import SearchBar from "../features/SearchBar/ui/SearchBar";
import Link from "next/link";
import MobileNav from "../elements/MobileNav/MobileNav";
import { useIsMobile } from "@/app/shared/hooks/use-mobile";

export default function Header() {
  const isMobile = useIsMobile()

  return (
    <header className="sticky w-full top-0 z-10 bg-background/80 flex justify-center px-6 h-18 border-b border-gray-500/20">
      <div className="flex justify-between h-full font-inter w-screen max-w-7xl px-6">
        <div className="flex flex-row">
          <Link href="/" id="logo" className="self-center">
            <h2 className="font-title text-3xl text-amber-400">CINEHUB</h2>
          </Link>

          <div className="md:flex hidden h-full gap-6 pl-8 font-medium text-sm">
            <Tab isLinkTab={true} content="Discover" href="/" />
            <Tab isLinkTab={true} content="Movies" href="/movies?page=1" />
            <Tab isLinkTab={true} content="TV shows" href="/tv-shows" />
            <Tab isLinkTab={true} content="Watchlist" href="/watchlist" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <SearchBar className="hidden md:block" />
          {isMobile && <MobileNav />}
        </div>
      </div>
    </header>
  );
}
