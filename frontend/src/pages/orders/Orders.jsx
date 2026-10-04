import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import moment from "moment";

import newRequest, { getErrorMessage } from "../../utils/newRequest.js";
import { getCurrentUser } from "../../utils/currentUser";
import { dueInfo, formatPrice } from "../../utils/format";
import { Badge, EmptyState, Notice, PageTitle, Picture, Spinner } from "../../components/ui/ui";
import { btn } from "../../components/ui/styles";
import { useToast } from "../../components/ui/Toast";

const TABS = ["All", "Pending", "Completed"];

const OrderRow = ({ order, me, onMessage, onComplete, completing }) => {
   const iAmSeller = order.sellerId === me;
   const otherId = iAmSeller ? order.buyerId : order.sellerId;
   const { data: other } = useQuery({
      queryKey: ["user", otherId],
      queryFn: () => newRequest.get(`/users/${otherId}`).then((res) => res.data),
   });
   const due = dueInfo(order);

   return (
      <li className="flex flex-wrap items-center gap-4 border-b border-[#f0e3d9] px-5 py-4 last:border-b-0">
         <Picture src={order.img} alt="" className="h-16 w-[88px] shrink-0 rounded-[10px]" />
         <div className="flex min-w-[220px] flex-1 flex-col gap-1">
            <Link to={`/gig/${order.gigId}`} className="text-base font-semibold text-ink hover:underline">
               {order.title}
            </Link>
            <span className="text-sm text-muted">
               {iAmSeller ? "Customer" : "Provider"}: {other?.username || "…"} · Ordered{" "}
               {moment(order.createdAt).format("D MMM YYYY")}
            </span>
         </div>
         <span className={`text-sm font-semibold ${due.late ? "text-danger" : "text-muted"}`}>{due.text}</span>
         <Badge tone={order.isCompleted ? "done" : "pending"}>{order.isCompleted ? "Completed" : "Pending"}</Badge>
         <span className="w-24 text-right text-base font-bold">{formatPrice(order.price)}</span>
         <div className="flex gap-2">
            <button
               type="button"
               onClick={() => onMessage(otherId)}
               aria-label={`Message ${other?.username || ""}`}
               className={btn.small}>
               <MessageCircle size={16} aria-hidden="true" />
               Message
            </button>
            {iAmSeller && !order.isCompleted && (
               <button
                  type="button"
                  disabled={completing}
                  onClick={() => onComplete(order)}
                  className={btn.success}>
                  Mark complete
               </button>
            )}
            {!iAmSeller && order.isCompleted && (
               <Link to={`/gig/${order.gigId}`} className={btn.smallDark}>
                  Leave a review
               </Link>
            )}
         </div>
      </li>
   );
};

const Orders = () => {
   const currentUser = getCurrentUser();
   const me = currentUser?._id;
   const [tab, setTab] = useState("All");
   const [side, setSide] = useState(currentUser?.isSeller ? "selling" : "buying");
   const [actionError, setActionError] = useState("");

   const navigate = useNavigate();
   const queryClient = useQueryClient();
   const toast = useToast();

   const { isLoading, error, data } = useQuery({
      queryKey: ["orders", me],
      queryFn: () => newRequest.get(`/orders`).then((res) => res.data),
      enabled: !!me,
   });

   const completeMutation = useMutation({
      mutationFn: (order) => newRequest.put(`/orders/${order._id}/complete`),
      onSuccess: (_, order) => {
         queryClient.invalidateQueries({ queryKey: ["orders"] });
         toast({ title: "Order completed", text: `"${order.title}" is marked as delivered.` });
      },
      onError: (err) => setActionError(getErrorMessage(err)),
   });

   const handleMessage = async (otherId) => {
      setActionError("");
      try {
         // creates the conversation, or returns the existing one
         const res = await newRequest.post(`/conversations`, { to: otherId });
         navigate(`/message/${res.data.id}`);
      } catch (err) {
         setActionError(getErrorMessage(err, "Could not open the chat."));
      }
   };

   const handleComplete = (order) => {
      if (window.confirm(`Mark "${order.title}" as completed?`)) completeMutation.mutate(order);
   };

   const all = data || [];
   const selling = all.filter((o) => o.sellerId === me);
   const buying = all.filter((o) => o.buyerId === me);
   const list = side === "selling" ? selling : buying;
   const matches = (o, name) => name === "All" || (name === "Completed" ? o.isCompleted : !o.isCompleted);
   const rows = list.filter((o) => matches(o, tab));
   const showSwitch = currentUser?.isSeller || selling.length > 0;

   const seg = (on) =>
      `h-10 rounded-[9px] px-[18px] text-[15px] font-semibold ${
         on ? "bg-white text-ink shadow-[0_1px_2px_rgba(43,13,7,0.1)]" : "text-muted hover:text-ink"
      }`;

   return (
      <div className="bg-cream">
         <div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-4 pb-14 pt-9 sm:px-5">
            <PageTitle
               title="Orders"
               text={showSwitch ? "Track what you bought and what customers ordered from you." : "Track the services you ordered."}
               action={
                  showSwitch && (
                     <div role="group" aria-label="Show orders" className="flex gap-1 rounded-xl bg-[#f0e3d9] p-1">
                        <button type="button" aria-pressed={side === "selling"} onClick={() => { setSide("selling"); setTab("All"); }} className={seg(side === "selling")}>
                           Selling ({selling.length})
                        </button>
                        <button type="button" aria-pressed={side === "buying"} onClick={() => { setSide("buying"); setTab("All"); }} className={seg(side === "buying")}>
                           Buying ({buying.length})
                        </button>
                     </div>
                  )
               }
            />

            {actionError && <Notice onClose={() => setActionError("")}>{actionError}</Notice>}

            <section className="overflow-hidden rounded-2xl border border-line bg-white">
               <div role="tablist" aria-label="Status" className="flex gap-1 overflow-x-auto border-b border-line px-3">
                  {TABS.map((name) => {
                     const on = name === tab;
                     const count = list.filter((o) => matches(o, name)).length;
                     return (
                        <button
                           key={name}
                           type="button"
                           role="tab"
                           aria-selected={on}
                           onClick={() => setTab(name)}
                           className={`flex h-[52px] items-center gap-2 border-b-[3px] px-3.5 text-[15px] font-semibold ${
                              on ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"
                           }`}>
                           {name}
                           <span
                              className={`inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-full px-1.5 text-xs ${
                                 on ? "bg-ink text-white" : "bg-[#f0e3d9] text-ink"
                              }`}>
                              {count}
                           </span>
                        </button>
                     );
                  })}
               </div>

               {isLoading ? (
                  <Spinner label="Loading orders" />
               ) : error ? (
                  <div className="p-4">
                     <Notice>{getErrorMessage(error)}</Notice>
                  </div>
               ) : rows.length === 0 ? (
                  <EmptyState
                     title={list.length ? `No ${tab.toLowerCase()} orders` : "No orders yet"}
                     text={
                        side === "selling"
                           ? "Orders for your services will appear here."
                           : "When you order a service it will appear here."
                     }
                     action={
                        side === "buying" && !list.length ? (
                           <Link to="/gigs" className={btn.primary}>
                              Browse services
                           </Link>
                        ) : null
                     }
                  />
               ) : (
                  <ul className="m-0 list-none p-0">
                     {rows.map((order) => (
                        <OrderRow
                           key={order._id}
                           order={order}
                           me={me}
                           onMessage={handleMessage}
                           onComplete={handleComplete}
                           completing={completeMutation.isPending}
                        />
                     ))}
                  </ul>
               )}
            </section>
         </div>
      </div>
   );
};

export default Orders;
