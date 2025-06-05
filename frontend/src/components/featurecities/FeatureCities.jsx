import React from "react";
import { Link } from "react-router";

export const FeatureCities = () => {
   return (
      <>
         <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* <!-- Title --> */}
            <div className="mb-20 ">
               <h3 className="text-3xl md:text-4xl font-bold text-theme-dark">
                  Featured Cities
               </h3>
            </div>

            {/* <!-- Cities Grid --> */}
            <div className="grid grid-cols-1  lg:grid-cols-2 gap-6">
               {/* <!-- Se/attle --> */}
               <Link
                  to="/gigs/country/Multan"
                  className="group relative block h-94 rounded-xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-[url(https://cdn.pixabay.com/photo/2022/08/01/03/39/pakistan-7357268_1280.jpg)] bg-cover bg-center transition-transform duration-300 group-hover:scale-105"></div>
                  <div className="relative h-full flex items-end p-6">
                     <h3 className="text-4xl font-bold text-white">Multan</h3>
                  </div>
               </Link>

               {/* <!-- Remote --> */}
               <Link
                  to="/gigs/country/Lahore"
                  className="group relative block h-94 rounded-xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-[url(https://cdn.pixabay.com/photo/2022/07/20/11/04/mosque-7333946_640.jpg)] bg-cover bg-center transition-transform duration-300 group-hover:scale-105"></div>
                  <div className="relative h-full flex items-end p-6">
                     <h3 className="text-4xl font-bold text-white">Lahore</h3>
                  </div>
               </Link>

               {/* <!-- Stockholm --> */}
               <Link
                  to="/gigs/country/Karachi"
                  className="group relative block h-94 rounded-xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-[url(https://cdn.pixabay.com/photo/2022/04/18/19/53/travel-7141487_1280.jpg)] bg-cover bg-center transition-transform duration-300 group-hover:scale-105"></div>
                  <div className="relative h-full flex items-end p-6">
                     <h3 className="text-4xl font-bold text-white">
                        Islamabad
                     </h3>
                  </div>
               </Link>

               {/* <!-- San Francisco --> */}
               <Link
                  to="/gigs/country/Islamabad"
                  className="group relative block h-94 rounded-xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-[url(https://media.istockphoto.com/id/1137141391/photo/beautiful-view-of-mazar-e-quaid-mohammad-ali-jinnah-karachi-pakistan.jpg?s=612x612&w=0&k=20&c=XWLCbNPYhMReWJKjDLoPL_9qw8av6uNgQoot0YU5FHQ=)] bg-cover bg-center transition-transform duration-300 group-hover:scale-105"></div>
                  <div className="relative h-full flex items-end p-6">
                     <h3 className="text-4xl font-bold text-white">Karachi</h3>
                  </div>
               </Link>
            </div>
         </div>
      </>
   );
};
