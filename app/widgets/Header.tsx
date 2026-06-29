import Tab from "../shared/ui/Tabs";
import SearchBar from "../shared/ui/SearchBar";
import UserAvatar from "../shared/ui/UserAvatar";

export default function Header() {
  return (
    <header className="flex justify-center px-6 h-18 border-b border-gray-500/20 ">
      <div className="flex h-full font-inter min-w-7xl">
        <div id="logo" className="self-center">
          <h2 className="font-title text-3xl text-amber-400">CINEHUB</h2>
        </div>

        {/*Tabs*/}
        <div className="flex h-full gap-6 pl-8 font-medium text-sm">
          <Tab isLinkTab={true} content="Discover" href="/" />
          <Tab isLinkTab={true} content="Movies" href="/movies" />
          <Tab isLinkTab={true} content="TV shows" href="/tv-shows" />
          <Tab isLinkTab={true} content="Watchlist" href="/watchlist" />
        </div>

        {/*Right Side of Header*/}
        <div className="flex items-center justify-center gap-4 ml-auto">
          {/*SearchBar, UserAvatar Components*/}
          <SearchBar />
          <UserAvatar />
        </div>
      </div>
    </header>
  );
}
