import React, { useEffect, useRef, useState } from "react";
// import "./Gigs.scss";
// import { gigs } from "../../data";
import GigCard from "../../components/gigCard/GigCard";
import newRequest from "../../utils/newRequest";
import {
   QueryClient,
   QueryClientProvider,
   useQuery,
} from "@tanstack/react-query";
import { useLocation } from "react-router";

function Gigs() {
   const [sort, setSort] = useState("sales");
   const [open, setOpen] = useState(false);
   const minRef = useRef();
   const maxRef = useRef();

   const { search } = useLocation();

   // console.log(location);

   const { isLoading, error, data, refetch } = useQuery({
      queryKey: ["gigs", sort, search],
      queryFn: () =>
         newRequest
            .get(
               `/gigs?${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
            )
            .then((res) => {
               return res.data;
            }),
   });

   // console.log(data);

   const reSort = (type) => {
      setSort(type);
      setOpen(false);
   };

   useEffect(() => {
      refetch();
   }, [sort]);

   const apply = () => {
      refetch();
      // console.log(minRef.current.value);
      // console.log(maxRef.current.value);
   };

   return (
      <>
         
         <section className="bg-theme-light py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-theme-dark mb-4">
                     Browse our Services
                  </h2>
                  <p className="text-theme-medium text-lg max-w-2xl mx-auto">
                     Choose from our professional for your next event
                  </p>
               </div>
            </div>
            <div className="flex flex-wrap justify-end lg:justify-between">
               <div className="lg:block hidden">
                  <div className=" text-theme-dark  flex  gap-3">
                     <span className="text-lg font-bold ">Budget</span>
                     <input
                        ref={minRef}
                        type="number"
                        placeholder="min"
                        className="w-1/4 px-2 bg-white rounded-md border border-theme-accent focus:outline-none focus:ring-1 focus:ring-theme-accent"
                     />
                     <input
                        ref={maxRef}
                        type="number"
                        placeholder="max"
                        className="w-1/4 px-2 bg-white rounded-md border border-theme-accent focus:outline-none focus:ring-1 focus:ring-theme-accent"
                     />
                     <button
                        onClick={apply}
                        className=" bg-theme-accent text-white  px-4 rounded-md border border-theme-medium  hover:bg-theme-dark transition-all duration-500">
                        Apply
                     </button>
                  </div>{" "}
               </div>
               <div className="flex gap-2 cursor-pointer relative items-center">
                  <span className="text-lg font-bold">Sort by</span>
                  <span
                     onClick={() => setOpen(!open)}
                     className="bg-white p-1 border border-theme-accent rounded-lg ">
                     {sort === "sales" ? "Best Selling" : "Newest"}
                  </span>
                  <img
                     src="./img/down.png"
                     alt=""
                     onClick={() => setOpen(!open)}
                     className="cursor-pointer "
                  />
                  {open && (
                     <div className="p-2 bg-white rounded-lg border border-theme-accent absolute right-0 z-10 top-10 flex flex-col gap-2">
                        {sort === "sales" ? (
                           <span onClick={() => reSort("createdAt")}>
                              Newest
                           </span>
                        ) : (
                           <span onClick={() => reSort("sales")}>
                              Best Selling
                           </span>
                        )}
                        <span onClick={() => reSort("price")}>Price</span>
                     </div>
                  )}
               </div>
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6 bg-theme-light">
               {/* <!-- Card  --> */}
               {isLoading ? (
                  <>
                     {/* <!-- From Uiverse.io by devAaus -->  */}
                     <div className="flex-col gap-4 w-full mx-auto flex items-center justify-center">
                        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                           <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                        </div>
                     </div>
                  </>
               ) : error ? (
                  <div className="text-red-600">{error}</div>
               ) : (
                  data.map((gig) => <GigCard key={gig._id} item={gig} />)
               )}
            </div>
         </section>
      </>
   );
}

export default Gigs;
