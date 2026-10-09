import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BLOG_CATEGORIES, sortedPosts } from "../../data/blogPosts";
import BlogCard from "../../components/blogCard/BlogCard";
import { Breadcrumb, EmptyState, PageTitle } from "../../components/ui/ui";

const Blog = () => {
   const [params] = useSearchParams();
   const category = params.get("category") || "";
   const posts = sortedPosts().filter((p) => !category || p.category === category);
   // the newest post is featured on the "All" tab
   const [featured, ...rest] = category ? [null, ...posts] : posts;

   const tab = (on) =>
      `flex h-10 items-center rounded-[9px] px-4 text-sm font-semibold ${on ? "bg-ink text-white" : "text-ink hover:bg-white"}`;

   return (
      <div className="bg-cream">
         <div className="mx-auto flex max-w-[1200px] flex-col gap-7 px-4 pb-16 pt-8 sm:px-5">
            <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Blog" }]} />
            <PageTitle
               title="URAAN Blog"
               text="Practical tips for customers, service providers and learners."
               action={
                  <nav aria-label="Blog categories" className="flex flex-wrap gap-1.5 rounded-xl bg-[#f0e3d9] p-1">
                     <Link to="/blog" aria-current={!category ? "page" : undefined} className={tab(!category)}>
                        All
                     </Link>
                     {BLOG_CATEGORIES.map((c) => (
                        <Link
                           key={c}
                           to={`/blog?category=${encodeURIComponent(c)}`}
                           aria-current={category === c ? "page" : undefined}
                           className={tab(category === c)}>
                           {c}
                        </Link>
                     ))}
                  </nav>
               }
            />

            {posts.length === 0 ? (
               <div className="rounded-2xl border border-line bg-white">
                  <EmptyState title="No posts in this category yet" />
               </div>
            ) : (
               <>
                  {featured && <BlogCard post={featured} large />}
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                     {rest.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                     ))}
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default Blog;
