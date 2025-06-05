import React, { useState } from "react";

import moment from "moment";

import { Slider } from "infinite-react-carousel/lib";
import { Link, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import Alert from "../../components/Alert/Alert"; // adjust path as needed

function Gig() {
   const { id } = useParams();
   // console.log(id);
   const nevigate = useNavigate();
   const [orderMessage, setOrderMessage] = useState(null); // for alert

   const { isLoading, error, data } = useQuery({
      queryKey: ["gig"],
      queryFn: () =>
         newRequest.get(`/gigs/single/${id} `).then((res) => {
            return res.data;
         }),
   });

   const userId = data?.userId;

   const {
      isLoading: isLoadingUser,
      error: errorUser,
      data: dataUser,
   } = useQuery({
      queryKey: ["user", userId],
      queryFn: () =>
         newRequest.get(`/users/${userId} `).then((res) => {
            return res.data;
         }),
      enabled: !!userId,
   });

   const handleCreateOrder = async () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
         alert("Please log in to create an order.");
         return;
      }
      try {
         await newRequest.post(`/orders/${id}`, {
            gigId: id,
            sellerId: data.userId,
            buyerId: currentUser._id,
            deliveryTime: data.deliveryTime,
         });
         alert("Order has been created!");
         setOrderMessage({ type: "success", text: "Order has been created!" });
         setTimeout(() => setOrderMessage(null), 1000);
         nevigate("/orders"); // Redirect to orders page after creating order
      } catch (err) {
         if (
            err?.response?.status === 401 ||
            err?.response?.data?.message?.includes("not authorized!")
         ) {
            alert("You are not authorized to create an order.");
            return;
         } else {
            setOrderMessage({
               type: "error",
               text: err?.response?.data?.message || "Failed to create order.",
            });
         }
      }
   };

   // const handleCreateOrder = async () => {
   //    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

   //    try {
   //       await newRequest.post(`/orders/${id}`, {
   //          gigId: id,
   //          sellerId: data.userId,
   //          buyerId: currentUser._id,
   //       });
   //       alert("Order has been created!");

   //       setOrderMessage({ type: "success", text: "Order has been created!" });

   //       // Optional: auto-hide after 3 seconds
   //       setTimeout(() => setOrderMessage(null), 3000);
   //    } catch (err) {
   //       console.log(err);
   //       setOrderMessage({
   //          type: "error",
   //          text: err?.response?.data?.message || "Failed to create order.",
   //       });
   //    }
   // };
   return (
      <div className="bg-theme-light py-12 px-4 sm:px-6 lg:px-8">
         {isLoading ? (
            <>
               {/* <!-- From Uiverse.io by devAaus -->  */}
               <div className="flex-col gap-4 w-full h-screen flex items-center justify-center">
                  <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                     <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                  </div>
               </div>
            </>
         ) : error ? (
            "Something went wrong!"
         ) : (
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col">
                  <h1 className="text-3xl font-bold text-theme-dark mb-8">
                     {data.title}
                  </h1>
                  {isLoadingUser ? (
                     <>
                        {/* <!-- From Uiverse.io by sahilxkhadka -->  */}
                        <div className="relative flex w-64 animate-pulse gap-2 p-4">
                           <div className="h-12 w-12 rounded-full bg-slate-400"></div>
                           <div className="flex-1">
                              <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                              <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
                           </div>
                           <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
                        </div>
                     </>
                  ) : errorUser ? (
                     "Something went wrong!"
                  ) : (
                     <div className="p-4">
                        {/* <!-- User Info --> */}
                        <div className="flex items-center gap-5 ">
                           <img
                              src={dataUser.img || "/img/avatar.png"}
                              alt="User"
                              className="w-10 h-10 rounded-full object-contain"
                           />
                           <span className="text-sm text-theme-dark font-medium">
                              {dataUser.username}
                           </span>
                        </div>
                        {!isNaN(data.totalStars / data.starNumber) && (
                           <div className="flex items-center gap-1 ">
                              {Array(
                                 Math.round(data.totalStars / data.starNumber)
                              )
                                 .fill()
                                 .map((item, i) => (
                                    <img
                                       src="/img/star.png"
                                       alt=""
                                       key={i}
                                       className="h-4 w-4"
                                    />
                                 ))}

                              <span className="text-theme-medium ml-2 text-sm">
                                 {Math.round(data.totalStars / data.starNumber)}
                              </span>
                           </div>
                        )}
                     </div>
                  )}
               </div>
               {/* Service Details Container */}
               <div className="flex flex-col-reverse lg:flex-row gap-8">
                  {/* Service Details */}
                  <div className="lg:w-2/3">
                     {/* Main Image Gallery */}
                     <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className=" mb-4  rounded-lg"></div>
                        <Slider
                           slidesToShow={1}
                           arrowsScroll={1}
                           className="h-auto ">
                           {data?.images?.map((img) => (
                              <img
                                 key={img}
                                 src={img}
                                 alt=""
                                 className="h-120 my-auto object-contain"
                              />
                           ))}
                        </Slider>
                     </div>

                     {/* Service Description */}
                     <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h3 className="text-2xl font-bold text-theme-dark mb-4">
                           Service Description
                        </h3>
                        <p className="text-theme-medium mb-6">{data.desc}</p>

                        <h4 className="text-xl font-bold text-theme-dark mb-3">
                           Features
                        </h4>
                        <ul className="list-disc pl-6 text-theme-medium mb-6 space-y-2">
                           {data?.features?.map((feature) => (
                              <li key={feature}>{feature}</li>
                           ))}
                        </ul>

                        {/* <h4 className="text-xl font-bold text-theme-dark mb-3">
                           Why Choose Our Service
                        </h4>
                        <ul className="list-disc pl-6 text-theme-medium space-y-2">
                           <li>
                              Over 5 years of experience in delivering
                              high-quality solutions
                           </li>
                           <li>
                              Portfolio of 200+ successful projects across
                              various industries
                           </li>
                           <li>
                              Team of certified professionals with expertise in
                              modern technologies
                           </li>
                           <li>
                              Commitment to deadlines and transparent
                              communication throughout the project
                           </li>
                        </ul> */}
                     </div>
                     {/* about the seller  */}
                     {isLoadingUser ? (
                        <>
                           {/* <!-- From Uiverse.io by sahilxkhadka -->  */}
                           <div className="relative flex w-64 animate-pulse gap-2 p-4">
                              <div className="h-12 w-12 rounded-full bg-slate-400"></div>
                              <div className="flex-1">
                                 <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                                 <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
                              </div>
                              <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
                           </div>
                        </>
                     ) : errorUser ? (
                        "Something went wrong!"
                     ) : (
                        <div className="bg-white text-xl font-semibold rounded-lg shadow-md p-6 mb-6">
                           <h2>About The Seller</h2>
                           <>
                              <div className="p-4">
                                 {/* <!-- User Info --> */}
                                 <div className="flex items-center gap-5 ">
                                    <img
                                       src={dataUser.img || "/img/avatar.png"}
                                       alt="User"
                                       className="w-10 h-10 rounded-full object-contain"
                                    />
                                    <span className="text-sm text-theme-dark font-medium">
                                       {dataUser.username}
                                    </span>
                                 </div>
                                 {!isNaN(data.totalStars / data.starNumber) && (
                                    <div className="flex items-center gap-1 ">
                                       {Array(
                                          Math.round(
                                             data.totalStars / data.starNumber
                                          )
                                       )
                                          .fill()
                                          .map((item, i) => (
                                             <img
                                                src="/img/star.png"
                                                alt=""
                                                key={i}
                                                className="h-4 w-4"
                                             />
                                          ))}

                                       <span className="text-theme-medium ml-2 text-sm">
                                          {Math.round(
                                             data.totalStars / data.starNumber
                                          )}
                                       </span>
                                    </div>
                                 )}
                                 <span className="border-theme-accent border text-theme-accent px-3 py-1 rounded-md text-sm font-medium">
                                    {dataUser ? dataUser.country : ""}
                                 </span>
                                 <br />
                                 <button className="text-sm text-white rounded-lg mt-4 p-2 border-2 transition-all duration-500 bg-theme-dark  hover:bg-theme-light hover:text-theme-dark">
                                    Contact Me
                                 </button>
                              </div>

                              <hr />
                              <p>{dataUser.desc}</p>
                           </>
                        </div>
                     )}

                     {/* Reviews and Ratings */}
                     <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-6">
                           <h3 className="text-2xl font-bold text-theme-dark">
                              Reviews
                           </h3>
                           <div className="flex items-center">
                              <div className="flex items-center mr-2">
                                 <img src="/img/star.png" alt="" />
                              </div>
                              <span className="text-theme-medium font-semibold">
                                 {Math.round(data.totalStars / data.starNumber)}
                                 {"("}
                                 {data.starNumber} reviews{")"}
                              </span>
                           </div>
                        </div>

                        {/* Individual Reviews */}
                        <div className="space-y-6">
                           <Reviews gigId={id} />
                           {/* Load More Reviews Button */}
                           <div className="mt-8 flex justify-center">
                              <button className="border border-theme-accent text-theme-accent hover:bg-theme-accent hover:text-theme-dark px-6 py-2 rounded-md transition-colors duration-300 font-medium">
                                 Load More Reviews
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
                  {/* Service Summary Card (Sticky) */}
                  <div className="lg:w-1/3 lg:sticky lg:top-8 lg:self-start">
                     <div className="bg-white overflow-hidden relative p-6 rounded-xl shadow-sm hover:shadow-lg/30 transition-all duration-500">
                        <div className="absolute top-2 right-2">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8"
                              fill="orange"
                              viewBox="0 0 24 24"
                              strokeWidth="2">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                              />
                           </svg>
                        </div>

                        {/* Price & Category Tags */}
                        <div>
                           <div className="flex gap-2">
                              <span className="border-theme-accent border text-theme-accent px-3 py-1 rounded-md text-sm font-medium">
                                 Premium
                              </span>
                              <span className="border-theme-accent border text-theme-accent px-3 py-1 rounded-md text-sm font-medium">
                                 {dataUser ? dataUser.country : ""}
                              </span>
                           </div>
                        </div>
                        {isLoadingUser ? (
                           <>
                              {/* <!-- From Uiverse.io by sahilxkhadka -->  */}
                              <div className="relative flex w-64 animate-pulse gap-2 p-4">
                                 <div className="h-12 w-12 rounded-full bg-slate-400"></div>
                                 <div className="flex-1">
                                    <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                                    <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
                                 </div>
                                 <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
                              </div>
                           </>
                        ) : errorUser ? (
                           "Something went wrong!"
                        ) : (
                           <div className="flex items-start justify-arround item-center mb-4 mt-4">
                              <div className="w-12 h-12 bg-gray-100 rounded my-auto flex items-center justify-center">
                                 <img
                                    src={
                                       dataUser && dataUser.img
                                          ? dataUser.img
                                          : "/img/avatar.png"
                                    }
                                    alt="Service Provider Logo"
                                    className="w-full h-full object-contain rounded-full"
                                 />
                              </div>
                              <h3 className="font-semibold text-xl m-2">
                                 {data.shortTitle}
                              </h3>
                           </div>
                        )}
                        {/* Provider Info */}
                        <div className="flex items-center text-theme-medium mb-3">
                           <span></span>
                           <span className="mx-1 font-bold text-xl">•</span>
                           <span>
                              Since{" "}
                              {dataUser && dataUser.createdAt
                                 ? moment(dataUser.createdAt).format(
                                      "MMMM YYYY"
                                   )
                                 : ""}
                           </span>
                        </div>
                        <div className="flex items-center text-theme-medium mb-3">
                           <img
                              src="/img/clock.png"
                              alt=""
                              className="w-4 h-4 mr-2"
                           />
                           <span>
                              {data.deliveryTime
                                 ? `${data.deliveryTime} Days Delivery`
                                 : "Delivery time depends on work."}
                           </span>
                        </div>

                        {/* Price */}
                        <div className="flex justify-between items-center">
                           <span className="font-semibold text-xl text-theme-dark">
                              Rs. {data.price}
                           </span>
                        </div>

                        {/* Order Button */}
                        <div className="flex justify-center items-center text-white rounded-lg mt-4 p-2 border-3 transition-all duration-500 bg-theme-dark font-bold hover:bg-theme-light hover:border-amber-900 hover:text-theme-dark">
                           <button
                              onClick={() => handleCreateOrder()}
                              className="">
                              Continue
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default Gig;
