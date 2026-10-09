import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { readMinutes } from "../../data/blogPosts";
import { Badge, Picture } from "../ui/ui";

// `large` shows the cover beside the text (used for the featured post)
const BlogCard = ({ post, large = false }) => (
   <Link
      to={`/blog/${post.slug}`}
      className={`group flex overflow-hidden rounded-2xl border border-line bg-white text-ink transition-shadow hover:shadow-[0_10px_28px_rgba(43,13,7,0.10)] ${
         large ? "flex-col md:flex-row" : "flex-col"
      }`}>
      <Picture
         src={post.cover.src}
         alt={post.cover.alt}
         className={large ? "h-56 w-full md:h-auto md:min-h-[300px] md:w-1/2" : "h-48 w-full"}
      />
      <div className={`flex flex-1 flex-col gap-3 ${large ? "p-6 md:p-8" : "p-5"}`}>
         <Badge className="self-start">{post.category}</Badge>
         <h3 className={`m-0 font-semibold leading-snug group-hover:underline ${large ? "font-display text-2xl md:text-3xl" : "text-lg"}`}>
            {post.title}
         </h3>
         <p className={`m-0 leading-relaxed text-muted ${large ? "text-base" : "line-clamp-3 text-[15px]"}`}>{post.excerpt}</p>
         <div className="flex-1" />
         <span className="text-[13px] text-muted">
            {moment(post.date).format("D MMMM YYYY")} · {readMinutes(post)} min read
         </span>
      </div>
   </Link>
);

export default BlogCard;
