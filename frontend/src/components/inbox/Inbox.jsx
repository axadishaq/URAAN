import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Search } from "lucide-react";

import newRequest, { getErrorMessage } from "../../utils/newRequest";
import { getCurrentUser } from "../../utils/currentUser";
import { isReadByMe, otherUserId } from "../../utils/conversations";
import { Avatar, EmptyState, Notice, Spinner } from "../ui/ui";


// Conversation list used by the Messages page and next to an open chat
const Inbox = ({ activeId, className = "" }) => {
   const me = getCurrentUser()?._id;
   const [showUnread, setShowUnread] = useState(false);
   const [search, setSearch] = useState("");

   const { isLoading, error, data } = useQuery({
      queryKey: ["conversations", me],
      queryFn: () => newRequest.get(`/conversations`).then((res) => res.data),
      enabled: !!me,
      refetchInterval: 10000,
   });
   const conversations = data || [];

   // names are needed for search and display
   const people = useQueries({
      queries: conversations.map((c) => ({
         queryKey: ["user", otherUserId(c, me)],
         queryFn: () => newRequest.get(`/users/${otherUserId(c, me)}`).then((res) => res.data),
      })),
   });
   const userFor = (c) => people[conversations.indexOf(c)]?.data;

   const unreadCount = conversations.filter((c) => !isReadByMe(c, me)).length;
   const term = search.trim().toLowerCase();
   const list = conversations.filter(
      (c) =>
         (!showUnread || !isReadByMe(c, me)) &&
         (!term ||
            c.lastMessage?.toLowerCase().includes(term) ||
            userFor(c)?.username?.toLowerCase().includes(term))
   );

   const pill = (on) =>
      `h-9 rounded-full px-3.5 text-sm font-semibold ${on ? "bg-ink text-white" : "border border-line-strong bg-white text-ink"}`;

   return (
      <section aria-label="Conversations" className={`flex min-h-0 flex-col ${className}`}>
         <div className="flex flex-col gap-3 px-[18px] pb-3 pt-[18px]">
            <h1 className="m-0 font-display text-[28px] font-bold">Messages</h1>
            <label className="flex h-11 items-center gap-2 rounded-[10px] border border-line bg-cream px-3">
               <Search size={18} className="text-subtle" aria-hidden="true" />
               <span className="sr-only">Search conversations</span>
               <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or message"
                  className="min-w-0 flex-1 bg-transparent text-[15px] focus:outline-none"
               />
            </label>
            <div role="tablist" className="flex gap-1.5">
               <button type="button" role="tab" aria-selected={!showUnread} onClick={() => setShowUnread(false)} className={pill(!showUnread)}>
                  All
               </button>
               <button type="button" role="tab" aria-selected={showUnread} onClick={() => setShowUnread(true)} className={pill(showUnread)}>
                  Unread{unreadCount ? ` (${unreadCount})` : ""}
               </button>
            </div>
         </div>

         {isLoading ? (
            <Spinner label="Loading conversations" />
         ) : error ? (
            <div className="p-4">
               <Notice>{getErrorMessage(error)}</Notice>
            </div>
         ) : list.length === 0 ? (
            <EmptyState
               title={showUnread ? "No unread messages" : term ? "No matches" : "No messages yet"}
               text={showUnread || term ? null : "Start a chat from a service page or one of your orders."}
            />
         ) : (
            <ul className="m-0 min-h-0 flex-1 list-none overflow-y-auto p-0">
               {list.map((c) => {
                  const other = userFor(c);
                  const unread = !isReadByMe(c, me);
                  const active = c.id === activeId;
                  return (
                     <li key={c.id}>
                        <Link
                           to={`/message/${c.id}`}
                           aria-current={active ? "page" : undefined}
                           className={`flex items-center gap-3 border-l-[3px] px-[18px] py-3 ${
                              active ? "border-ink bg-blush" : "border-transparent hover:bg-cream"
                           }`}>
                           <Avatar user={other} size={44} />
                           <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                              <span className="flex justify-between gap-2">
                                 <strong className="truncate text-[15px] text-ink">{other?.username || "…"}</strong>
                                 <span className="shrink-0 text-xs text-muted">{moment(c.updatedAt).fromNow(true)}</span>
                              </span>
                              <span className={`truncate text-sm ${unread ? "font-semibold text-ink" : "text-muted"}`}>
                                 {c.lastMessage || "No messages yet"}
                              </span>
                           </span>
                           {unread && <span aria-label="Unread" className="h-2.5 w-2.5 shrink-0 rounded-full bg-clay" />}
                        </Link>
                     </li>
                  );
               })}
            </ul>
         )}
      </section>
   );
};

export default Inbox;
