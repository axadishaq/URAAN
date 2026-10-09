import React from "react";
import { Link } from "react-router-dom";
import { CITIES, CITY_PHOTOS } from "../../utils/cities";
import { Picture } from "../ui/ui";

export const FeatureCities = () => {
   return (
      <section className="px-4 pb-20">
         <div className="mx-auto flex max-w-[1200px] flex-col gap-7">
            <h2 className="m-0 font-display text-3xl font-bold sm:text-4xl">Featured Cities</h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
               {CITIES.map((city) => (
                  <Link
                     key={city}
                     to={`/gigs/country/${city}`}
                     className="group relative flex h-56 items-end overflow-hidden rounded-[18px] bg-sand sm:h-60">
                     <Picture
                        src={CITY_PHOTOS[city]}
                        className="absolute inset-0 h-full w-full transition-transform duration-300 group-hover:scale-105"
                     />
                     <span className="relative m-4 flex flex-col gap-0.5 rounded-xl bg-white px-4 py-3 shadow-[0_6px_18px_rgba(43,13,7,0.12)]">
                        <span className="font-display text-2xl font-bold text-ink">{city}</span>
                        <span className="text-sm font-semibold text-clay">Services and courses →</span>
                     </span>
                  </Link>
               ))}
            </div>
         </div>
      </section>
   );
};
