import React from "react";
import { Link } from "react-router-dom";
import { sortedPosts } from "../../data/blogPosts";
import BlogCard from "../blogCard/BlogCard";
import { btn } from "../ui/styles";

// Home page: the three newest articles
export const FeatureBlog = () => (
   <section id="blog" className="px-4 py-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-7">
         <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-col gap-2">
               <h2 className="m-0 font-display text-3xl font-bold sm:text-4xl">Featured blog posts</h2>
               <p className="m-0 text-base text-muted">Tips for hiring, earning and learning in your city.</p>
            </div>
            <Link to="/blog" className={btn.secondary}>
               View all posts
            </Link>
         </div>
         <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sortedPosts()
               .slice(0, 3)
               .map((post) => (
                  <BlogCard key={post.slug} post={post} />
               ))}
         </div>
      </div>
   </section>
);
