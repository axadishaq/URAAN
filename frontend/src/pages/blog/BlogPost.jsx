import React from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { Lightbulb, ArrowLeft } from "lucide-react";
import { getPost, readMinutes, sortedPosts } from "../../data/blogPosts";
import BlogCard from "../../components/blogCard/BlogCard";
import { Badge, Breadcrumb, EmptyState } from "../../components/ui/ui";
import { btn } from "../../components/ui/styles";

const Block = ({ block }) => {
   switch (block.type) {
      case "h2":
         return <h2 className="mb-0 mt-4 font-display text-2xl font-bold">{block.text}</h2>;
      case "list":
         return (
            <ul className="m-0 flex list-disc flex-col gap-2 pl-6 marker:text-clay">
               {block.items.map((item) => (
                  <li key={item}>{item}</li>
               ))}
            </ul>
         );
      case "steps":
         return (
            <ol className="m-0 flex list-decimal flex-col gap-2 pl-6 marker:font-bold marker:text-clay">
               {block.items.map((item) => (
                  <li key={item} className="pl-1">
                     {item}
                  </li>
               ))}
            </ol>
         );
      case "tip":
         return (
            <aside className="flex gap-3.5 rounded-2xl bg-blush p-5">
               <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-clay">
                  <Lightbulb size={20} aria-hidden="true" />
               </span>
               <span className="flex flex-col gap-1">
                  <strong className="text-base">{block.title}</strong>
                  <span className="text-[15px] leading-relaxed text-[#3e2219]">{block.text}</span>
               </span>
            </aside>
         );
      case "image":
         return (
            <figure className="m-0 flex flex-col gap-2">
               <img src={block.src} alt={block.alt} loading="lazy" className="w-full rounded-2xl object-cover" />
               {block.caption && <figcaption className="text-center text-sm text-muted">{block.caption}</figcaption>}
            </figure>
         );
      default:
         return <p className="m-0">{block.text}</p>;
   }
};

const BlogPost = () => {
   const { slug } = useParams();
   const post = getPost(slug);

   if (!post)
      return (
         <div className="mx-auto max-w-xl px-4 py-16">
            <EmptyState
               title="Post not found"
               text="It may have been moved or renamed."
               action={
                  <Link to="/blog" className={btn.secondary}>
                     Back to the blog
                  </Link>
               }
            />
         </div>
      );

   const related = sortedPosts()
      .filter((p) => p.slug !== post.slug)
      .sort((a, b) => (b.category === post.category) - (a.category === post.category))
      .slice(0, 3);

   return (
      <div className="bg-cream">
         <article className="mx-auto flex max-w-[780px] flex-col gap-6 px-4 pb-12 pt-8 sm:px-5">
            <Breadcrumb
               items={[
                  { label: "Blog", to: "/blog" },
                  { label: post.category, to: `/blog?category=${encodeURIComponent(post.category)}` },
                  { label: post.title },
               ]}
            />
            <header className="flex flex-col gap-4">
               <Badge className="self-start">{post.category}</Badge>
               <h1 className="m-0 font-display text-3xl font-bold leading-tight tracking-tight sm:text-[44px]">{post.title}</h1>
               <p className="m-0 text-lg leading-relaxed text-muted">{post.excerpt}</p>
               <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                  <span className="flex items-center gap-2">
                     <img src="/uraan.png" alt="" className="h-7 w-7 rounded-full bg-white object-contain p-0.5" />
                     <strong className="text-ink">{post.author}</strong>
                  </span>
                  <span>·</span>
                  <time dateTime={post.date}>{moment(post.date).format("D MMMM YYYY")}</time>
                  <span>·</span>
                  <span>{readMinutes(post)} min read</span>
               </div>
            </header>
            <img
               src={post.cover.src}
               alt={post.cover.alt}
               className="h-60 w-full rounded-2xl object-cover sm:h-[400px]"
            />
            <div className="flex flex-col gap-5 text-[17px] leading-[1.75] text-[#3e2219]">
               {post.body.map((block, i) => (
                  <Block key={i} block={block} />
               ))}
            </div>

            {post.cta && (
               <div className="mt-2 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white p-6">
                  <div className="flex flex-col gap-1">
                     <strong className="text-lg">Ready to get started?</strong>
                     <span className="text-[15px] text-muted">Find people in your city on URAAN.</span>
                  </div>
                  <Link to={post.cta.to} className={btn.primary}>
                     {post.cta.text}
                  </Link>
               </div>
            )}

            <Link to="/blog" className="flex items-center gap-2 self-start text-[15px] font-semibold text-clay hover:underline">
               <ArrowLeft size={18} aria-hidden="true" />
               All posts
            </Link>
         </article>

         <section className="border-t border-line px-4 py-14">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
               <h2 className="m-0 font-display text-2xl font-bold sm:text-3xl">Keep reading</h2>
               <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {related.map((p) => (
                     <BlogCard key={p.slug} post={p} />
                  ))}
               </div>
            </div>
         </section>
      </div>
   );
};

export default BlogPost;
