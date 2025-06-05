import React from "react";
import { Link, useParams } from "react-router-dom";

import {
   QueryClient,
   useMutation,
   useQuery,
   useQueryClient,
} from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";

const Message = () => {
   const { id } = useParams();
   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

   const queryClient = useQueryClient();

   const { isLoading, error, data } = useQuery({
      queryKey: ["messages"],
      queryFn: () =>
         newRequest.get(`/messages/${id}`).then((res) => {
            return res.data;
         }),
   });

   const mutation = useMutation({
      mutationFn: (message) => {
         return newRequest.post(`/messages`, message);
      },
      onSuccess: () => {
         queryClient.invalidateQueries(["messages"]);
      },
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      mutation.mutate({
         conversationId: id,
         desc: e.target[0].value,
      });
      e.target[0].value = "";
   };

   return (
      // <div className="message">
      //    <div className="container">
      //       <span className="breadcrumbs">
      //          <Link to="/messages">Messages</Link>
      //       </span>
      //       {isLoading ? (
      //          <>
      //             {/* Loader  */}
      //             <div className="flex-col gap-4 w-full h-screen flex items-center justify-center">
      //                <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
      //                   <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
      //                </div>
      //             </div>
      //          </>
      //       ) : error ? (
      //          "error"
      //       ) : (
      //          <div className="messages">
      //             {data.map((m) => (
      //                <div
      //                   className={
      //                      m.userId === currentUser._id ? "owner item" : "item"
      //                   }
      //                   key={m._id}>
      //                   <img
      //                      src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
      //                      alt=""
      //                   />
      //                   <p>{m.desc}</p>
      //                </div>
      //             ))}
      //          </div>
      //       )}
      //       <hr />
      //       <form className="write" onSubmit={handleSubmit}>
      //          <textarea type="text" placeholder="write a message" />
      //          <button type="submit">Send</button>
      //       </form>
      //    </div>
      // </div>
      <div className="flex justify-center w-full min-h-screen bg-white">
         <div className="w-full max-w-5xl mx-2 sm:mx-8 md:mx-16 lg:mx-auto my-8">
            <span className="font-light text-xs text-gray-600">
               {/* Breadcrumbs */}
               <Link to="/messages" className="hover:underline">
                  Messages
               </Link>
            </span>
            {isLoading ? (
               <div className="flex flex-col gap-4 w-full h-80 items-center justify-center">
                  <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                     <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                  </div>
               </div>
            ) : error ? (
               <div className="text-red-500">Error loading messages.</div>
            ) : (
               <div className="my-6 px-2 sm:px-6 py-4 flex flex-col gap-4 max-h-[60vh] overflow-y-auto bg-gray-50 rounded-lg shadow-inner">
                  {data.map((m) => (
                     <div
                        className={`flex gap-4 max-w-xl text-base ${
                           m.userId === currentUser._id
                              ? "flex-row-reverse self-end"
                              : "self-start"
                        }`}
                        key={m._id}>
                        <img
                           src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                           alt=""
                           className="w-10 h-10 rounded-full object-cover"
                        />
                        <p
                           className={`p-4 max-w-xs rounded-2xl ${
                              m.userId === currentUser._id
                                 ? "bg-theme-accent text-white rounded-br-none"
                                 : "bg-gray-200 text-gray-700 rounded-tl-none"
                           }`}>
                           {m.desc}
                        </p>
                     </div>
                  ))}
               </div>
            )}
            <hr className="border-t border-gray-200 my-4" />
            <form
               className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
               onSubmit={handleSubmit}>
               <textarea
                  type="text"
                  placeholder="Write a message"
                  className="w-full sm:w-4/5 h-16 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-300"
               />
               <button
                  type="submit"
                  className="bg-[#2b0d07] text-white font-medium px-6 py-3 rounded-lg w-full sm:w-32 transition hover:bg-orange-700">
                  Send
               </button>
            </form>
         </div>
      </div>
   );
};

export default Message;
