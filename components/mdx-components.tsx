import Image from "next/image";
import Link from "next/link";
import * as runtime from "react/jsx-runtime";
import { Callout } from "./callout";
import { cn } from "@/lib/utils";
import YouTubeEmbed from "./yt-embed";
import InstagramEmbed from "./ig-embed";

// Helper function to check if a URL is external
const isExternalLink = (href: string) => {
  return href.startsWith("http") || href.startsWith("https");
};

// Custom link component
const CustomLink = ({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isExternal = href ? isExternalLink(href) : false;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return href ? (
    <Link href={href} {...props}>
      {children}
    </Link>
  ) : null;
};

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Callout,
  YouTubeEmbed,
  InstagramEmbed,
  a: CustomLink,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
