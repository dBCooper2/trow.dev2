import Link from "next/link";
import { slug } from "github-slugger";
import { badgeVariants } from "./ui/badge";

interface PostTagProps {
  tag: string;
  current?: boolean;
  count?: number;
}
export function PostTag({ tag, current, count }: PostTagProps) {
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
