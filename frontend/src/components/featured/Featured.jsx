import React, { useState } from "react";

import { Link, useNavigate } from "react-router";

function Featured() {
   const [search, setSearch] = useState("");
   const [location, setLocation] = useState("");
   const navigate = useNavigate();
   const handleSearch = () => {
      if (search || location) {
         navigate(`/gigs?search=${search}&country=${location}`);
      }
   };

   return (
      <section className="hero-pattern py-26 md:py-34 min-h-screen">
         <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-theme-dark mb-10">
                  Find the Service You Need
               </h1>
               <p className="text-lg md:text-xl text-theme-medium mb-12">
                  Explore thousands of services with all the information you
                  need. Its your future. Come find it.
               </p>

               {/* <!-- Search Box --> */}
               <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center w-full md:w-auto">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-theme-medium mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                           fill-rule="evenodd"
                           d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                           clip-rule="evenodd"
                        />
                     </svg>
                     <input
                        type="text"
                        value={search}
                        placeholder="Job title or keyword"
                        className="flex-1 outline-none text-theme-dark"
                        onChange={(e) => setSearch(e.target.value)}
                     />
                  </div>
                  <div className="h-8 border-r border-gray-300 hidden md:block"></div>
                  <div className="flex items-center w-full md:w-auto">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-theme-medium mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                           fill-rule="evenodd"
                           d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                           clip-rule="evenodd"
                        />
                     </svg>
                     <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="flex-1 outline-none text-theme-dark"
                     />
                  </div>
                  <button
                     onClick={handleSearch}
                     className="bg-theme-accent hover:bg-theme-medium text-white py-3 px-6 rounded-lg font-medium transition-colors w-full md:w-auto">
                     Search
                  </button>
               </div>

               {/* <!-- Popular Searches --> */}
               <div className="mt-8 flex flex-wrap justify-center gap-2">
                  <span className="text-sm text-theme-medium">
                     Popular Searches:
                  </span>
                  <Link
                     to=""
                     className="text-sm text-theme-accent hover:underline">
                     Technicion
                  </Link>
                  <Link
                     to=""
                     className="text-sm text-theme-accent hover:underline">
                     Household
                  </Link>
                  <Link
                     to=""
                     className="text-sm text-theme-accent hover:underline">
                     Repairing
                  </Link>
                  <Link
                     to=""
                     className="text-sm text-theme-accent hover:underline">
                     Indoor
                  </Link>
               </div>
            </div>
         </div>
      </section>
   );
}

export default Featured;
