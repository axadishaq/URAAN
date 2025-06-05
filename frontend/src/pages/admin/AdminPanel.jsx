import { useEffect, useState } from "react";
import {
   Home,
   ListOrdered,
   Users,
   Flag,
   BarChart2,
   ShoppingCart,
   Calendar,
   Bell,
   Settings,
   CreditCard,
   Shield,
   ChevronLeft,
   MoreHorizontal,
} from "lucide-react";
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   Tooltip,
   ResponsiveContainer,
   CartesianGrid,
} from "recharts";
import moment from "moment";

import newRequest from "../../utils/newRequest";

export default function AdminPanel() {
   const [isExpanded, setIsExpanded] = useState(false);
   const [activeSection, setActiveSection] = useState("home");

   const mainMenuItems = [
      { id: "home", icon: <Home size={30} />, label: "Home" },
      { id: "users", icon: <Users size={30} />, label: "Users" },
      { id: "gigs", icon: <ListOrdered size={30} />, label: "Services" },
   ];

   const discoveryMenuItems = [
      { id: "event", icon: <Flag size={30} />, label: "Event" },
      { id: "stats", icon: <BarChart2 size={30} />, label: "Statistiques" },
      { id: "shop", icon: <ShoppingCart size={30} />, label: "Boutique" },
      { id: "calendar", icon: <Calendar size={30} />, label: "Calendrier" },
   ];

   const accountMenuItems = [
      { id: "notifications", icon: <Bell size={30} />, label: "Notification" },
      { id: "settings", icon: <Settings size={30} />, label: "Paramètres" },
   ];

   const handleMouseEnter = () => {
      setIsExpanded(true);
   };

   const handleMouseLeave = () => {
      setIsExpanded(false);
   };
   //Getting Orders
   const [orderStats, setOrderStats] = useState([]);
   const [loadingOrders, setLoadingOrders] = useState(false);
   const [orderRange, setOrderRange] = useState("week"); // "week" or "month"

   useEffect(() => {
      if (activeSection === "home") {
         setLoadingOrders(true);
         newRequest
            .get("/orders/admin")
            .then((res) => {
               setOrderStats(res.data); // Use the grouped data directly
            })
            .catch(() => setOrderStats([]))
            .finally(() => setLoadingOrders(false));
      }
   }, [activeSection]);

   // Filter data for week or month
   const filteredOrderStats = orderStats.filter((item) => {
      const itemDate = moment(item.date, "YYYY-MM-DD");
      if (orderRange === "week") {
         return itemDate.isAfter(moment().subtract(7, "days"));
      } else if (orderRange === "month") {
         return itemDate.isAfter(moment().subtract(30, "days"));
      }
      return true;
   });

   //getting Gigs

   const [gigs, setGigs] = useState([]);
   const [loadingGigs, setLoadingGigs] = useState(false);

   // Fetch gigs when Gigs tab is active
   useEffect(() => {
      if (activeSection === "gigs") {
         setLoadingGigs(true);
         newRequest
            .get("/gigs")
            .then((res) => setGigs(res.data))
            .catch(() => setGigs([]))
            .finally(() => setLoadingGigs(false));
      }
   }, [activeSection]);

   // Delete gig handler
   const handleDeleteGig = async (gigId) => {
      if (!window.confirm("Are you sure you want to delete this gig?")) return;
      try {
         await newRequest.delete(`/gigs/${gigId}`);
         setGigs((prev) => prev.filter((g) => g._id !== gigId));
      } catch (err) {
         alert(`Failed to delete gig. ${err?.response?.data?.message}`);
      }
   };

   // getting users

   const [users, setUsers] = useState([]);
   const [loadingUsers, setLoadingUsers] = useState(false);

   useEffect(() => {
      if (activeSection === "users") {
         setLoadingUsers(true);
         newRequest
            .get("/users")
            .then((res) => setUsers(res.data))
            .catch(() => setUsers([]))
            .finally(() => setLoadingUsers(false));
      }
   }, [activeSection]);

   const handleDeleteUser = async (userId) => {
      if (!window.confirm("Are you sure you want to delete this user?")) return;
      try {
         await newRequest.delete(`/users/${userId}`);
         setUsers((prev) => prev.filter((u) => (u._id || u.id) !== userId));
      } catch (err) {
         alert(`Failed to delete user. ${err?.response?.data?.message}`);
      }
   };

   return (
      <div className="flex h-full bg-gradient-to-br from-green-300 via-orange-100 to-red-300">
         {/* Sidebar */}
         <div
            className={`relative h-full transition-all duration-300 ease-in-out px-2 bg-opacity-30 backdrop-blur-md rounded-r-2xl shadow-lg hover:shadow-xl ${
               isExpanded ? "w-64" : "w-18"
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {/* Top menu button */}
            <div className="p-4 flex justify-between items-center">
               <div className="text-2xl font-semibold border-l-4  p-2 rounded-full hover:text-teal-600 transition-all cursor-pointer">
                  A
                  <span
                     className={` whitespace-nowrap transition-opacity duration-300 ${
                        isExpanded ? "opacity-100" : "opacity-0"
                     }`}>
                     dmin
                  </span>
               </div>
               <div
                  className={`p-2 rounded-full hover:text-teal-600 transition-all cursor-pointer text-xs ${
                     isExpanded ? "opacity-100" : "opacity-0"
                  }`}>
                  see you!
               </div>
            </div>

            <div className="border-b border-gray-500 mx-3"></div>

            {/* Main Menu */}
            <nav className="mt-4">
               {mainMenuItems.map((item) => (
                  <button
                     key={item.id}
                     onClick={() => setActiveSection(item.id)}
                     className={`flex items-center w-full px-4 py-3 text-left transition-all rounded-lg ${
                        activeSection === item.id
                           ? "text-black font-semibold bg-white bg-opacity-30 shadow-sm"
                           : "text-gray-600 hover:bg-white hover:bg-opacity-30 hover:backdrop-blur-sm"
                     }`}>
                     <span className="inline-flex items-center justify-center w-6">
                        {item.icon}
                     </span>
                     <span
                        className={`ml-4 whitespace-nowrap transition-opacity duration-300 ${
                           isExpanded ? "opacity-100" : "opacity-0"
                        }`}>
                        {item.label}
                     </span>
                  </button>
               ))}
            </nav>

            <div className="border-b border-gray-500 mx-3 my-2"></div>

            {/* Discovery Section */}
            <div
               className={`mt-2 mb-1 px-4 text-gray-500 text-xs font-medium transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0"
               }`}>
               Discover
            </div>
            <nav>
               {discoveryMenuItems.map((item) => (
                  <button
                     key={item.id}
                     onClick={() => setActiveSection(item.id)}
                     className={`flex items-center w-full px-4 py-3 text-left transition-all rounded-lg ${
                        activeSection === item.id
                           ? "text-black font-semibold bg-white bg-opacity-30 shadow-sm"
                           : "text-gray-600 hover:bg-white hover:bg-opacity-30 hover:backdrop-blur-sm"
                     }`}>
                     <span className="inline-flex items-center justify-center w-6">
                        {item.icon}
                     </span>
                     <span
                        className={`ml-4 whitespace-nowrap transition-opacity duration-300 ${
                           isExpanded ? "opacity-100" : "opacity-0"
                        }`}>
                        {item.label}
                     </span>
                  </button>
               ))}
            </nav>

            <div className="border-b border-gray-500 mx-3 my-2"></div>

            {/* Account Section */}
            <div
               className={`mt-2 mb-1 px-4 text-gray-500 text-xs font-medium transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0"
               }`}>
               Account
            </div>
            <nav>
               {accountMenuItems.map((item) => (
                  <button
                     key={item.id}
                     onClick={() => setActiveSection(item.id)}
                     className={`flex items-center w-full px-4 py-3 text-left transition-all rounded-lg ${
                        activeSection === item.id
                           ? "text-black font-semibold bg-white bg-opacity-30 shadow-sm"
                           : "text-gray-600 hover:bg-white hover:bg-opacity-30 hover:backdrop-blur-sm"
                     }`}>
                     <span className="inline-flex items-center justify-center w-6">
                        {item.icon}
                     </span>
                     <span
                        className={`ml-4 whitespace-nowrap transition-opacity duration-300 ${
                           isExpanded ? "opacity-100" : "opacity-0"
                        }`}>
                        {item.label}
                     </span>
                  </button>
               ))}
            </nav>
         </div>
         <div className="flex-grow p-6">
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-screen overflow-scroll">
               <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  {mainMenuItems.find((item) => item.id === activeSection)
                     ?.label ||
                     discoveryMenuItems.find(
                        (item) => item.id === activeSection
                     )?.label ||
                     accountMenuItems.find((item) => item.id === activeSection)
                        ?.label}
               </h1>
               {/* home / orders tab */}
               {activeSection === "home" ? (
                  <div>
                     <h2 className="text-xl font-semibold mb-4">
                        Orders Created (by Date)
                     </h2>
                     {/* Range Selector */}
                     <div className="mb-4 flex gap-2">
                        <button
                           className={`px-4 py-2 rounded ${
                              orderRange === "week"
                                 ? "bg-theme-accent text-white"
                                 : "bg-white text-theme-dark"
                           }`}
                           onClick={() => setOrderRange("week")}>
                           This Week
                        </button>
                        <button
                           className={`px-4 py-2 rounded ${
                              orderRange === "month"
                                 ? "bg-theme-accent text-white"
                                 : "bg-white text-theme-dark"
                           }`}
                           onClick={() => setOrderRange("month")}>
                           This Month
                        </button>
                     </div>
                     {loadingOrders ? (
                        <div className="flex-col gap-4 w-full h-screen flex items-center justify-center">
                           <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                              <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                           </div>
                        </div>
                     ) : (
                        <ResponsiveContainer width="100%" height={400}>
                           <BarChart data={filteredOrderStats}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis allowDecimals={false} />
                              <Tooltip />
                              <Bar dataKey="count" fill="#10b981" />
                           </BarChart>
                        </ResponsiveContainer>
                     )}
                  </div>
               ) : activeSection === "gigs" ? (
                  <div>
                     <h2 className="text-xl font-semibold mb-4">
                        All Services
                     </h2>
                     {loadingGigs ? (
                        <>
                           <div className="flex-col gap-4 w-full h-screen flex items-center justify-center">
                              <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                                 <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                              </div>
                           </div>
                        </>
                     ) : gigs.length === 0 ? (
                        <div>No services found.</div>
                     ) : (
                        <div className="overflow-x-auto">
                           <table className="min-w-full bg-white bg-opacity-60 rounded-lg">
                              <thead className="border-b-2">
                                 <tr>
                                    <th className="py-2 px-4">Cover</th>
                                    <th className="py-2 px-4">Title</th>
                                    <th className="py-2 px-4">Price</th>
                                    <th className="py-2 px-4">Created At</th>
                                    <th className="py-2 px-4">Actions</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {gigs.map((gig) => (
                                    <tr
                                       key={gig._id || gig.id}
                                       className="border-b">
                                       <td className="py-2 px-4">
                                          {gig.cover && (
                                             <img
                                                src={gig.cover}
                                                alt={gig.title}
                                                className="w-18 h-16 object-cover rounded"
                                             />
                                          )}
                                       </td>
                                       <td className="py-2 px-4">
                                          {gig.title}
                                       </td>
                                       <td className="py-2 px-4">
                                          {gig.price}
                                       </td>
                                       <td className="py-2 px-4">
                                          {gig.createdAt
                                             ? new Date(
                                                  gig.createdAt
                                               ).toLocaleDateString()
                                             : "-"}
                                       </td>
                                       <td className="py-2 px-4">
                                          <button
                                             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-800"
                                             onClick={() =>
                                                handleDeleteGig(
                                                   gig._id || gig.id
                                                )
                                             }>
                                             Delete
                                          </button>
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     )}
                  </div>
               ) : activeSection === "users" ? (
                  <div>
                     <h2 className="text-xl font-semibold mb-4">All Users</h2>
                     {loadingUsers ? (
                        <div>
                           <>
                              <div className="flex-col gap-4 w-full h-screen flex items-center justify-center">
                                 <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                                    <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                                 </div>
                              </div>
                           </>
                        </div>
                     ) : users.length === 0 ? (
                        <div>No users found.</div>
                     ) : (
                        <div className="overflow-x-auto">
                           <table className="min-w-full bg-white bg-opacity-60 rounded-lg">
                              <thead className="border-b-2">
                                 <tr>
                                    <th className="py-2 px-2">Name</th>
                                    <th className="py-2 px-4">Email</th>
                                    <th className="py-2 px-4">Role</th>
                                    <th className="py-2 px-4">Joined</th>
                                    <th className="py-2 px-4">Actions</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {users.map((user) => (
                                    <tr
                                       key={user._id || user.id}
                                       className="border-b">
                                       <td className="py-2 px-4">
                                          {user.username || user.name}
                                       </td>
                                       <td className="py-2 px-4">
                                          {user.email}
                                       </td>
                                       <td className="py-2 px-4">
                                          {user.isSeller ? "Seller" : "Buyer"}
                                       </td>
                                       <td className="py-2 px-4">
                                          {user.createdAt
                                             ? new Date(
                                                  user.createdAt
                                               ).toLocaleDateString()
                                             : "-"}
                                       </td>
                                       <td className="py-2 px-4">
                                          <button
                                             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-800"
                                             onClick={() =>
                                                handleDeleteUser(
                                                   user._id || user.id
                                                )
                                             }>
                                             Delete
                                          </button>
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     )}
                  </div>
               ) : (
                  <p className="text-gray-600">
                     {activeSection}
                     Error while getting Orders!
                  </p>
               )}
            </div>
         </div>

         {/* Main Content */}
         {/* <div className="flex-grow p-6">
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
               <p className="text-gray-600">
                  Contenu de la page {activeSection}
               </p>
            </div>
         </div> */}
      </div>
   );
}
