import React from "react";
import "./Review.scss";
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
      <>
         <div className="review">
            {isLoading ? (
               <div class="flex-col gap-4 w-full h-screen flex items-center justify-center">
                  <div class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                     <div class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                  </div>
               </div>
            ) : error ? (
               "Something went wrong!"
            ) : (
               <div className="user">
                  <img
                     className="pp"
                     src={data.img || "/img/avatar.png"}
                     alt=""
                  />
                  <div className="info">
                     <span>{data.username}</span>
                     <div className="country">
                        <span>{data.country}</span>
                     </div>
                  </div>
               </div>
            )}
            <div className="stars">
               {Array(review.star)
                  .fill()
                  .map((item, i) => (
                     <img src="/img/star.png" alt="" key={i} />
                  ))}

               <span>{review.star}</span>
            </div>
            <p>{review.desc}</p>
         </div>
      </>
   );
};

export default Review;
