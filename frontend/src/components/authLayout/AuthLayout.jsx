import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Check } from "lucide-react";

const points = [
   "Book providers in your city",
   "Chat before and after you order",
   "Enroll in skill courses",
];

const tab = ({ isActive }) =>
   `flex h-11 items-center justify-center rounded-[9px] text-[15px] font-semibold ${
      isActive ? "bg-white text-ink shadow-[0_1px_2px_rgba(43,13,7,0.1)]" : "text-muted hover:text-ink"
   }`;

// Shared shell for the log in and create account pages
const AuthLayout = ({ children }) => (
   <div className="flex min-h-screen flex-wrap bg-cream">
      <aside className="hero-pattern flex flex-[1_1_380px] flex-col gap-8 px-8 py-10 text-muted sm:px-12">
         <Link to="/" className="flex items-center gap-2.5 text-ink">
            <img src="/uraan.png" alt="" className="h-10 w-10 rounded-[10px] bg-white object-contain p-0.5" />
            <span className="font-display text-2xl font-bold">URAAN</span>
         </Link>
         <div className="hidden flex-1 md:block" />
         <h2 className="m-0 font-display text-3xl font-bold leading-tight text-ink sm:text-[40px]">
            Local help and local skills, in one place.
         </h2>
         <ul className="m-0 flex list-none flex-col gap-3.5 p-0 text-base text-ink">
            {points.map((p) => (
               <li key={p} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                     <Check size={15} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {p}
               </li>
            ))}
         </ul>
      </aside>
      <main className="flex flex-[999_1_520px] justify-center px-5 py-10 sm:py-12">
         <div className="flex w-full max-w-[480px] flex-col gap-6">
            <nav aria-label="Account" className="grid grid-cols-2 gap-1 rounded-xl bg-[#f0e3d9] p-1">
               <NavLink to="/login" className={tab}>
                  Log in
               </NavLink>
               <NavLink to="/register" className={tab}>
                  Create account
               </NavLink>
            </nav>
            {children}
         </div>
      </main>
   </div>
);

export default AuthLayout;
