import Link from "next/link";
import { slug } from "github-slugger";
import { badgeVariants } from "./ui/badge";

interface ProjectTagProps {
  tag: string;
  current?: boolean;
  count?: number;
}
export function ProjectTag({ tag, current, count }: ProjectTagProps) {
  return (
    <Link
      className={badgeVariants({
        variant: current ? "default" : "secondary",
        className: "no-underline rounded-md",
      })}
      href={`/tags/${slug(tag)}`}
    >
      {tag} {count ? `(${count})` : null}
    </Link>
  );
}
