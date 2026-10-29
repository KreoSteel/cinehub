import Button from "@/app/shared/ui/Button";
import { Plus, Globe } from "lucide-react";
import Link from "next/link";

interface MediaDetailsActionsProps {
  homepage: string;
}

export default function MediaDetailsActions({ homepage }: MediaDetailsActionsProps) {
  return (
    <div className="flex items-center gap-4">
      <Button className="transition-all duration-350 text-black bg-white shadow-white/30 shadow-md hover:shadow-amber/30 hover:shadow-lg hover:bg-amber text-sm">
        Mark as watched
      </Button>
      <Button className="text-white bg-surface-2 shadow-surface-2 shadow-md hover:shadow-surface-2 hover:shadow-lg border border-white/20 hover:bg-white/15 text-sm">
        <Plus size={18} />
        <p>Add to Watchlist</p>
      </Button>
      <Link href={homepage || "#"}>
        <Button
          className="text-white/70 border border-white/10 hover:bg-white/10 hover:text-white text-sm">
          <Globe size={18} />
          <p>Website</p>
        </Button>
      </Link>
    </div>
  );
}