import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Clock, Star } from "lucide-react";
import newRequest from "../../utils/newRequest";
import { formatPrice, ratingText } from "../../utils/format";
import { Avatar, Badge, Picture } from "../ui/ui";

const GigCard = ({ item }) => {
   const { data: seller } = useQuery({
      queryKey: ["user", item.userId],
      queryFn: () => newRequest.get(`/users/${item.userId}`).then((res) => res.data),
      enabled: !!item.userId,
   });
   const city = item.country || seller?.country;

   return (
      <Link
         to={`/gig/${item._id}`}
         className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white text-ink transition-shadow hover:shadow-[0_10px_28px_rgba(43,13,7,0.10)]">
         <Picture src={item.cover} alt="" className="h-44 w-full" />
         <div className="flex flex-1 flex-col gap-2.5 p-4">
            <div className="flex min-w-0 items-center gap-2 text-sm text-muted">
               <Avatar user={seller} name={item.shortTitle} size={28} />
               <span className="truncate font-semibold text-ink">{seller?.username || item.shortTitle}</span>
               {city && <span className="shrink-0">· {city}</span>}
            </div>
            <h3 className="m-0 text-[17px] font-semibold leading-snug group-hover:underline">{item.title}</h3>
            <div className="flex-1" />
            <div className="flex items-center gap-2 text-sm">
               {item.starNumber > 0 ? (
                  <span className="flex items-center gap-1">
                     <Star size={16} className="fill-[#e0a100] text-[#e0a100]" aria-hidden="true" />
                     <strong>{ratingText(item)}</strong>
                     <span className="text-muted">({item.starNumber})</span>
                  </span>
               ) : (
                  <Badge tone="info">New</Badge>
               )}
               <span className="flex-1" />
               {item.deliveryTime > 0 && (
                  <span className="flex items-center gap-1 text-muted">
                     <Clock size={15} aria-hidden="true" />
                     {item.deliveryTime} {item.deliveryTime === 1 ? "day" : "days"}
                  </span>
               )}
            </div>
            <div className="flex items-baseline justify-between border-t border-[#f0e3d9] pt-2.5">
               <span className="text-[13px] text-muted">Starting at</span>
               <span className="text-lg font-bold">{formatPrice(item.price)}</span>
            </div>
         </div>
      </Link>
   );
};

export default GigCard;
