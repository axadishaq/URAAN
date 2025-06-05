import React from "react";

export const Extra = () => {
   return (
      <div>
         <div className="flex-grow p-6">
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full">
               <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  {mainMenuItems.find((item) => item.id === activeSection)
                     ?.label ||
                     discoveryMenuItems.find(
                        (item) => item.id === activeSection
                     )?.label ||
                     accountMenuItems.find((item) => item.id === activeSection)
                        ?.label}
               </h1>
               {activeSection === "home" ? (
                  <div>
                     <h2 className="text-xl font-semibold mb-4">
                        Orders Created (by Date)
                     </h2>
                     {loadingOrders ? (
                        <>
                           <div className="flex-col gap-4 w-full h-screen flex items-center justify-center">
                              <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                                 <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                              </div>
                           </div>
                        </>
                     ) : (
                        <ResponsiveContainer width="100%" height={300}>
                           <BarChart data={orderStats.slice(-10)}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis allowDecimals={false} />
                              <Tooltip />
                              <Bar dataKey="count" fill="#10b981" />
                           </BarChart>
                        </ResponsiveContainer>
                        // <ResponsiveContainer width="100%" height={300}>
                        //    <BarChart data={orderStats}>
                        //       <CartesianGrid strokeDasharray="3 3" />
                        //       <XAxis dataKey="date" />
                        //       <YAxis allowDecimals={false} />
                        //       <Tooltip />
                        //       <Bar dataKey="count" fill="#10b981" />
                        //    </BarChart>
                        // </ResponsiveContainer>
                     )}
                  </div>
               ) : (
                  <p className="text-gray-600">{activeSection}</p>
               )}
            </div>
         </div>
      </div>
   );
};
