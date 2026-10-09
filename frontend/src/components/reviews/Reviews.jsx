import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

import Review from "../review/Review";
import newRequest, { getErrorMessage } from "../../utils/newRequest";
import { getCurrentUser } from "../../utils/currentUser";
import { Stars, Notice, Spinner } from "../ui/ui";
import { btn } from "../ui/styles";
import { useToast } from "../ui/Toast";

const StarPicker = ({ value, onChange }) => (
   <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
      <legend className="mb-2 text-sm font-semibold">Your rating</legend>
      <div className="flex gap-1">
         {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="cursor-pointer" title={`${n} star${n > 1 ? "s" : ""}`}>
               <input
                  type="radio"
                  name="star"
                  value={n}
                  checked={value === n}
                  onChange={() => onChange(n)}
                  className="peer sr-only"
               />
               <Star
                  size={30}
                  aria-hidden="true"
                  className={`rounded peer-focus-visible:outline-2 peer-focus-visible:outline-clay ${
                     n <= value ? "fill-[#e0a100] text-[#e0a100]" : "text-line-strong"
                  }`}
               />
               <span className="sr-only">{n} stars</span>
            </label>
         ))}
      </div>
   </fieldset>
);

const Reviews = ({ gigId, sellerId }) => {
   const queryClient = useQueryClient();
   const toast = useToast();
   const currentUser = getCurrentUser();
   const me = currentUser?._id;
   const [desc, setDesc] = useState("");
   const [star, setStar] = useState(5);
   const [formError, setFormError] = useState("");

   const { isLoading, error, data } = useQuery({
      queryKey: ["reviews", gigId],
      queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
   });

   // Reviews are allowed only after ordering
   const { data: orders } = useQuery({
      queryKey: ["orders", me],
      queryFn: () => newRequest.get(`/orders`).then((res) => res.data),
      enabled: !!me && me !== sellerId,
   });
   const hasOrdered = (orders || []).some((o) => o.gigId === gigId && o.buyerId === me);

   const mutation = useMutation({
      mutationFn: (review) => newRequest.post("/reviews", review),
      onSuccess: () => {
         setDesc("");
         setStar(5);
         queryClient.invalidateQueries({ queryKey: ["reviews", gigId] });
         // rating on the gig changed too
         queryClient.invalidateQueries({ queryKey: ["gig", gigId] });
         toast({ title: "Thanks for your review" });
      },
      onError: (err) => setFormError(getErrorMessage(err, "Could not add your review.")),
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      setFormError("");
      if (!desc.trim()) return setFormError("Please write a few words about the service.");
      mutation.mutate({ gigId, desc: desc.trim(), star: Number(star) });
   };

   const reviews = data || [];
   const alreadyReviewed = reviews.some((r) => r.userId === me);
   const isOwner = me && me === sellerId;
   const average = reviews.length ? reviews.reduce((s, r) => s + r.star, 0) / reviews.length : 0;

   return (
      <div className="flex flex-col gap-5">
         {isLoading ? (
            <Spinner label="Loading reviews" />
         ) : error ? (
            <Notice>{getErrorMessage(error, "Could not load reviews.")}</Notice>
         ) : reviews.length === 0 ? (
            <p className="m-0 text-muted">No reviews yet.</p>
         ) : (
            <>
               <div className="flex flex-wrap items-center gap-8">
                  <div className="flex flex-col items-start gap-1">
                     <span className="font-display text-5xl font-bold leading-none">{average.toFixed(1)}</span>
                     <Stars value={average} size={18} />
                     <span className="text-sm text-muted">
                        {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                     </span>
                  </div>
                  <div className="flex min-w-[240px] flex-1 flex-col gap-1.5">
                     {[5, 4, 3, 2, 1].map((n) => {
                        const count = reviews.filter((r) => r.star === n).length;
                        return (
                           <div key={n} className="flex items-center gap-2.5 text-[13px] text-muted">
                              <span className="w-12">{n} star</span>
                              <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#f0e3d9]">
                                 <span
                                    className="block h-full rounded-full bg-ink"
                                    style={{ width: `${(count / reviews.length) * 100}%` }}
                                 />
                              </span>
                              <span className="w-6 text-right">{count}</span>
                           </div>
                        );
                     })}
                  </div>
               </div>
               <div className="flex flex-col">
                  {reviews.map((review) => (
                     <Review key={review._id} review={review} />
                  ))}
               </div>
            </>
         )}

         {!isOwner && !alreadyReviewed && (
            <div>
               {!currentUser ? (
                  <p className="m-0 rounded-xl border border-dashed border-line-strong bg-cream p-4 text-[15px]">
                     <Link to="/login" state={{ from: { pathname: `/gig/${gigId}` } }} className="font-semibold text-clay underline">
                        Log in
                     </Link>{" "}
                     to review this service after ordering it.
                  </p>
               ) : !hasOrdered ? (
                  <p className="m-0 rounded-xl border border-dashed border-line-strong bg-cream p-4 text-[15px]">
                     You can review this service after you order it.
                  </p>
               ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-xl border border-line bg-cream p-4">
                     <h3 className="m-0 text-lg font-bold">Add a review</h3>
                     {formError && <Notice>{formError}</Notice>}
                     <StarPicker value={star} onChange={setStar} />
                     <label className="flex flex-col gap-1.5 text-sm font-semibold">
                        Your review
                        <textarea
                           rows={3}
                           value={desc}
                           onChange={(e) => setDesc(e.target.value)}
                           placeholder="What went well? Would you hire them again?"
                           className="resize-y rounded-[10px] border border-line-strong bg-white px-3.5 py-3 text-base font-normal focus:outline-none focus:ring-2 focus:ring-peach"
                        />
                     </label>
                     <button type="submit" disabled={mutation.isPending} className={`${btn.primary} self-start`}>
                        {mutation.isPending ? "Posting..." : "Post review"}
                     </button>
                  </form>
               )}
            </div>
         )}
      </div>
   );
};

export default Reviews;
