import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { Callout } from "./callout";
import { cn } from "@/lib/utils";
import YouTubeEmbed from "./yt-embed";
import InstagramEmbed from "./ig-embed";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Callout,
  YouTubeEmbed,
  InstagramEmbed
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
