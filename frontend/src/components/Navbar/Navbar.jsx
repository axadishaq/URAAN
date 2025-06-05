import React, { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, ChevronDown } from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Navbar() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [activeDropdown, setActiveDropdown] = useState(null);
   const [open, setOpen] = useState(false);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   const toggleDropdown = (name) => {
      if (activeDropdown === name) {
         setActiveDropdown(null);
      } else {
         setActiveDropdown(name);
      }
   };

   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   const navigate = useNavigate();

   const handleLogout = async () => {
      try {
         await newRequest.post("/auth/logout");
         localStorage.removeItem("currentUser");
         navigate("/");
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <nav className="bg-white shadow-md w-full sticky top-0 z-50 transition-all duration-300 ">
         <div className="max-w-8xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between sm:h-16 h-10">
               {/* Logo and brand name */}
               <Link to="/" className="flex items-center">
                  <div className="flex">
                     <img
                        src="/uraan.png"
                        alt=""
                        className="sm:h-16 sm:w-16  h-8 w-8 "
                     />
                     <h1 className="text-xl mt-2 sm:mt-6 sm:text-2xl font-bold items-center bg-clip-text text-transparent bg-gradient-to-r from-[#2b0d07] to-[#efa180] ">
                        URAAN
                     </h1>
                  </div>
               </Link>

               {/* Desktop navigation links */}
               <div className="hidden lg:flex text-lg font-semibold items-center space-x-6">
                  <Link
                     to="/"
                     className="text-theme-medium hover:text-theme-dark px-2 py-2">
                     Home
                  </Link>
                  <Link
                     to="/gigs"
                     className="text-theme-dark font-medium hover:text-theme-accent px-2 py-2">
                     Services
                  </Link>
                  <div className="relative group">
                     <button className="text-theme-dark hover:text-theme-accent px-2 py-2 flex items-center">
                        Courses
                        <ChevronDown className="ml-1 w-4 h-4" />
                     </button>
                     <div className="absolute hidden group-hover:block bg-theme-light shadow-lg rounded-md py-1 w-48 z-10">
                        <Link
                           to="/courses?level=Beginner"
                           className="block px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           Beginner
                        </Link>
                        <Link
                           to="/courses?level=Intermediate"
                           className="block px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           Intermediate
                        </Link>
                        <Link
                           to="/courses?level=Advanced"
                           className="block px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           Advanced
                        </Link>
                        <Link
                           to="/courses"
                           className="block px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           All Courses
                        </Link>
                     </div>
                  </div>
                  <div className="relative group">
                     <button className="text-theme-dark hover:text-theme-accent px-2 py-2 flex items-center">
                        Location
                        <ChevronDown className="ml-1 w-4 h-4" />
                     </button>
                     <div className="absolute hidden group-hover:block bg-theme-light shadow-lg rounded-md py-1 w-48 z-10">
                        <Link
                           to="/gigs/country/Multan"
                           className="block px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           Multan
                        </Link>
                        <Link
                           to="/gigs/country/Lahore"
                           className="block px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           Lahore
                        </Link>
                        <Link
                           to="/gigs/country/Karachi"
                           className="block px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           Karachi
                        </Link>
                        <Link
                           to="/gigs/country/Islamabad"
                           className="block px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           Islamabad
                        </Link>
                     </div>
                  </div>
                  <div className="relative group">
                     <button className="text-theme-dark hover:text-theme-accent px-2 py-2 flex items-center ">
                        About
                        <ChevronDown className="ml-1 w-4 h-4" />
                     </button>
                     <div className="absolute hidden group-hover:block bg-theme-light shadow-lg rounded-md py-1 w-48 z-10">
                        <Link
                           to=""
                           className="block px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           Blog
                        </Link>
                        <Link
                           to=""
                           className="block px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           How It Works
                        </Link>
                        <Link
                           to=""
                           className="block px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           FAQ
                        </Link>
                     </div>
                  </div>
               </div>

               {/* Mobile view: Shopping bag, login button and hamburger */}
               <div className="flex items-center space-x-4">
                  {/* Shopping bag - always visible */}
                  {!currentUser?.isSeller && (
                     <div className="flex items-center">
                        <Link
                           to="/myenrollments"
                           className="flex items-center text-theme-dark hover:text-theme-accent">
                           <ShoppingBag className="sm:h-6 sm:w-6 w-4 h-4" />
                           <span className="ml-1 bg-theme-accent text-theme-dark text-xs font-semibold rounded-full px-2 sm:py-0.5">
                              0
                           </span>
                        </Link>
                     </div>
                  )}
                  {currentUser ? (
                     <div className="relative">
                        <div
                           className="flex items-center sm:space-x-3 cursor-pointer sm:pr-5 "
                           onClick={() => setOpen(!open)}>
                           <img
                              src={currentUser.img || "/img/avatar.png"}
                              alt=""
                              className="w-10 h-10 rounded-full border border-theme-accent object-cover"
                           />
                           <span className="text-theme-dark text-lg ml-1">
                              {currentUser?.username}
                           </span>
                        </div>

                        {open && (
                           <div className="absolute right-0 mt-2 w-48 bg-theme-light rounded-md shadow-lg py-1 z-50">
                              {currentUser.isSeller && (
                                 <>
                                    <Link
                                       to="/mygigs"
                                       onClick={() => setOpen(false)}
                                       className="block px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                                       Service
                                    </Link>
                                    <Link
                                       to="/mycourses"
                                       onClick={() => setOpen(false)}
                                       className="block px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                                       Courses
                                    </Link>
                                    <Link
                                       to="/add"
                                       onClick={() => setOpen(false)}
                                       className="block px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                                       Add Service
                                    </Link>
                                    <Link
                                       to="/addcourse"
                                       onClick={() => setOpen(false)}
                                       className="block px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                                       Add Course
                                    </Link>
                                 </>
                              )}
                              <Link
                                 to="/orders"
                                 onClick={() => setOpen(false)}
                                 className="block px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                                 Orders
                              </Link>
                              <Link
                                 to="/messages"
                                 onClick={() => setOpen(false)}
                                 className="block px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                                 Messages
                              </Link>
                              <button
                                 onClick={handleLogout}
                                 className="block w-full text-left px-4 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                                 Logout
                              </button>
                           </div>
                        )}
                     </div>
                  ) : (
                     <>
                        <div className="hidden lg:block w-auto">
                           <Link
                              to="/login"
                              className="bg-theme-light hover:bg-theme-accent text-theme-dark font-medium px-5 py-4 rounded-xl transition duration-500 ease-in-out border border-theme-accent ">
                              Log In / Sign Up
                           </Link>
                        </div>
                        <div className="md:hidden">
                           <Link
                              to="/login"
                              className="bg-theme-light hover:bg-theme-accent text-theme-dark font-medium px-5 py-3 rounded-lg text-sm transition duration-500 ease-in-out border border-theme-accent ">
                              Log In / Sign Up
                           </Link>
                        </div>
                     </>
                  )}

                  {/* Mobile menu button */}
                  <div className="lg:hidden">
                     <button
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center p-2 rounded-md text-theme-dark hover:text-theme-accent hover:bg-theme-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-theme-accent"
                        aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        {isMenuOpen ? (
                           <X className="block h-6 w-6" />
                        ) : (
                           <Menu className="block h-6 w-6" />
                        )}
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Mobile menu, show/hide based on menu state */}
         <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-2">
               <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-2 py-2 text-theme-medium hover:text-theme-dark">
                  Home
               </Link>
               <Link
                  to="/gigs"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-2 py-2 text-theme-dark font-medium hover:text-theme-accent">
                  Services
               </Link>

               {/* Categories dropdown in mobile view */}
               <div>
                  <button
                     onClick={() => toggleDropdown("categories")}
                     className="flex justify-between w-full px-2 py-2 text-theme-dark hover:text-theme-accent">
                     Courses
                     <ChevronDown
                        className={`w-4 h-4 transform ${
                           activeDropdown === "categories" ? "rotate-180" : ""
                        }`}
                     />
                  </button>
                  {activeDropdown === "categories" && (
                     <div className="pl-4 py-1">
                        <Link
                           to="/courses?level=Beginner"
                           onClick={() => setIsMenuOpen(false)}
                           className="block px-2 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           Beginner
                        </Link>
                        <Link
                           onClick={() => setIsMenuOpen(false)}
                           to="/courses?level=Intermediate"
                           className="block px-2 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           Intermediate
                        </Link>
                        <Link
                           to="/courses?level=Advanced"
                           onClick={() => setIsMenuOpen(false)}
                           className="block px-2 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           Advanced
                        </Link>
                        <Link
                           to="/courses"
                           onClick={() => setIsMenuOpen(false)}
                           className="block px-2 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           All Courses
                        </Link>
                     </div>
                  )}
               </div>

               {/* Location dropdown in mobile view */}
               <div>
                  <button
                     onClick={() => toggleDropdown("location")}
                     className="flex justify-between w-full px-2 py-2 text-theme-dark hover:text-theme-accent">
                     Locations
                     <ChevronDown
                        className={`w-4 h-4 transform ${
                           activeDropdown === "location" ? "rotate-180" : ""
                        }`}
                     />
                  </button>
                  {activeDropdown === "location" && (
                     <div className="pl-4 py-1">
                        <Link
                           to="/gigs/country/Multan"
                           onClick={() => setIsMenuOpen(false)}
                           className="block px-2 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           Multan
                        </Link>
                        <Link
                           to="/gigs/country/Lahore"
                           onClick={() => setIsMenuOpen(false)}
                           className="block px-2 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           Lahore
                        </Link>
                        <Link
                           to="/gigs/country/Karachi"
                           onClick={() => setIsMenuOpen(false)}
                           className="block px-2 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           Karachi
                        </Link>
                        <Link
                           to="/gigs/country/Islamabad"
                           onClick={() => setIsMenuOpen(false)}
                           className="block px-2 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           Islamabad
                        </Link>
                     </div>
                  )}
               </div>

               {/* Pages dropdown in mobile view */}
               <div>
                  <button
                     onClick={() => toggleDropdown("pages")}
                     className="flex justify-between w-full px-2 py-2 text-theme-dark hover:text-theme-accent">
                     About
                     <ChevronDown
                        className={`w-4 h-4 transform ${
                           activeDropdown === "pages" ? "rotate-180" : ""
                        }`}
                     />
                  </button>
                  {activeDropdown === "pages" && (
                     <div className="pl-4 py-1">
                        <Link
                           to=""
                           onClick={() => setIsMenuOpen(false)}
                           className="block px-2 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           Blog
                        </Link>
                        <Link
                           to=""
                           onClick={() => setIsMenuOpen(false)}
                           className="block px-2 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           How It Works
                        </Link>
                        <Link
                           to=""
                           onClick={() => setIsMenuOpen(false)}
                           className="block px-2 py-2 text-sm text-theme-dark hover:bg-theme-accent">
                           FAQ
                        </Link>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
}

export default Navbar;
