import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

//LaTeX Rendering
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const posts = defineCollection({
  name: "Post",
  pattern: "articles/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).optional(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

export const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx", // You can define projects directly in a TypeScript file
  schema: s.object({
    slug: s.path(),
    title: s.string().max(99),
    description: s.string().max(999).optional(),
    date: s.isodate(),
    published: s.boolean().default(true),
    tags: s.array(s.string()).optional(),
    githubLink: s.string().url().optional(),
    demoLink: s.string().url().optional(),
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark" }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
      rehypeKatex,
    ],
    remarkPlugins: [remarkMath],
  },
});
