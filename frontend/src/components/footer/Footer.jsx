import React from "react";
import { Link } from "react-router-dom";
import { CITIES } from "../../utils/cities";

const Column = ({ title, links }) => (
   <nav aria-label={title} className="flex flex-col gap-2.5 text-sm">
      <span className="font-bold text-ink">{title}</span>
      {links.map(([label, to]) => (
         <Link key={label} to={to} className="text-muted hover:text-ink hover:underline">
            {label}
         </Link>
      ))}
   </nav>
);

function Footer() {
   return (
      <footer className="border-t border-[#efd3c1] bg-blush px-4 pb-7 pt-14 text-muted sm:px-8">
         <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
               <div className="flex flex-col gap-3">
                  <Link to="/" className="flex items-center gap-2.5">
                     <img src="/uraan.png" alt="" className="h-9 w-9 rounded-lg bg-white object-contain p-0.5" />
                     <span className="font-display text-xl font-bold text-ink">URAAN</span>
                  </Link>
                  <p className="m-0 text-sm leading-relaxed">
                     Local services and skill courses from people in your city.
                  </p>
               </div>
               <Column
                  title="Explore"
                  links={[
                     ["All services", "/gigs"],
                     ["Courses", "/courses"],
                     ["Blog", "/blog"],
                     ["How it works", "/#how-it-works"],
                     ["Our team", "/#terminals"],
                  ]}
               />
               <Column
                  title="For providers"
                  links={[
                     ["Post a service", "/add"],
                     ["Create a course", "/addcourse"],
                     ["Manage orders", "/orders"],
                  ]}
               />
               <Column
                  title="Account"
                  links={[
                     ["Log in", "/login"],
                     ["Create an account", "/register"],
                     ["Messages", "/messages"],
                  ]}
               />
            </div>
            <div className="flex flex-wrap justify-between gap-3 border-t border-[#e2c6b4] pt-5 text-[13px]">
               <span>© {new Date().getFullYear()} URAAN</span>
               <span className="flex flex-wrap gap-x-3">
                  {CITIES.map((c) => (
                     <Link key={c} to={`/gigs/country/${c}`} className="hover:text-ink hover:underline">
                        {c}
                     </Link>
                  ))}
               </span>
            </div>
         </div>
      </footer>
   );
}

export default Footer;
