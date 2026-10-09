import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { CITIES } from "../../utils/cities";

const POPULAR = [
   ["Technician", "/gigs?category=Technicion"],
   ["Household", "/gigs?category=Household"],
   ["Repairing", "/gigs?search=repair"],
   ["Tailoring", "/gigs?category=Clothing"],
];

function Featured() {
   const [search, setSearch] = useState("");
   const [city, setCity] = useState("");
   const navigate = useNavigate();

   const handleSearch = (e) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (city) params.set("country", city);
      navigate(`/gigs?${params.toString()}`);
   };

   return (
      <section className="hero-pattern px-4 pb-20 pt-20 sm:pt-24">
         <div className="mx-auto flex max-w-[820px] flex-col items-center gap-6 text-center">
            <h1 className="m-0 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
               Find the Service You Need
            </h1>
            <p className="m-0 max-w-[620px] text-lg leading-relaxed text-muted">
               Explore local services and skill courses with all the information you need. It's your
               future. Come find it.
            </p>

            <form
               role="search"
               onSubmit={handleSearch}
               className="flex w-full flex-wrap gap-2 rounded-2xl bg-white p-2.5 shadow-[0_10px_30px_rgba(43,13,7,0.10)]">
               <label className="flex h-[54px] flex-[2_1_240px] items-center gap-2.5 rounded-[10px] bg-cream px-3.5">
                  <Search size={20} className="text-subtle" aria-hidden="true" />
                  <span className="sr-only">Service or keyword</span>
                  <input
                     type="text"
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder="Service or keyword, e.g. AC repair"
                     className="min-w-0 flex-1 bg-transparent text-base text-ink placeholder:text-subtle focus:outline-none"
                  />
               </label>
               <label className="flex h-[54px] flex-[1_1_170px] items-center gap-2.5 rounded-[10px] bg-cream px-3.5">
                  <MapPin size={20} className="text-subtle" aria-hidden="true" />
                  <span className="sr-only">City</span>
                  <select
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                     className="min-w-0 flex-1 bg-transparent text-base text-ink focus:outline-none">
                     <option value="">Any city</option>
                     {CITIES.map((c) => (
                        <option key={c}>{c}</option>
                     ))}
                  </select>
               </label>
               <button
                  type="submit"
                  className="h-[54px] flex-[0_0_auto] rounded-[10px] bg-ink px-8 text-base font-semibold text-white hover:bg-[#4a1e14]">
                  Search
               </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2">
               <span className="mr-1 text-sm text-muted">Popular searches:</span>
               {POPULAR.map(([label, to]) => (
                  <Link
                     key={label}
                     to={to}
                     className="rounded-full border border-[#e2c6b4] bg-white px-3.5 py-2 text-sm text-ink hover:border-ink">
                     {label}
                  </Link>
               ))}
            </div>
         </div>
      </section>
   );
}

export default Featured;
