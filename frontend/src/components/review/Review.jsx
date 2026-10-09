import React from "react";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import newRequest from "../../utils/newRequest";
import { Avatar } from "../ui/ui";

const Review = ({ review }) => {
   const { data } = useQuery({
      queryKey: ["user", review.userId],
      queryFn: () => newRequest.get(`/users/${review.userId}`).then((res) => res.data),
   });
   return (
      <article className="flex flex-col gap-2 border-t border-[#f0e3d9] py-4">
         <div className="flex items-center gap-2.5">
            <Avatar user={data} size={36} />
            <span className="flex min-w-0 flex-col">
               <strong className="text-[15px]">{data?.username || "Former customer"}</strong>
               <span className="text-[13px] text-muted">
                  {data?.country ? `${data.country} · ` : ""}
                  {moment(review.createdAt).fromNow()}
               </span>
            </span>
            <span className="flex-1" />
            <span className="flex items-center gap-1 text-sm font-bold" aria-label={`${review.star} out of 5 stars`}>
               <Star size={15} className="fill-[#e0a100] text-[#e0a100]" aria-hidden="true" />
               {review.star}
            </span>
         </div>
         <p className="m-0 whitespace-pre-line text-[15px] leading-relaxed text-[#3e2219]">{review.desc}</p>
      </article>
   );
};

export default Review;
