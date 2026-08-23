"use client";
import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import Button from "@/app/shared/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4 px-6">
      <p className="text-amber font-bold text-sm">SOMETHING WENT WRONG</p>
      <h1 className="font-title text-5xl">This scene wouldn&apos;t load</h1>
      <p className="text-muted-foreground font-inter max-w-md">
        {process.env.NODE_ENV === "development"
          ? error.message
          : "We couldn't load this page. It might be a temporary connection issue."}
      </p>
      <Button
        onClick={() => reset()}
        className="mt-2 text-black bg-amber hover:bg-amber/90"
        Icon={<RotateCcw size={18} />}
        text="Try again"
      />
    </div>
  );
}