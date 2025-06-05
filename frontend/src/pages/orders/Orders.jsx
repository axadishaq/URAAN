import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest.js";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const Orders = () => {
   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

   const navigate = useNavigate();

   const { isLoading, error, data } = useQuery({
      queryKey: ["orders", currentUser._id],
      queryFn: () =>
         newRequest.get(`/orders`).then((res) => {
            // console.log(res.data);
            return res.data;
         }),
   });

   const handleContact = async (order) => {
      const sellerId = order.sellerId;
      const buyerId = order.buyerId;
      const id = sellerId + buyerId;

      try {
         const res = await newRequest.get(`/conversations/single/${id}`);
         navigate(`/message/${res.data.id}`);
      } catch (err) {
         console.log(err);
         if (err.response.status === 404);
         const res = await newRequest.post(`/conversations`, {
            to: currentUser.isSeller ? buyerId : sellerId,
         });
         navigate(`/message/${res.data.id}`);
      }
   };

   return (
      <>
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
            <div className="h-auto">
               <div className="bg-theme-light h-auto py-8 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-7xl mx-auto">
                     <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {/* Header */}
                        <div className="bg-theme-dark text-white p-4 flex items-center justify-between">
                           <h2 className="text-xl font-semibold">Orders</h2>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex border-b border-gray-200 text-sm font-medium">
                           <button className="flex-1 text-center py-3 px-4 border-b-2 border-theme-accent text-theme-dark hover:text-theme-dark hover:bg-theme-light">
                              All
                           </button>
                           <button className="flex-1 text-center py-3 px-4 text-theme-accent hover:text-theme-dark hover:bg-theme-light">
                              Pending
                           </button>
                           <button className="flex-1 text-center py-3 px-4 text-theme-accent hover:text-theme-dark hover:bg-theme-light">
                              Completed
                           </button>
                        </div>

                        {/* Orders List */}
                        <div className="divide-y divide-gray-300">
                           {/* Order Item */}
                           {data && data.length > 0 ? (
                              data.map((order) => (
                                 <div
                                    key={order._id}
                                    className="p-2 px-8 flex flex-wrap justify-between items-center hover:bg-theme-light transition-all ">
                                    <div className="flex gap-2">
                                       <img
                                          src={order.img}
                                          alt="Service"
                                          className="w-28 h-16 rounded object-cover"
                                       />
                                       <div className="flex flex-col justify-center">
                                          <h4 className="text-theme-dark font-semibold">
                                             {order.title}
                                          </h4>
                                          <p className="text-theme-medium text-sm">
                                             Due:{" "}
                                             {moment(order.createdAt)
                                                .add(
                                                   Number(order.deliveryTime),
                                                   "days"
                                                )
                                                .toNow(true)}{" "}
                                             left
                                          </p>
                                       </div>
                                    </div>
                                    <div className=" rounded-lg  hidden sm:block">
                                       <p>RS. {order.price}</p>
                                    </div>

                                    <span
                                       className={
                                          order.isCompleted
                                             ? "bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full"
                                             : "bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full"
                                       }>
                                       {order.isCompleted
                                          ? "Completed"
                                          : "Pending"}
                                    </span>
                                    <div>
                                       <button
                                          onClick={() => handleContact(order)}
                                          className="p-2 px-6 bg-theme-accent rounded-lg text-white hover:border  border-theme-medium">
                                          Message
                                       </button>
                                    </div>
                                 </div>
                              ))
                           ) : (
                              <div className="p-4 text-center text-theme-medium">
                                 No orders found.
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default Orders;
