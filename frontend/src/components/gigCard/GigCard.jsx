import React from "react";
import "./GigCard.scss";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
   // const {id} = useParams();
   const { isLoading, error, data } = useQuery({
      queryKey: ["gigUser", item.userId],
      queryFn: () =>
         newRequest.get(`/users/${item.userId}`).then((res) => {
            return res.data;
         }),
   });

   return (
      <>
         {/* <Link to={`/gig/${item._id}`} className="link">
            <div className="gigCard">
               <img src={item.cover} alt="" />
               <div className="info">
                  {isLoading ? (
                     "loading..."
                  ) : error ? (
                     "Something went wrong!"
                  ) : (
                     <div className="user">
                        <img src={data.img || "/img/avatar.png"} alt="" />
                        <span>{data.username}</span>
                     </div>
                  )}
                  <p>{item.desc}</p>
                  <div className="star">
                     <img src="./img/star.png" alt="" />
                     <span>
                        {!isNaN(item.totalStars / item.starNumber) &&
                           Math.round(item.totalStars / item.starNumber)}
                     </span>
                  </div>
               </div>
               <hr />
               <div className="detail">
                  <img src="./img/heart.png" alt="" />
                  <div className="price">
                     <span>STARTING AT</span>
                     <h2>$ {item.price}</h2>
                  </div>
               </div>
            </div>
         </Link> */}
         <Link to={`/gig/${item._id}`} class="block transition-all">
            <div class="bg-white rounded-lg overflow-hidden shadow-lg duration-300 hover:transform hover:scale-103">
               {/* <!-- Gig Cover Image --> */}
               <div class="relative h-46">
                  <img
                     src={item.cover}
                     alt="Gig Cover"
                     class="w-full h-full object-cover"
                  />
               </div>

               {/* <!-- Info Section --> */}
               <div class="p-4 bg-white">
                  {/* <!-- User Info --> */}
                  {isLoading ? (
                     "loading..."
                  ) : error ? (
                     "Something went wrong!"
                  ) : (
                     <div class="flex items-center gap-2 mb-3">
                        <img
                           src={data.img || "/img/avatar.png"}
                           alt="User"
                           class="w-8 h-8 rounded-full object-cover"
                        />
                        <span class="text-sm text-theme-dark font-medium">
                           {data.username}
                        </span>
                     </div>
                  )}

                  {/* <!-- Description --> */}
                  <h1 class="text-theme-dark font-semibold mb-3 text-lg line-clamp-2">
                     {item.title}
                  </h1>
                  <p class="text-theme-light  text-sm line-clamp-2">
                     {item.desc}{" "}
                  </p>
               </div>

               {/* <!-- Divider --> */}
               <hr class="border-theme-accent" />

               {/* <!-- Detail Section --> */}
               <div class="p-4 flex justify-between items-center">
                  <div class="text-right">
                     <span class="text-xs text-theme-medium block">
                        STARTING FROM
                     </span>
                     <h2 class="text-xl font-bold text-theme-dark">
                        Rs. {item.price}
                     </h2>
                  </div>
                  {/* <!-- Rating --> */}
                  <div class="flex items-center gap-1">
                     <div class="flex text-yellow-400">
                        <img src="./img/star.png" alt="" className="h-5 w-5" />
                     </div>
                     <span class="text-theme-medium text-sm">
                        {!isNaN(item.totalStars / item.starNumber) &&
                           Math.round(item.totalStars / item.starNumber)}
                     </span>
                  </div>
               </div>
            </div>
         </Link>
      </>
   );
};

export default GigCard;
