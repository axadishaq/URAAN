import React from "react";
import { Link } from "react-router-dom";

import moment from "moment";
import {
   QueryClient,
   useMutation,
   useQuery,
   useQueryClient,
} from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";

const Messages = () => {
   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   const queryClient = useQueryClient();

   const { isLoading, error, data } = useQuery({
      queryKey: ["conversations", currentUser._id],
      queryFn: () =>
         newRequest.get(`/conversations`).then((res) => {
            console.log(res.data);
            return res.data;
         }),
   });

   const mutation = useMutation({
      mutationFn: (id) => {
         return newRequest.put(`/conversations/${id}`);
      },
      onSuccess: () => {
         queryClient.invalidateQueries(["conversations"]);
      },
   });

   const handleRead = (id) => {
      mutation.mutate(id);
   };

   return (
      <>
         <div className="bg-theme-light min-h-screen py-8 px-4">
            <div className="w-full mx-auto">
               <div className="flex flex-col  gap-6">
                  {/* Conversation List (Left Sidebar) */}
                  <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                     {/* Header */}
                     <div className="bg-theme-dark text-white p-4">
                        <h2 className="text-xl font-semibold">Messages</h2>
                        <div className="mt-2 relative">
                           <input
                              type="text"
                              disabled
                              placeholder="Search conversations..."
                              className="w-full bg-white/10 text-white placeholder-white/60 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-theme-accent"
                           />
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 absolute right-3 top-2.5 text-white/60"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                           </svg>
                        </div>
                     </div>
                     {isLoading ? (
                        <>
                           {/* Loader  */}
                           <div className="flex-col gap-4 w-full h-screen flex items-center justify-center">
                              <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                                 <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                              </div>
                           </div>
                        </>
                     ) : error ? (
                        <div className="text-red-600">{error}</div>
                     ) : (
                        <>
                           <div className="flex border-b border-gray-200">
                              <button className="flex-1 py-3 px-4 text-center border-b-2 border-theme-accent text-theme-dark font-medium hover:text-theme-dark hover:bg-theme-light">
                                 All Messages (
                                 {currentUser.isSeller ? "Buyer" : "Seller"})
                              </button>
                              <button className="flex-1 py-3 px-4 text-center text-gray-500 hover:text-theme-dark hover:text-theme-dark hover:bg-theme-light">
                                 Unread
                              </button>
                           </div>

                           {/* Conversation List */}
                           <div className="overflow-y-auto">
                              {/* Active Conversation */}
                              {data && data.length > 0 ? (
                                 data.map((c) => (
                                    <div className="border-l-4 border-theme-accent bg-theme-light/30 hover:bg-theme-light p-4 cursor-pointer transition-all">
                                       <div
                                          className={
                                             ((currentUser.isSeller &&
                                                !c.readBySeller) ||
                                                (!currentUser.isSeller &&
                                                   !c.readByBuyer)) &&
                                             "bg-theme-light"
                                          }
                                          key={c.id}>
                                          <div className="flex justify-between gap-4">
                                             <>
                                                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                                                   <img
                                                      src={"/img/avatar.png"}
                                                      alt=""
                                                      className="w-full h-full object-contain"
                                                   />
                                                </div>
                                                <Link to={`/message/${c.id}`}>
                                                   <div className="flex flex-col min-w-0">
                                                      <div className="flex justify-between items-start">
                                                         <h4 className="font-semibold text-theme-dark truncate">
                                                            {currentUser.isSeller
                                                               ? c.buyerId
                                                               : c.sellerId}
                                                         </h4>
                                                      </div>
                                                      <p className="mt-2 text-theme-medium font-medium truncate">
                                                         {c?.lastMessage?.substring(
                                                            0,
                                                            100
                                                         )}
                                                         ...
                                                      </p>
                                                   </div>
                                                </Link>{" "}
                                             </>
                                             <div className="flex flex-col justify-end gap-2 sm:gap-4 text-right">
                                                <span className="sm:mt-3 text-sm text-theme-medium">
                                                   {moment(
                                                      c.updatedAt
                                                   ).fromNow()}
                                                </span>
                                                <span>
                                                   {((currentUser.isSeller &&
                                                      !c.readBySeller) ||
                                                      (!currentUser.isSeller &&
                                                         !c.readByBuyer)) && (
                                                      <button
                                                         onClick={() =>
                                                            handleRead(c.id)
                                                         }
                                                         className="p-2 sm:mt-2 bg-theme-accent rounded-lg text-white border  border-theme-medium text-xs">
                                                         Mark as read
                                                      </button>
                                                   )}
                                                </span>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 ))
                              ) : (
                                 <div className="p-4 text-center text-theme-medium">
                                    No messages yet.
                                 </div>
                              )}
                           </div>
                        </>
                     )}
                  </div>
               </div>
            </div>
         </div>
         {/* <div className="messages">
            {isLoading ? (
               <>
                 
                  <div className="flex-col gap-4 w-full h-screen flex items-center justify-center">
                     <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                        <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                     </div>
                  </div>
               </>
            ) : error ? (
               "Some error!"
            ) : (
               <div className="container">
                  <div className="title">
                     <h1>Messages</h1>
                  </div>
                  <table>
                     <thead>
                        <tr>
                           <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                           <th>Last Message</th>
                           <th>Date</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data.map((c) => (
                           <tr
                              className={
                                 ((currentUser.isSeller && !c.readBySeller) ||
                                    (!currentUser.isSeller &&
                                       !c.readByBuyer)) &&
                                 "active"
                              }
                              key={c._id}>
                              <td>
                                 {currentUser.isSeller ? c.buyerId : c.sellerId}
                              </td>
                              <td>
                                 <Link to={`/message/${c.id}`} className="link">
                                    {c?.lastMessage?.substring(0, 100)}...
                                 </Link>
                              </td>
                              <td>{moment(c.updatedAt).fromNow()}</td>
                              <td>
                                 {((currentUser.isSeller && !c.readBySeller) ||
                                    (!currentUser.isSeller &&
                                       !c.readByBuyer)) && (
                                    <button onClick={() => handleRead(c.id)}>
                                       Mark as Read
                                    </button>
                                 )}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
         </div> */}
      </>
   );
};

export default Messages;
