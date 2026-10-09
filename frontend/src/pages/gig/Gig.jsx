import React, { useState } from "react";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Clock, MapPin, MessageCircle, RefreshCw, Star } from "lucide-react";

import newRequest, { getErrorMessage } from "../../utils/newRequest";
import { getCurrentUser } from "../../utils/currentUser";
import { categoryLabel } from "../../utils/categories";
import { formatPrice, ratingText } from "../../utils/format";
import Reviews from "../../components/reviews/Reviews";
import { Avatar, Breadcrumb, EmptyState, Notice, Picture, Spinner } from "../../components/ui/ui";
import { btn } from "../../components/ui/styles";
import { useToast } from "../../components/ui/Toast";

const card = "rounded-2xl border border-line bg-white p-6";

function Gig() {
   const { id } = useParams();
   const navigate = useNavigate();
   const queryClient = useQueryClient();
   const toast = useToast();
   const currentUser = getCurrentUser();
   const [message, setMessage] = useState(null);
   const [busy, setBusy] = useState(false);
   const [activeImage, setActiveImage] = useState(0);

   const { isLoading, error, data } = useQuery({
      queryKey: ["gig", id],
      queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
   });

   const userId = data?.userId;
   const { data: seller } = useQuery({
      queryKey: ["user", userId],
      queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data),
      enabled: !!userId,
   });

   if (isLoading) return <Spinner label="Loading service" />;
   if (error)
      return (
         <div className="mx-auto max-w-xl px-4 py-16">
            <EmptyState
               title={getErrorMessage(error, "Service not found.")}
               text="It may have been removed by its provider."
               action={
                  <Link to="/gigs" className={btn.secondary}>
                     Browse services
                  </Link>
               }
            />
         </div>
      );

   const isOwner = currentUser && currentUser._id === data.userId;
   const images = [...new Set([data.cover, ...(data.images || [])].filter(Boolean))];
   const city = data.country || seller?.country;
   const sellerName = seller?.username || data.shortTitle;

   const requireLogin = (text) => {
      toast({ type: "info", title: "Please log in first", text });
      navigate("/login", { state: { from: { pathname: `/gig/${id}` } } });
   };

   const handleOrder = async () => {
      if (!currentUser) return requireLogin("You need an account to order a service.");
      setBusy(true);
      setMessage(null);
      try {
         await newRequest.post(`/orders/${id}`);
         queryClient.invalidateQueries({ queryKey: ["orders"] });
         toast({ title: "Order placed", text: `${sellerName} can see it now. Agree on the details in chat.` });
         navigate("/orders");
      } catch (err) {
         setMessage(getErrorMessage(err, "Failed to create order."));
         setBusy(false);
      }
   };

   const handleContact = async () => {
      if (!currentUser) return requireLogin("You need an account to message a provider.");
      try {
         const res = await newRequest.post(`/conversations`, { to: data.userId });
         navigate(`/message/${res.data.id}`);
      } catch (err) {
         setMessage(getErrorMessage(err, "Could not start a conversation."));
      }
   };

   return (
      <div className="bg-cream">
         <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 pb-16 pt-7 sm:px-5">
            <Breadcrumb
               items={[
                  { label: "Home", to: "/" },
                  { label: categoryLabel(data.category), to: `/gigs?category=${data.category}` },
                  { label: data.title },
               ]}
            />

            <div className="flex flex-col gap-3.5">
               <h1 className="m-0 font-display text-3xl font-bold leading-tight tracking-tight sm:text-[40px]">
                  {data.title}
               </h1>
               <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] text-muted">
                  <span className="flex items-center gap-2.5">
                     <Avatar user={seller} name={sellerName} size={36} />
                     <strong className="text-ink">{sellerName}</strong>
                  </span>
                  {data.starNumber > 0 ? (
                     <span className="flex items-center gap-1">
                        <Star size={16} className="fill-[#e0a100] text-[#e0a100]" aria-hidden="true" />
                        <strong className="text-ink">{ratingText(data)}</strong> ({data.starNumber}{" "}
                        {data.starNumber === 1 ? "review" : "reviews"})
                     </span>
                  ) : (
                     <span>No reviews yet</span>
                  )}
                  {city && (
                     <span className="flex items-center gap-1">
                        <MapPin size={16} aria-hidden="true" />
                        {city}
                     </span>
                  )}
                  {data.sales > 0 && <span>{data.sales} orders</span>}
               </div>
            </div>

            {message && <Notice onClose={() => setMessage(null)}>{message}</Notice>}

            <div className="flex flex-col-reverse items-start gap-8 lg:flex-row">
               <div className="flex w-full min-w-0 flex-1 flex-col gap-6">
                  {images.length > 0 && (
                     <section aria-label="Photos" className="flex flex-col gap-3">
                        <Picture
                           src={images[Math.min(activeImage, images.length - 1)]}
                           alt={data.title}
                           className="h-72 w-full rounded-2xl bg-white object-contain sm:h-[420px]"
                        />
                        {images.length > 1 && (
                           <div className="flex flex-wrap gap-2.5">
                              {images.map((img, i) => (
                                 <button
                                    type="button"
                                    key={img}
                                    onClick={() => setActiveImage(i)}
                                    aria-label={`Show photo ${i + 1}`}
                                    aria-pressed={i === activeImage}
                                    className={`overflow-hidden rounded-[10px] border-2 ${
                                       i === activeImage ? "border-ink" : "border-transparent"
                                    }`}>
                                    <img src={img} alt="" className="h-16 w-24 object-cover" />
                                 </button>
                              ))}
                           </div>
                        )}
                     </section>
                  )}

                  <section className={`${card} flex flex-col gap-3.5`}>
                     <h2 className="m-0 text-[22px] font-bold">About this service</h2>
                     <p className="m-0 whitespace-pre-line text-base leading-relaxed text-[#3e2219]">{data.desc}</p>
                     {data.features?.length > 0 && (
                        <>
                           <h3 className="mb-0 mt-2 text-[17px] font-bold">What's included</h3>
                           <ul className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2">
                              {data.features.map((f) => (
                                 <li key={f} className="flex items-center gap-2.5 text-[15px]">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success-bg text-success">
                                       <Check size={14} strokeWidth={3} aria-hidden="true" />
                                    </span>
                                    {f}
                                 </li>
                              ))}
                           </ul>
                        </>
                     )}
                  </section>

                  <section className={`${card} flex flex-wrap items-start gap-5`}>
                     <Avatar user={seller} name={sellerName} size={64} />
                     <div className="flex min-w-[240px] flex-1 flex-col gap-2">
                        <h2 className="m-0 text-xl font-bold">About {data.shortTitle || sellerName}</h2>
                        <span className="text-sm text-muted">
                           {[seller?.username !== data.shortTitle && seller?.username, city, seller?.createdAt && `On URAAN since ${moment(seller.createdAt).format("MMMM YYYY")}`]
                              .filter(Boolean)
                              .join(" · ")}
                        </span>
                        {(data.shortDesc || seller?.desc) && (
                           <p className="m-0 text-[15px] leading-relaxed text-[#3e2219]">{seller?.desc || data.shortDesc}</p>
                        )}
                     </div>
                     {!isOwner && (
                        <button type="button" onClick={handleContact} className={`${btn.small} border-ink`}>
                           <MessageCircle size={18} aria-hidden="true" />
                           Contact Me
                        </button>
                     )}
                  </section>

                  <section className={`${card} flex flex-col gap-5`}>
                     <h2 className="m-0 text-[22px] font-bold">Reviews</h2>
                     <Reviews gigId={id} sellerId={data.userId} />
                  </section>
               </div>

               <aside
                  aria-label="Order this service"
                  className="w-full shrink-0 rounded-2xl border border-line bg-white p-6 shadow-[0_8px_24px_rgba(43,13,7,0.06)] lg:sticky lg:top-24 lg:w-[360px]">
                  <div className="flex flex-col gap-4">
                     <div className="flex items-baseline justify-between">
                        <span className="text-sm text-muted">Price</span>
                        <span className="font-display text-[32px] font-bold">{formatPrice(data.price)}</span>
                     </div>
                     <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px]">
                        <li className="flex items-center gap-2.5">
                           <Clock size={18} className="text-muted" aria-hidden="true" />
                           {data.deliveryTime
                              ? `Delivered in ${data.deliveryTime} ${data.deliveryTime === 1 ? "day" : "days"}`
                              : "Delivery time agreed in chat"}
                        </li>
                        {data.revisionNumber > 0 && (
                           <li className="flex items-center gap-2.5">
                              <RefreshCw size={18} className="text-muted" aria-hidden="true" />
                              {data.revisionNumber} {data.revisionNumber === 1 ? "revision" : "revisions"} included
                           </li>
                        )}
                        {city && (
                           <li className="flex items-center gap-2.5">
                              <MapPin size={18} className="text-muted" aria-hidden="true" />
                              Serves {city}
                           </li>
                        )}
                     </ul>
                     {isOwner ? (
                        <p className="m-0 rounded-xl bg-cream p-3 text-center text-[15px] text-muted">
                           This is your service.
                        </p>
                     ) : (
                        <>
                           <button type="button" onClick={handleOrder} disabled={busy} className={`${btn.primary} h-[52px] w-full`}>
                              {busy ? "Placing order..." : `Order now · ${formatPrice(data.price)}`}
                           </button>
                           <button type="button" onClick={handleContact} className={`${btn.secondary} w-full`}>
                              Message provider first
                           </button>
                        </>
                     )}
                     <p className="m-0 text-[13px] leading-normal text-muted">
                        No payment is taken online yet. After ordering, agree on the time and payment with
                        the provider in chat.
                     </p>
                  </div>
               </aside>
            </div>
         </div>
      </div>
   );
}

export default Gig;
