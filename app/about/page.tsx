import { MDXContent } from "@/components/mdx-components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { resumes } from "#site/content";
import { getMostRecentResume } from "@/lib/utils";
import { notFound } from "next/navigation";
import Image from "next/image";
const myResume = "./resume_2024_trevor-rowland.pdf";
import "@/styles/mdx.css";

export const metadata: Metadata = {
  title: "About Me",
  description: "Information about me",
};

// Add Resume Content Here...
// get all resume files as individual components
// add each as MDXContent to the Page

export default async function AboutPage() {
  const resume = getMostRecentResume(resumes);
  // replace empty return with a rendered pdf of your resume
  if (!resume) {
    return (
      <div className="container max-w-6xl py-6 lg:py-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-x-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl">
              About Me
            </h1>
          </div>
        </div>
        <hr className="my-8" />
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="min-w-48 max-w-48 flex flex-col gap-2">
            <Avatar className="h-48 w-48">
              <AvatarImage src="/avatar.png" alt={siteConfig.author} />
              <AvatarFallback>dB</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold text-center break-words">
              {siteConfig.author}
            </h2>
            <p className="text-muted-foreground text-center break-words">
              Data Analysis, Business Intelligence
            </p>
          </div>
          <div className="flex-1 w-full h-[800px]">
            <iframe
              src="/resume_2024_trevor-rowland.pdf"
              width="100%"
              height="100%"
              className="border-none"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-x-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">
            About Me
          </h1>
        </div>
      </div>
      <hr className="my-8" />
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="min-w-48 max-w-48 flex flex-col gap-2">
          <Avatar className="h-48 w-48">
            <AvatarImage src="/avatar.png" alt={siteConfig.author} />
            <AvatarFallback>dB</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-center break-words">
            {siteConfig.author}
          </h2>
          <p className="text-muted-foreground text-center break-words">
            Data Analysis, Business Intelligence
          </p>
        </div>
        <div className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
          <MDXContent code={resume.body} />
          <center>
            <h3>
              <a href={myResume} download="resume-trevor-rowland.pdf">
                Download
              </a>
            </h3>
          </center>
        </div>
      </div>
    </div>
  );
}
