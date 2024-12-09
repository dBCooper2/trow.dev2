import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "My Contact Info",
};

export default async function ContactPage() {
    return (
       <div className="container max-w-6xl py-6 lg:py-10">
         <div className="flex flex-col items-center gap-4 md:justify-center md:gap-8">
           <div className="flex-1 space-x-4">
             <h1 className="inline-block font-black text-4xl lg:text-5xl text-center">
               Contact
             </h1>
           </div>
         </div>
         <hr className="my-8" />
         <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
           <Link 
             href={siteConfig.links.email} 
             className="text-lg font-medium transition-colors hover:text-primary text-foreground/60"
           >
             Email
           </Link>
           <Link 
             href={siteConfig.links.linkedin} 
             className="text-lg font-medium transition-colors hover:text-primary text-foreground/60"
           >
             LinkedIn
           </Link>
           <Link 
             href={siteConfig.links.github} 
             className="text-lg font-medium transition-colors hover:text-primary text-foreground/60"
           >
             Github
           </Link>
           <Link 
             href={siteConfig.links.instagram} 
             className="text-lg font-medium transition-colors hover:text-primary text-foreground/60"
           >
             Instagram
           </Link>
         </div>
       </div>
    );
   }