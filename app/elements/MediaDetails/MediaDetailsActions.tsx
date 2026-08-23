import Button from "@/app/shared/ui/Button";
import { Plus, Globe } from "lucide-react";
import Link from "next/link";

interface MediaDetailsActionsProps {
  homepage: string;
}

export default function MediaDetailsActions({ homepage }: MediaDetailsActionsProps) {
  return (
    <div className="flex items-center gap-4">
      <Button className="transition-all text-black bg-white hover:bg-amber text-sm" text={"Mark as watched"}></Button>
      <Button className="text-white bg-surface-2 border border-white/20 hover:bg-white/15 text-sm" Icon={<Plus size={18} />} text={"Add to Watchlist"}></Button>
      <Link href={homepage}>
        <Button
          className="text-white/70 border border-white/10 hover:bg-white/10 hover:text-white text-sm"
          Icon={<Globe size={18} />}
          text={"Website"}
        ></Button>
      </Link>
    </div>
  );
}