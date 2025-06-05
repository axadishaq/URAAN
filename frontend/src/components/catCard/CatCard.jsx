import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

function CatCard() {
   return (
      //<Link to="/gigs?cat=design">
      //   <div className="catCard">
      //     <img src={card.img} alt="" />
      //     <span className="desc">{card.desc}</span>
      //     <span className="title">{card.title}</span>
      //   </div>
      // </Link>
      <>
         <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-8">
               <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-theme-dark mb-4">
                     Popular Service Categories
                  </h2>
                  <p className="text-theme-medium max-w-2xl mx-auto">
                     Explore services in the most popular categories across
                     various industries and locations
                  </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {/* <!-- Category 1 --> */}
                  <Link to="/gigs?cat=design">
                     <div className="bg-theme-light p-6 rounded-xl shadow-lg hover:shadow-lg/20 transition-all duration-300 hover:-translate-y-1">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-theme-accent"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                                 stroke-width="2"
                                 d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                           </svg>
                        </div>
                        <h3 className="font-semibold text-xl mb-2">Tailor</h3>
                        <p className="text-theme-medium mb-4">
                           Software, IT, Data, Hardware, AI, Cloud Solutions
                        </p>
                        <p className="text-theme-accent font-medium">
                           1,200+ services
                        </p>
                     </div>
                  </Link>
                  {/* <!-- Category 2 --> */}
                  <Link to="/gigs?cat=design">
                     <div className="bg-theme-light p-6 rounded-xl shadow-lg  hover:shadow-lg/20 transition-all duration-300 hover:-translate-y-1">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-theme-accent"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                                 stroke-width="2"
                                 d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                           </svg>
                        </div>
                        <h3 className="font-semibold text-xl mb-2">
                           Technician
                        </h3>
                        <p className="text-theme-medium mb-4">
                           Analysis, Insurance, Services, Indoor, Outdoor
                        </p>
                        <p className="text-theme-accent font-medium">
                           850+ services
                        </p>
                     </div>
                  </Link>

                  {/* <!-- Category 3 --> */}
                  <Link to="/gigs?cat=design">
                     <div className="bg-theme-light p-6 rounded-xl shadow-lg  hover:shadow-lg/20 transition-all duration-300 hover:-translate-y-1">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-theme-accent"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                                 stroke-width="2"
                                 d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                              />
                           </svg>
                        </div>
                        <h3 className="font-semibold text-xl mb-2">
                           Grocery Delievery
                        </h3>
                        <p className="text-theme-medium mb-4">
                           Vegetable, Fruits, Drinks, Snacks, Groceries, Bakery
                        </p>
                        <p className="text-theme-accent font-medium">
                           750+ services
                        </p>
                     </div>
                  </Link>
                  {/* <!-- Category 4 --> */}
                  <Link to="/gigs?cat=design">
                     <div className="bg-theme-light p-6 rounded-xl shadow-lg  hover:shadow-lg/20 transition-all duration-300 hover:-translate-y-1">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-theme-accent"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                                 stroke-width="2"
                                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                           </svg>
                        </div>
                        <h3 className="font-semibold text-xl mb-2">
                           Healthcare
                        </h3>
                        <p className="text-theme-medium mb-4">
                           Medical, Nursing, Therapy, Research, Administration
                        </p>
                        <p className="text-theme-accent font-medium">
                           950+ services
                        </p>
                     </div>
                  </Link>
               </div>

               <div className="text-center mt-10">
                  <Link
                     to=""
                     className="inline-flex items-center text-theme-accent hover:text-theme-dark font-medium">
                     Browse All Categories
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
}
export default CatCard;
