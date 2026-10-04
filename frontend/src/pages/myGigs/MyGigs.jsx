import React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Star } from "lucide-react";
import newRequest, { getErrorMessage } from "../../utils/newRequest";
import { getCurrentUser } from "../../utils/currentUser";
import { categoryLabel } from "../../utils/categories";
import { formatPrice, ratingText } from "../../utils/format";
import { EmptyState, Notice, PageTitle, Picture, Spinner } from "../../components/ui/ui";
import { btn } from "../../components/ui/styles";
import { useToast } from "../../components/ui/Toast";

function MyGigs() {
   const currentUser = getCurrentUser();
   const queryClient = useQueryClient();
   const toast = useToast();

   const { isLoading, error, data } = useQuery({
      queryKey: ["myGigs", currentUser?._id],
      queryFn: () => newRequest.get(`/gigs?userId=${currentUser._id}&sort=createdAt`).then((res) => res.data),
   });

   const mutation = useMutation({
      mutationFn: (gig) => newRequest.delete(`/gigs/${gig._id}`),
      onSuccess: (_, gig) => {
         queryClient.invalidateQueries({ queryKey: ["myGigs"] });
         queryClient.invalidateQueries({ queryKey: ["gigs"] });
         toast({ title: "Service deleted", text: `"${gig.title}" was removed.` });
      },
      onError: (err) => toast({ type: "error", title: "Could not delete the service", text: getErrorMessage(err) }),
   });

   const handleDelete = (gig) => {
      if (window.confirm(`Delete "${gig.title}"? This can't be undone.`)) mutation.mutate(gig);
   };

   const gigs = data || [];

   return (
      <div className="bg-cream">
         <div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-4 pb-14 pt-9 sm:px-5">
            <PageTitle
               title="My services"
               text="Services you offer on URAAN."
               action={
                  <Link to="/add" className={btn.primary}>
                     <Plus size={18} aria-hidden="true" />
                     Post a service
                  </Link>
               }
            />
            <section className="overflow-hidden rounded-2xl border border-line bg-white">
               {isLoading ? (
                  <Spinner label="Loading services" />
               ) : error ? (
                  <div className="p-4">
                     <Notice>{getErrorMessage(error)}</Notice>
                  </div>
               ) : gigs.length === 0 ? (
                  <EmptyState
                     title="No services yet"
                     text="Post your first service so customers in your city can find you."
                     action={
                        <Link to="/add" className={btn.primary}>
                           Post a service
                        </Link>
                     }
                  />
               ) : (
                  <ul className="m-0 list-none p-0">
                     {gigs.map((gig) => (
                        <li key={gig._id} className="flex flex-wrap items-center gap-4 border-b border-[#f0e3d9] px-5 py-4 last:border-b-0">
                           <Picture src={gig.cover} alt="" className="h-16 w-[88px] shrink-0 rounded-[10px]" />
                           <div className="flex min-w-[220px] flex-1 flex-col gap-1">
                              <Link to={`/gig/${gig._id}`} className="font-semibold text-ink hover:underline">
                                 {gig.title}
                              </Link>
                              <span className="text-sm text-muted">
                                 {categoryLabel(gig.category)} · {gig.sales || 0} orders ·{" "}
                                 {gig.starNumber > 0 ? (
                                    <span className="inline-flex items-center gap-1">
                                       <Star size={13} className="fill-[#e0a100] text-[#e0a100]" aria-hidden="true" />
                                       {ratingText(gig)}
                                    </span>
                                 ) : (
                                    "No reviews yet"
                                 )}
                              </span>
                           </div>
                           <span className="w-24 text-right font-bold">{formatPrice(gig.price)}</span>
                           <div className="flex gap-2">
                              <Link to={`/gig/${gig._id}`} className={btn.small}>
                                 View
                              </Link>
                              <button type="button" onClick={() => handleDelete(gig)} disabled={mutation.isPending} className={btn.danger}>
                                 Delete
                              </button>
                           </div>
                        </li>
                     ))}
                  </ul>
               )}
            </section>
         </div>
      </div>
   );
}

export default MyGigs;
