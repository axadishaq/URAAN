import React from "react";
import { Link } from "react-router";

export const FeatureCourses = () => {
   return (
      <>
         <div className="bg-gray-50 h-auto">
            {/* <!-- Job Category Filter Section --> */}
            <section className="py-12 px-4">
               <div className="max-w-5xl mx-auto">
                  <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
                     Find Your Favorite Skill
                  </h1>

                  <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                     {/* <!-- Customer Services --> */}
                     <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5"
                           viewBox="0 0 20 20"
                           fill="currentColor">
                           <path
                              fill-rule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.358-.035-.708-.101-1.047A5 5 0 0010 11z"
                              clip-rule="evenodd"
                           />
                        </svg>
                        <span className="font-medium">Customer Services</span>
                     </button>

                     {/* <!-- Project Management --> */}
                     <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5"
                           viewBox="0 0 20 20"
                           fill="currentColor">
                           <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clip-rule="evenodd"
                           />
                        </svg>
                        <span className="font-medium">Project Management</span>
                     </button>

                     {/* <!-- Development --> */}
                     <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5"
                           viewBox="0 0 20 20"
                           fill="currentColor">
                           <path
                              fill-rule="evenodd"
                              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                              clip-rule="evenodd"
                           />
                        </svg>
                        <span className="font-medium">Development</span>
                     </button>

                     {/* <!-- Design --> */}
                     <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5"
                           viewBox="0 0 20 20"
                           fill="currentColor">
                           <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                           <path
                              fill-rule="evenodd"
                              d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                              clip-rule="evenodd"
                           />
                        </svg>
                        <span className="font-medium">Design</span>
                     </button>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-3 md:mt-4">
                     {/* <!-- Marketing --> */}
                     <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5"
                           viewBox="0 0 20 20"
                           fill="currentColor">
                           <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                        <span className="font-medium">Marketing</span>
                     </button>

                     {/* <!-- Accounting / Finance --> */}
                     <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5"
                           viewBox="0 0 20 20"
                           fill="currentColor">
                           <path
                              fill-rule="evenodd"
                              d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                              clip-rule="evenodd"
                           />
                        </svg>
                        <span className="font-medium">
                           Accounting / Finance
                        </span>
                     </button>
                  </div>
               </div>
            </section>
         </div>
         <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8">
               <div className="flex justify-between items-center mb-12">
                  <div>
                     <h2 className="text-3xl font-bold text-theme-dark">
                        Featured Courses
                     </h2>
                     <p className="text-theme-medium mt-2">
                        Handpicked Courses featured for you
                     </p>
                  </div>
                  <Link
                     to="/courses"
                     className="hidden md:flex items-center text-theme-accent hover:text-theme-medium font-medium">
                     View All Courses
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                           fill-rule="evenodd"
                           d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                           clip-rule="evenodd"
                        />
                     </svg>
                  </Link>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* <!-- Job /Card 1 --> */}

                  <div className="bg-white overflow-hidden relative p-6 rounded-xl shadow-lg hover:shadow-lg/30 hover:-translate-y-2  transition-all duration-500">
                     <div className="absolute top-2 right-2">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-8 w-8 "
                           fill="orange"
                           viewBox="0 0 24 24"
                           stroke-width="2">
                           <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                           />
                        </svg>
                     </div>
                     <div>
                        <div className="flex gap-2">
                           <span className="border-theme-accent border text-theme-accent px-3 py-1 rounded-md text-sm font-medium">
                              Full-time
                           </span>
                           <span className="border-theme-accent border text-theme-accent px-3 py-1 rounded-md text-sm font-medium">
                              Multan
                           </span>
                        </div>
                     </div>
                     <div className="flex items-start justify-arround item-center mb-4 mt-4">
                        <div className="w-12 h-12 bg-gray-100 rounded my-auto">
                           <img
                              src="/img/avatar.png"
                              alt="Google Logo"
                              className="w-full h-full object-contain"
                           />
                        </div>
                        <h3 className="font-semibold text-xl m-2">
                           AC Technician
                        </h3>
                     </div>
                     <div className="flex items-center text-theme-medium mb-3">
                        <span>Multan indoor and outdoor Services</span>
                        {/* <span className="mx-2">•</span>
                        <span>San Francisco, CA</span> */}
                     </div>
                     <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-gray-100 text-theme-medium px-3 py-1 rounded-full text-sm">
                           Technician
                        </span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="font-semibold text-theme-medium">
                           Rs. 2000
                        </span>
                     </div>
                     <div className="flex justify-center items-center  text-white rounded-lg mt-4 p-2 border-3 transition-all duration-500 bg-theme-dark font-bold  hover:bg-theme-light hover:border-amber-900 hover:text-theme-dark">
                        <Link to="/courses" className=" ">
                           Enroll Now
                        </Link>
                     </div>
                  </div>

                  {/* <!-- Job Card 2 --> */}
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-lg/30 hover:-translate-y-2  transition-all duration-500">
                     <div>
                        <div className="flex gap-2">
                           <span className="border-theme-accent border text-theme-accent px-3 py-1 rounded-md text-sm font-medium">
                              Full-time
                           </span>
                           <span className="border-theme-accent border text-theme-accent px-3 py-1 rounded-md text-sm font-medium">
                              Multan
                           </span>
                        </div>
                     </div>
                     <div className="flex items-start justify-arround item-center mb-4 mt-4">
                        <div className="w-12 h-12 bg-gray-100 rounded my-auto">
                           <img
                              src="/img/avatar.png"
                              alt="Google Logo"
                              className="w-full h-full object-contain"
                           />
                        </div>
                        <h3 className="font-semibold text-xl m-2">
                           House Cleaning
                        </h3>
                     </div>
                     <div className="flex items-center text-theme-medium mb-3">
                        <span> On Physical location</span>
                        <span className="mx-2">•</span>
                        <span></span>
                     </div>
                     <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-gray-100 text-theme-medium px-3 py-1 rounded-full text-sm">
                           Cleaning
                        </span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="font-semibold text-theme-medium">
                           Rs. 3000
                        </span>
                     </div>
                     <div className="flex justify-center items-center  text-white rounded-lg mt-4 p-2 border-3 transition-all duration-500 bg-theme-dark font-bold  hover:bg-theme-light hover:border-amber-900 hover:text-theme-dark">
                        <a to="/courses" className=" ">
                           Enroll Now
                        </a>
                     </div>
                  </div>

                  {/* <!-- Job Card 3 --> */}
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-lg/30 hover:-translate-y-2  transition-all duration-500">
                     <div>
                        <div className="flex gap-2">
                           <span className="border-theme-accent border text-theme-accent px-3 py-1 rounded-md text-sm font-medium">
                              Full-time
                           </span>
                           <span className="border-theme-accent border text-theme-accent px-3 py-1 rounded-md text-sm font-medium">
                              Multan
                           </span>
                        </div>
                     </div>
                     <div className="flex items-start justify-arround item-center mb-4 mt-4">
                        <div className="w-12 h-12 bg-gray-100 rounded my-auto">
                           <img
                              src="/img/avatar.png"
                              alt="Google Logo"
                              className="w-full h-full object-contain"
                           />
                        </div>
                        <h3 className="font-semibold text-xl m-2">
                           Auto Electrition
                        </h3>
                     </div>
                     <div className="flex items-center text-theme-medium mb-3">
                        <span>On Physical location</span>
                        <span className="mx-2">•</span>
                        <span></span>
                     </div>
                     <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-gray-100 text-theme-medium px-3 py-1 rounded-full text-sm">
                           Electrion
                        </span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="font-semibold text-theme-medium">
                           Rs. 6000
                        </span>
                     </div>
                     <div className="flex justify-center items-center  text-white rounded-lg mt-4 p-2 border-3 transition-all duration-500 bg-theme-dark font-bold  hover:bg-theme-light hover:border-amber-900 hover:text-theme-dark">
                        <Link to="/courses" className=" ">
                           Enroll Now
                        </Link>
                     </div>
                  </div>
               </div>

               <div className="text-center mt-10 md:hidden">
                  <Link
                     to="/courses"
                     className="inline-flex items-center text-theme-accent hover:text-theme-medium font-medium">
                     View All Courses
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                           fill-rule="evenodd"
                           d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                           clip-rule="evenodd"
                        />
                     </svg>
                  </Link>
               </div>
            </div>
         </section>
      </>
   );
};
