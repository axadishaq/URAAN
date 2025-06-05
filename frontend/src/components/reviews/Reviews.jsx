import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Review from "../review/Review";
import newRequest from "../../utils/newRequest";

const Reviews = ({ gigId }) => {
   const queryClient = useQueryClient();

   const { isLoading, error, data } = useQuery({
      queryKey: [gigId],
      queryFn: () =>
         newRequest.get(`/reviews/${gigId}`).then((res) => {
            return res.data;
         }),
   });
   // tanstack mutation
   const mutation = useMutation({
      mutationFn: (review) => {
         return newRequest.post("/reviews", review);
      },
      onSuccess: () => {
         queryClient.invalidateQueries(["reviews"]);
      },
   });
   const handleSubmit = (e) => {
      e.preventDefault();
      const desc = e.target[0].value;
      const star = e.target[1].value;
      mutation.mutate({ gigId, desc, star });
   };

   return (
      <div className="flex flex-col gap-4">
         {isLoading
            ? "loading..."
            : error
            ? "Something went wrong!"
            : data.map((review) => <Review key={review._id} review={review} />)}
         <div className="text-md ">
            <h3 className="text-xl font-semibold mb-4">Add a review </h3>
            <form action="" className="flex gap-2" onSubmit={handleSubmit}>
               <input
                  type="text"
                  name=""
                  id=""
                  className="w-full h-14 px-4 py-1 rounded-lg border border-theme-accent focus:outline-none focus:ring-2 focus:ring-theme-accent"
                  placeholder="write your opinion"
               />
               <select
                  name=""
                  id=""
                  className="h-14 px-4 py-1 rounded-lg border border-theme-accent focus:outline-none focus:ring-2 focus:ring-theme-accent">
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
               </select>
               <button className="w-30 text-white rounded-lg px-4 py-3 border-3 transition-all duration-500 bg-theme-dark font-bold hover:bg-theme-accent hover:border-amber-900 hover:text-theme-dark">
                  Send
               </button>
            </form>
         </div>
      </div>
   );
};

export default Reviews;
