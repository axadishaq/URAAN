import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const GigsByCountry = () => {
   const { country } = useParams();
   const [gigs, setGigs] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchGigs = async () => {
         try {
            const res = await axios.get(
               `http://localhost:8800/api/gigs/country/${country}`
            );
            // console.log("Fetched gigs:", res.data); // Debug log
            setGigs(res.data);
         } catch (err) {
            console.error("Error fetching gigs:", err); // Debug log
            setError("Something went wrong!",err);
         } finally {
            setLoading(false);
         }
      };

      fetchGigs();
   }, [country]);

   if (loading)
      return (
         <>
            <div className="flex-col gap-4 w-full h-screen flex items-center justify-center">
               <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                  <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
               </div>
            </div>
         </>
      );
   if (error) return <div>{error}</div>;

   return (
      // <div className="max-w-5xl mx-auto p-8">
      //   <h2 className="text-2xl font-bold mb-4">Gigs in {country}</h2>
      //   {gigs.length === 0 ? (
      //     <p>No gigs found for this country.</p>
      //   ) : (
      //     <ul>
      //       {gigs.map((gig) => (
      //         <li key={gig._id} className="mb-6 border-b pb-4">
      //           <h3 className="text-xl font-semibold">{gig.title}</h3>
      //           <p>{gig.desc}</p>
      //           <span className="text-sm text-gray-500">
      //             Price: {gig.price}
      //           </span>
      //         </li>
      //       ))}
      //     </ul>
      //   )}
      // </div>

      <>
         {gigs.length === 0 ? (
            <p className="text-center">No gigs found for this city.</p>
         ) : (
            <>
               <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6 bg-theme-light">
                  {gigs.map((gig) => (
                     <Link
                        to={`/gig/${gig._id}`}
                        className="block transition-all">
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg duration-300 hover:transform hover:scale-103">
                           {/* <!-- Gig Cover Image --> */}
                           <div className="relative h-46">
                              <img
                                 src={gig.cover}
                                 alt="Gig Cover"
                                 className="w-full h-full object-cover"
                              />
                           </div>

                           {/* <!-- Info Section --> */}
                           <div className="p-4 bg-white">
                              {/* <!-- Description --> */}
                              <h1 className="text-theme-dark font-semibold mb-3 text-lg line-clamp-2">
                                 {gig.title}
                              </h1>
                              <p className="text-theme-light  text-sm line-clamp-2">
                                 {gig.desc}{" "}
                              </p>
                           </div>

                           {/* <!-- Divider --> */}
                           <hr className="border-theme-accent" />

                           {/* <!-- Detail Section --> */}
                           <div className="p-4 flex justify-between items-center">
                              <div className="text-right">
                                 <span className="text-xs text-theme-medium block">
                                    STARTING FROM
                                 </span>
                                 <h2 className="text-xl font-bold text-theme-dark">
                                    Rs. {gig.price}
                                 </h2>
                              </div>
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
            </>
         )}
      </>
   );
};

export default GigsByCountry;
