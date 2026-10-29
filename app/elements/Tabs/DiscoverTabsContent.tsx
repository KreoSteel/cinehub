import Link from "next/link";

interface DiscoverTabContentProps {
  title: string;
  path: string;
  Carousel?: React.ReactNode;
}

export default function DiscoverTabContent({ title, path, Carousel }: DiscoverTabContentProps) {
  return (
    <>
      <div className="flex items-center justify-between font-bold px-4 md:px-0 pt-6 md:pt-0 pb-4">
        <h1 className="text-xl md:text-2xl">{title}</h1>
        <Link className="text-amber hover:underline text-xs md:text-sm" href={path}>
          View all
        </Link>
      </div>
      {Carousel}
    </>
  );
}
