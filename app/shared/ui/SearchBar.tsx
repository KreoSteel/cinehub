import { Search } from "lucide-react";

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className }: SearchBarProps) {
  return (
    <div className={`relative ${className} self-center font-inter text-muted-foreground`}>
      <input type="text" className="border-border border rounded-full py-2 pl-9.5 bg-surface text-sm
      placeholder:text-white placeholder:opacity-40 focus:border-amber focus:outline-none transition-all" placeholder="Search titles..." />
      <Search className="absolute top-0 bottom-0 left-3 m-auto opacity-55" size={18}/>
    </div>
  );
}