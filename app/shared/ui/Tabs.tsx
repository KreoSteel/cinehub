"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabProps {
  className?: string;
  content: string;
  isLinkTab?: boolean;
  href?: string
}

export default function Tabs({className, content, isLinkTab, href}: TabProps) {
  const pathname = usePathname();
  const tabStyles = (path: string) =>
    clsx(
      pathname === path
        ? "flex items-center text-white border-b-2 border-amber"
        : "h-full flex items-center text-muted-foreground hover:text-white",
    );
  
  if (isLinkTab && href !== undefined) {
    return <Link href={href} className={tabStyles(href)}>{content}</Link>
  }
  return (
    <div className={className}>{content}</div>
  );
}
