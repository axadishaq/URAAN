import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { ArrowLeft, SendHorizontal } from "lucide-react";

import newRequest, { getErrorMessage } from "../../utils/newRequest.js";
import { getCurrentUser } from "../../utils/currentUser";
import Inbox from "../../components/inbox/Inbox";
import { Avatar, EmptyState, Notice, Spinner } from "../../components/ui/ui";
import { btn } from "../../components/ui/styles";

const dayLabel = (date) => {
   const d = moment(date);
   if (d.isSame(moment(), "day")) return "Today";
   if (d.isSame(moment().subtract(1, "day"), "day")) return "Yesterday";
   return d.format("D MMMM YYYY");
};

const Message = () => {
   const { id } = useParams();
   const currentUser = getCurrentUser();
   const [text, setText] = useState("");
   const [sendError, setSendError] = useState("");
   const listRef = useRef(null);
   const queryClient = useQueryClient();

   const { data: conversation, error: convError } = useQuery({
      queryKey: ["conversation", id],
      queryFn: () => newRequest.get(`/conversations/single/${id}`).then((res) => res.data),
   });
   const otherId = conversation
      ? conversation.sellerId === currentUser?._id
         ? conversation.buyerId
         : conversation.sellerId
      : null;
   const { data: otherUser } = useQuery({
      queryKey: ["user", otherId],
      queryFn: () => newRequest.get(`/users/${otherId}`).then((res) => res.data),
      enabled: !!otherId,
   });

   const { isLoading, error, data } = useQuery({
      queryKey: ["messages", id],
      queryFn: () => newRequest.get(`/messages/${id}`).then((res) => res.data),
      enabled: !convError,
      // poll so new messages show up without reloading the page
      refetchInterval: 4000,
   });

   // Opening the chat marks it as read
   const messageCount = data?.length;
   useEffect(() => {
      if (messageCount === undefined) return;
      newRequest
         .put(`/conversations/${id}`)
         .then(() => queryClient.invalidateQueries({ queryKey: ["conversations"] }))
         .catch(() => {});
   }, [id, messageCount, queryClient]);

   // keep the newest message in view
   useEffect(() => {
      if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
   }, [messageCount, id]);

   const mutation = useMutation({
      mutationFn: (message) => newRequest.post(`/messages`, message),
      onSuccess: () => {
         setText("");
         queryClient.invalidateQueries({ queryKey: ["messages", id] });
         queryClient.invalidateQueries({ queryKey: ["conversations"] });
      },
      onError: (err) => setSendError(getErrorMessage(err, "Message not sent.")),
   });
   const handleSubmit = (e) => {
      e.preventDefault();
      setSendError("");
      if (!text.trim() || mutation.isPending) return;
      mutation.mutate({ conversationId: id, desc: text.trim() });
   };

   const messages = data || [];

   return (
      <div className="bg-cream">
         <div className="mx-auto max-w-[1200px] px-4 pb-12 pt-7 sm:px-5">
            <div className="flex h-[calc(100vh-150px)] min-h-[560px] overflow-hidden rounded-2xl border border-line bg-white">
               <Inbox activeId={id} className="hidden w-[380px] shrink-0 border-r border-line md:flex" />

               <section aria-label={`Chat with ${otherUser?.username || ""}`} className="flex min-w-0 flex-1 flex-col">
                  <header className="flex items-center gap-3 border-b border-line px-4 py-3.5 sm:px-5">
                     <Link to="/messages" aria-label="Back to messages" className={`${btn.ghost} w-10 px-0 md:hidden`}>
                        <ArrowLeft size={20} />
                     </Link>
                     <Avatar user={otherUser} size={44} />
                     <span className="flex min-w-0 flex-1 flex-col">
                        <strong className="truncate text-base">{otherUser?.username || "…"}</strong>
                        {otherUser?.country && <span className="text-[13px] text-muted">{otherUser.country}</span>}
                     </span>
                     <Link to="/orders" className={btn.small}>
                        View orders
                     </Link>
                  </header>

                  {convError ? (
                     <EmptyState
                        title={getErrorMessage(convError, "Conversation not found.")}
                        action={
                           <Link to="/messages" className={btn.secondary}>
                              Back to messages
                           </Link>
                        }
                     />
                  ) : (
                     <>
                        <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto bg-cream p-4 sm:p-5">
                           {isLoading ? (
                              <Spinner label="Loading messages" />
                           ) : error ? (
                              <Notice>{getErrorMessage(error, "Error loading messages.")}</Notice>
                           ) : messages.length === 0 ? (
                              <p className="m-auto text-center text-muted">No messages yet. Say hello!</p>
                           ) : (
                              messages.map((m, i) => {
                                 const mine = m.userId === currentUser?._id;
                                 const newDay = i === 0 || !moment(m.createdAt).isSame(messages[i - 1].createdAt, "day");
                                 return (
                                    <React.Fragment key={m._id}>
                                       {newDay && (
                                          <span className="self-center rounded-full bg-[#f0e3d9] px-3 py-1 text-xs font-semibold text-muted">
                                             {dayLabel(m.createdAt)}
                                          </span>
                                       )}
                                       <div className={`flex max-w-[78%] flex-col gap-1 ${mine ? "items-end self-end" : "self-start"}`}>
                                          <p
                                             className={`m-0 whitespace-pre-line break-words rounded-2xl px-3.5 py-3 text-[15px] leading-normal ${
                                                mine
                                                   ? "rounded-br-[4px] bg-ink text-white"
                                                   : "rounded-bl-[4px] border border-line bg-white text-ink"
                                             }`}>
                                             {m.desc}
                                          </p>
                                          <span className="text-xs text-muted">{moment(m.createdAt).format("h:mm a")}</span>
                                       </div>
                                    </React.Fragment>
                                 );
                              })
                           )}
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 border-t border-line px-4 py-3.5 sm:px-5">
                           {sendError && <Notice onClose={() => setSendError("")}>{sendError}</Notice>}
                           <div className="flex items-end gap-2.5">
                              <label className="flex flex-1">
                                 <span className="sr-only">Message</span>
                                 <textarea
                                    rows={2}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    onKeyDown={(e) => {
                                       // Enter sends, Shift+Enter makes a new line
                                       if (e.key === "Enter" && !e.shiftKey) handleSubmit(e);
                                    }}
                                    placeholder="Write a message"
                                    className="w-full resize-none rounded-xl border border-line-strong px-3.5 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-peach"
                                 />
                              </label>
                              <button
                                 type="submit"
                                 aria-label="Send"
                                 disabled={mutation.isPending || !text.trim()}
                                 className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-ink text-white disabled:opacity-50">
                                 <SendHorizontal size={20} aria-hidden="true" />
                              </button>
                           </div>
                           <span className="text-xs text-muted">Enter to send · Shift + Enter for a new line</span>
                        </form>
                     </>
                  )}
               </section>
            </div>
         </div>
      </div>
   );
};

export default Message;
