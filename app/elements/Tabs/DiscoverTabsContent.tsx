import Link from "next/link";

interface DiscoverTabContentProps {
  title: string;
  path: string;
  CardComponent: React.ReactNode;
}

export default function DiscoverTabContent({ title, path, CardComponent }: DiscoverTabContentProps) {
  return (
    <>
      <div className="flex items-center justify-between font-bold pt-6 pb-4">
        <h1 className="text-2xl">{title}</h1>
        <Link className="text-amber hover:underline" href={path}>
          View all
        </Link>
      </div>
      {CardComponent}
    </>
  );
}
