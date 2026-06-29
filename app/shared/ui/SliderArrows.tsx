import { ChevronRight, ChevronLeft } from "lucide-react";

interface SliderArrowProps {
  onClick?: () => void;
  className?: string;
}

export function SliderNextArrow({ onClick }: SliderArrowProps) {
  return (
    <div
      className="group-hover:opacity-100 opacity-0 absolute top-1/2 right-6 bg-surface rounded-full p-3 hover:bg-surface-2/90 transition duration-300 ease-in-out"
      onClick={onClick}
    >
      <ChevronRight />
    </div>
  );
}

export function SliderPreviousArrow({ onClick }: SliderArrowProps) {
  return (
    <div
      className="group-hover:opacity-100 opacity-0 absolute top-1/2 left-6 bg-surface hover:bg-surface-2/90 rounded-full p-3 z-10 transition duration-300 ease-in-out"
      onClick={onClick}
    >
      <ChevronLeft />
    </div>
  );
}
