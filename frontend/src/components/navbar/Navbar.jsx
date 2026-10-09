import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
   Menu,
   X,
   ChevronDown,
   MessageCircle,
   GraduationCap,
   Plus,
} from "lucide-react";

import newRequest from "../../utils/newRequest";
import { getCurrentUser } from "../../utils/currentUser";
import { CITIES } from "../../utils/cities";
import { COURSE_LEVELS } from "../../utils/categories";
import { Avatar } from "../ui/ui";
import { btn } from "../ui/styles";

// Closes a menu when clicking outside it or pressing Escape
const useDismiss = (open, setOpen) => {
   const ref = useRef(null);
   useEffect(() => {
      if (!open) return;
      const onClick = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
      const onKey = (e) => e.key === "Escape" && setOpen(false);
      document.addEventListener("mousedown", onClick);
      document.addEventListener("keydown", onKey);
      return () => {
         document.removeEventListener("mousedown", onClick);
         document.removeEventListener("keydown", onKey);
      };
   }, [open, setOpen]);
   return ref;
};

const linkClass = ({ isActive }) =>
   `flex items-center gap-1 rounded-[10px] px-3.5 py-2.5 text-[15px] font-semibold transition-colors ${
      isActive ? "bg-blush text-ink" : "text-muted hover:bg-cream hover:text-ink"
   }`;

const DropMenu = ({ label, items, active }) => {
   const [open, setOpen] = useState(false);
   const ref = useDismiss(open, setOpen);
   return (
      <div ref={ref} className="relative">
         <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className={linkClass({ isActive: active })}>
            {label}
            <ChevronDown size={16} aria-hidden="true" className={open ? "rotate-180" : ""} />
         </button>
         {open && (
            <div className="absolute left-0 top-full z-50 mt-2 w-52 rounded-xl border border-line bg-white p-1.5 shadow-[0_12px_32px_rgba(43,13,7,0.12)]">
               {items.map((item) => (
                  <Link
                     key={item.to}
                     to={item.to}
                     onClick={() => setOpen(false)}
                     className="block rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-blush">
                     {item.label}
                  </Link>
               ))}
            </div>
         )}
      </div>
   );
};

const courseItems = [
   ...COURSE_LEVELS.map((l) => ({ label: l, to: `/courses?level=${l}` })),
   { label: "All courses", to: "/courses" },
];
const cityItems = CITIES.map((c) => ({ label: c, to: `/gigs/country/${c}` }));

function Navbar() {
   const [mobileOpen, setMobileOpen] = useState(false);
   const [menuOpen, setMenuOpen] = useState(false);
   const [currentUser, setCurrentUser] = useState(getCurrentUser);
   const menuRef = useDismiss(menuOpen, setMenuOpen);
   const navigate = useNavigate();
   const location = useLocation();
   const queryClient = useQueryClient();

   // close menus on navigation
   useEffect(() => {
      setMobileOpen(false);
      setMenuOpen(false);
      setCurrentUser(getCurrentUser());
   }, [location.pathname]);

   const me = currentUser?._id;
   const { data: conversations } = useQuery({
      queryKey: ["conversations", me],
      queryFn: () => newRequest.get("/conversations").then((res) => res.data),
      enabled: !!me,
      refetchInterval: 30000,
   });
   const unread = (conversations || []).filter((c) =>
      c.sellerId === me ? !c.readBySeller : !c.readByBuyer
   ).length;

   const { data: enrollments } = useQuery({
      queryKey: ["enrollments", me],
      queryFn: () => newRequest.get("/enrollments/me").then((res) => res.data),
      enabled: !!me,
   });
   const learning = enrollments?.length || 0;

   const handleLogout = async () => {
      setMenuOpen(false);
      try {
         await newRequest.post("/auth/logout");
      } catch (err) {
         console.log(err);
      }
      // Log out locally even if the server call failed
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
      queryClient.clear();
      navigate("/", { replace: true });
   };

   const onCourses = location.pathname.startsWith("/courses");
   const onCities = location.pathname.startsWith("/gigs/country");

   const menuLink = "block rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-blush";
   const menuHeading = "px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-wider text-subtle";

   return (
      <header className="sticky top-0 z-50 w-full border-b border-line bg-white">
         <div className="mx-auto flex h-[72px] max-w-[1400px] items-center gap-4 px-4 sm:px-8">
            <Link to="/" className="flex items-center gap-2.5 text-ink">
               <img src="/uraan.png" alt="" className="h-9 w-9 object-contain" />
               <span className="font-display text-[22px] font-bold tracking-wide">URAAN</span>
            </Link>

            <nav aria-label="Main" className="ml-4 hidden items-center gap-1 lg:flex">
               <NavLink to="/" end className={linkClass}>
                  Home
               </NavLink>
               <NavLink to="/gigs" end className={linkClass}>
                  Services
               </NavLink>
               <DropMenu label="Courses" items={courseItems} active={onCourses} />
               <DropMenu label="Cities" items={cityItems} active={onCities} />
               <NavLink to="/blog" className={linkClass}>
                  Blog
               </NavLink>
            </nav>

            <div className="flex-1" />

            {!currentUser ? (
               <div className="hidden items-center gap-2 sm:flex">
                  <Link to="/login" className="rounded-[10px] px-3.5 py-2.5 text-[15px] font-semibold text-ink hover:bg-cream">
                     Log in
                  </Link>
                  <Link to="/register" className={`${btn.primary} h-11 px-5 text-[15px]`}>
                     Join URAAN
                  </Link>
               </div>
            ) : (
               <div className="flex items-center gap-1">
                  {currentUser.isSeller && (
                     <Link to="/add" className={`${btn.small} mr-1 hidden border-ink md:inline-flex`}>
                        <Plus size={16} aria-hidden="true" />
                        Post a service
                     </Link>
                  )}
                  <Link
                     to="/messages"
                     aria-label={`Messages${unread ? `, ${unread} unread` : ""}`}
                     className="relative flex h-11 w-11 items-center justify-center rounded-[10px] text-ink hover:bg-cream">
                     <MessageCircle size={22} aria-hidden="true" />
                     {unread > 0 && (
                        <span className="absolute right-1 top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-clay px-1 text-[11px] font-bold text-white">
                           {unread}
                        </span>
                     )}
                  </Link>
                  <Link
                     to="/myenrollments"
                     aria-label={`My learning${learning ? `, ${learning} courses` : ""}`}
                     className="relative flex h-11 w-11 items-center justify-center rounded-[10px] text-ink hover:bg-cream">
                     <GraduationCap size={22} aria-hidden="true" />
                     {learning > 0 && (
                        <span className="absolute right-1 top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-peach px-1 text-[11px] font-bold text-ink">
                           {learning}
                        </span>
                     )}
                  </Link>

                  <div ref={menuRef} className="relative ml-1">
                     <button
                        type="button"
                        aria-label="Account menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex h-11 items-center gap-2 rounded-full border border-line bg-white py-0 pl-1 pr-2 text-[15px] font-semibold text-ink hover:bg-cream">
                        <Avatar user={currentUser} size={34} />
                        <span className="hidden max-w-[140px] truncate sm:inline">{currentUser.username}</span>
                        <ChevronDown size={16} aria-hidden="true" />
                     </button>
                     {menuOpen && (
                        <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-line bg-white p-1.5 shadow-[0_12px_32px_rgba(43,13,7,0.12)]">
                           <p className={menuHeading}>Buying</p>
                           <Link to="/orders" className={menuLink}>Orders</Link>
                           <Link to="/myenrollments" className={menuLink}>My learning</Link>
                           <Link to="/messages" className={menuLink}>Messages</Link>
                           {currentUser.isSeller && (
                              <>
                                 <p className={menuHeading}>Selling</p>
                                 <Link to="/myGigs" className={menuLink}>My services</Link>
                                 <Link to="/mycourses" className={menuLink}>My courses</Link>
                                 <Link to="/add" className={menuLink}>Post a service</Link>
                                 <Link to="/addcourse" className={menuLink}>Create a course</Link>
                              </>
                           )}
                           {currentUser.isAdmin && (
                              <>
                                 <p className={menuHeading}>Admin</p>
                                 <Link to="/admin" className={menuLink}>Admin Panel</Link>
                              </>
                           )}
                           <div className="my-1.5 border-t border-line" />
                           <button type="button" onClick={handleLogout} className={`${menuLink} w-full text-left`}>
                              Log out
                           </button>
                        </div>
                     )}
                  </div>
               </div>
            )}

            <button
               type="button"
               onClick={() => setMobileOpen(!mobileOpen)}
               aria-expanded={mobileOpen}
               aria-label={mobileOpen ? "Close menu" : "Open main menu"}
               className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-line text-ink lg:hidden">
               {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
         </div>

         {mobileOpen && (
            <nav aria-label="Mobile" className="border-t border-line bg-white px-4 pb-5 pt-2 lg:hidden">
               <div className="flex flex-col gap-1">
                  <NavLink to="/" end className={linkClass}>Home</NavLink>
                  <NavLink to="/gigs" end className={linkClass}>Services</NavLink>
                  <NavLink to="/blog" className={linkClass}>Blog</NavLink>
                  <p className={menuHeading}>Courses</p>
                  <div className="flex flex-wrap gap-2 px-1">
                     {courseItems.map((i) => (
                        <Link key={i.to} to={i.to} className="rounded-full border border-line-strong px-3.5 py-2 text-sm">
                           {i.label}
                        </Link>
                     ))}
                  </div>
                  <p className={menuHeading}>Cities</p>
                  <div className="flex flex-wrap gap-2 px-1">
                     {cityItems.map((i) => (
                        <Link key={i.to} to={i.to} className="rounded-full border border-line-strong px-3.5 py-2 text-sm">
                           {i.label}
                        </Link>
                     ))}
                  </div>
                  {!currentUser && (
                     <div className="mt-4 grid grid-cols-2 gap-2">
                        <Link to="/login" className={btn.secondary}>Log in</Link>
                        <Link to="/register" className={btn.primary}>Join URAAN</Link>
                     </div>
                  )}
               </div>
            </nav>
         )}
      </header>
   );
}

export default Navbar;
