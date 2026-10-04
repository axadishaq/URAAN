import React from "react";
import { Link } from "react-router-dom";
import { SERVICE_CATEGORIES } from "../../utils/categories";
import { btn } from "../ui/styles";

// Home page category tiles (eight most useful ones)
const HOME_CATEGORIES = ["Clothing", "Technicion", "Groceries", "Household", "Electronics", "Transport", "design", "GroupHiring"];

function CatCard() {
   const tiles = HOME_CATEGORIES.map((v) => SERVICE_CATEGORIES.find((c) => c.value === v));
   return (
      <section className="px-4 py-20">
         <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
            <div className="flex flex-col gap-2.5 text-center">
               <h2 className="m-0 font-display text-3xl font-bold sm:text-4xl">Popular Service Categories</h2>
               <p className="m-0 text-base text-muted">
                  Explore services in the most popular categories across your city.
               </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
               {tiles.map(({ value, label, hint, icon: Icon }) => (
                  <Link
                     key={value}
                     to={`/gigs?category=${value}`}
                     className="group flex flex-col gap-3 rounded-2xl bg-blush p-6 text-ink transition-transform hover:-translate-y-0.5">
                     <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                        <Icon size={24} aria-hidden="true" />
                     </span>
                     <span className="text-lg font-bold">{label}</span>
                     <span className="text-sm leading-relaxed text-muted">{hint}</span>
                     <span className="text-sm font-semibold text-clay group-hover:underline">Browse services →</span>
                  </Link>
               ))}
            </div>
            <Link to="/gigs" className={`${btn.secondary} self-center`}>
               Browse all categories
            </Link>
         </div>
      </section>
   );
}
export default CatCard;
