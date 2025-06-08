import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Review = ({ review }) => {
   const { isLoading, error, data } = useQuery({
      queryKey: [review.userId],
      queryFn: () =>
         newRequest.get(`/users/${review.userId}`).then((res) => {
            return res.data;
         }),
   });
   return (
      <div className="flex flex-col gap-5 my-5">
         {isLoading ? (
            <div className="flex flex-col gap-4 w-full h-screen items-center justify-center">
               <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                  <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
               </div>
            </div>
         ) : error ? (
            "Something went wrong!"
         ) : (
            <div className="flex items-center">
               <img
                  className="h-[50px] w-[50px] rounded-full object-cover"
                  src={data.img || "/img/avatar.png"}
                  alt=""
               />
               <div className="ml-4">
                  <span className="block font-semibold">{data.username}</span>
                  <div className="flex items-center gap-2 text-gray-500">
                     {/* If you want to show a flag, add <img src="..." alt="" className="w-5" /> here */}
                     <span>{data.country}</span>
                  </div>
               </div>
            </div>
         )}
         <div className="flex items-center gap-1">
            {Array(review.star)
               .fill()
               .map((item, i) => (
                  <img
                     src="/img/star.png"
                     alt=""
                     key={i}
                     className="h-[14px] w-[14px]"
                  />
               ))}
            <span className="text-[14px] font-bold text-[#ffc108] ml-1">
               {review.star}
            </span>
         </div>
         <p>{review.desc}</p>
      </div>
   );
};

export default Review;
