import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, LayoutDashboard, Users, BriefcaseBusiness, ClipboardList, GraduationCap, Search } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import moment from "moment";

import newRequest, { getErrorMessage } from "../../utils/newRequest";
import { getCurrentUser } from "../../utils/currentUser";
import { categoryLabel } from "../../utils/categories";
import { formatPrice } from "../../utils/format";
import { Avatar, Badge, EmptyState, Notice, Picture, Spinner } from "../../components/ui/ui";
import { btn } from "../../components/ui/styles";
import { useToast } from "../../components/ui/Toast";

const SECTIONS = [
   { id: "home", label: "Overview", icon: LayoutDashboard },
   { id: "users", label: "Users", icon: Users },
   { id: "gigs", label: "Services", icon: BriefcaseBusiness },
   { id: "orders", label: "Orders", icon: ClipboardList },
   { id: "courses", label: "Courses", icon: GraduationCap },
];

const useAdminData = (key, url) =>
   useQuery({ queryKey: ["admin", key], queryFn: () => newRequest.get(url).then((res) => res.data) });

const Table = ({ head, children, empty }) =>
   empty ? (
      <EmptyState title="Nothing here yet" />
   ) : (
      <div className="overflow-x-auto">
         <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
               <tr className="bg-cream text-left text-muted">
                  {head.map((h, i) => (
                     <th key={h} scope="col" className={`px-4 py-3 font-semibold ${i === head.length - 1 ? "text-right" : ""}`}>
                        {h}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>{children}</tbody>
         </table>
      </div>
   );

const td = "border-t border-[#f0e3d9] px-4 py-3 align-middle";

const Panel = ({ title, tools, children }) => (
   <section className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-4">
         <h2 className="m-0 flex-1 text-lg font-bold">{title}</h2>
         {tools}
      </div>
      {children}
   </section>
);

const SearchBox = ({ value, onChange, placeholder }) => (
   <label className="flex h-10 items-center gap-2 rounded-[10px] border border-line-strong px-3">
      <Search size={16} className="text-subtle" aria-hidden="true" />
      <span className="sr-only">{placeholder}</span>
      <input
         type="search"
         value={value}
         onChange={(e) => onChange(e.target.value)}
         placeholder={placeholder}
         className="w-44 bg-transparent text-sm focus:outline-none"
      />
   </label>
);

export default function AdminPanel() {
   const me = getCurrentUser();
   const [section, setSection] = useState("home");
   const [range, setRange] = useState(7);
   const [userSearch, setUserSearch] = useState("");
   const [roleFilter, setRoleFilter] = useState("all");
   const [gigSearch, setGigSearch] = useState("");
   const queryClient = useQueryClient();
   const toast = useToast();

   const users = useAdminData("users", "/users");
   const gigs = useAdminData("gigs", "/gigs?sort=createdAt");
   const orders = useAdminData("orders", "/orders/admin/all");
   const courses = useAdminData("courses", "/courses");
   const stats = useAdminData("stats", "/orders/admin");

   const remove = useMutation({
      mutationFn: ({ url }) => newRequest.delete(url),
      onSuccess: (_, { label }) => {
         queryClient.invalidateQueries({ queryKey: ["admin"] });
         queryClient.invalidateQueries({ queryKey: ["gigs"] });
         queryClient.invalidateQueries({ queryKey: ["courses"] });
         toast({ title: "Deleted", text: label });
      },
      onError: (err) => toast({ type: "error", title: "Delete failed", text: getErrorMessage(err) }),
   });
   const confirmDelete = (url, label, warning) => {
      if (window.confirm(`Delete ${label}? ${warning || "This can't be undone."}`)) remove.mutate({ url, label: `${label} was removed.` });
   };

   const userById = Object.fromEntries((users.data || []).map((u) => [u._id, u]));
   const errorOf = [users, gigs, orders, courses, stats].find((q) => q.error)?.error;

   // last N days, including days without orders
   const byDate = Object.fromEntries((stats.data || []).map((s) => [s.date, s.count]));
   const chart = Array.from({ length: range }, (_, i) => {
      const d = moment().subtract(range - 1 - i, "days");
      return { date: d.format(range > 7 ? "D MMM" : "ddd"), count: byDate[d.format("YYYY-MM-DD")] || 0 };
   });

   const allUsers = users.data || [];
   const providers = allUsers.filter((u) => u.isSeller).length;
   const pending = (orders.data || []).filter((o) => !o.isCompleted).length;

   const filteredUsers = allUsers.filter((u) => {
      const t = userSearch.trim().toLowerCase();
      const roleOk =
         roleFilter === "all" ||
         (roleFilter === "admin" && u.isAdmin) ||
         (roleFilter === "provider" && u.isSeller) ||
         (roleFilter === "customer" && !u.isSeller && !u.isAdmin);
      return roleOk && (!t || u.username.toLowerCase().includes(t) || u.email?.toLowerCase().includes(t));
   });
   const filteredGigs = (gigs.data || []).filter(
      (g) => !gigSearch.trim() || g.title.toLowerCase().includes(gigSearch.trim().toLowerCase())
   );

   const roleBadge = (u) =>
      u.isAdmin ? <Badge tone="dark">Admin</Badge> : u.isSeller ? <Badge>Provider</Badge> : <Badge tone="info">Customer</Badge>;

   const counts = { users: allUsers.length, gigs: gigs.data?.length, orders: orders.data?.length, courses: courses.data?.length };

   return (
      <div className="flex min-h-screen flex-wrap bg-cream text-ink">
         <nav aria-label="Admin" className="flex w-full flex-col gap-1 border-b border-line bg-white px-4 py-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
            <Link to="/" className="flex items-center gap-2.5 px-2 pb-4 text-ink">
               <img src="/uraan.png" alt="" className="h-8 w-8 rounded-lg bg-blush object-contain p-0.5" />
               <span className="font-display text-xl font-bold">URAAN Admin</span>
            </Link>
            <div className="flex gap-1 overflow-x-auto md:flex-col">
               {SECTIONS.map(({ id, label, icon: Icon }) => (
                  <button
                     key={id}
                     type="button"
                     aria-current={section === id ? "page" : undefined}
                     onClick={() => setSection(id)}
                     className={`flex shrink-0 items-center gap-2.5 rounded-[10px] px-3 py-3 text-[15px] font-semibold ${
                        section === id ? "bg-blush text-ink" : "text-muted hover:bg-cream hover:text-ink"
                     }`}>
                     <Icon size={18} aria-hidden="true" />
                     {label}
                     {counts[id] !== undefined && <span className="ml-auto pl-2 text-[13px] text-subtle">{counts[id]}</span>}
                  </button>
               ))}
            </div>
            <div className="hidden flex-1 md:block" />
            <Link to="/" className="mt-2 flex items-center gap-2 rounded-[10px] px-3 py-3 text-[15px] font-semibold text-clay hover:bg-cream">
               <ArrowLeft size={18} aria-hidden="true" />
               Back to site
            </Link>
         </nav>

         <main className="flex min-w-0 flex-1 flex-col gap-6 p-5 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
               <h1 className="m-0 font-display text-3xl font-bold sm:text-4xl">{SECTIONS.find((s) => s.id === section).label}</h1>
               <span className="text-sm text-muted">Signed in as {me?.username}</span>
            </div>
            {errorOf && <Notice>{getErrorMessage(errorOf)}</Notice>}

            {section === "home" && (
               <>
                  <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
                     {[
                        ["Users", counts.users, `${providers} providers · ${allUsers.length - providers} customers`],
                        ["Services", counts.gigs, "listed on URAAN"],
                        ["Orders", counts.orders, `${pending} pending`],
                        ["Courses", counts.courses, `${(courses.data || []).reduce((s, c) => s + (c.enrolledCount || 0), 0)} enrollments`],
                     ].map(([label, value, note]) => (
                        <div key={label} className="flex flex-col gap-1.5 rounded-[14px] border border-line bg-white p-[18px]">
                           <span className="text-sm text-muted">{label}</span>
                           <span className="font-display text-[34px] font-bold leading-none">{value ?? "…"}</span>
                           <span className="text-[13px] text-muted">{note}</span>
                        </div>
                     ))}
                  </div>

                  <Panel
                     title="Orders per day"
                     tools={
                        <div role="group" aria-label="Range" className="flex gap-1 rounded-[10px] bg-[#f0e3d9] p-1">
                           {[7, 30].map((n) => (
                              <button
                                 key={n}
                                 type="button"
                                 aria-pressed={range === n}
                                 onClick={() => setRange(n)}
                                 className={`h-9 rounded-lg px-3.5 text-sm font-semibold ${range === n ? "bg-white text-ink" : "text-muted"}`}>
                                 {n} days
                              </button>
                           ))}
                        </div>
                     }>
                     <div className="p-4">
                        {stats.isLoading ? (
                           <Spinner />
                        ) : (
                           <ResponsiveContainer width="100%" height={280}>
                              <BarChart data={chart}>
                                 <CartesianGrid strokeDasharray="3 3" stroke="#eadbd0" vertical={false} />
                                 <XAxis dataKey="date" tick={{ fill: "#5c3d31", fontSize: 12 }} />
                                 <YAxis allowDecimals={false} tick={{ fill: "#5c3d31", fontSize: 12 }} />
                                 <Tooltip cursor={{ fill: "#fbe6d8" }} />
                                 <Bar dataKey="count" name="Orders" fill="#2b0d07" radius={[6, 6, 0, 0]} />
                              </BarChart>
                           </ResponsiveContainer>
                        )}
                     </div>
                  </Panel>

                  <Panel title="Recent orders">
                     <Table head={["Service", "Customer", "Date", "Status"]} empty={!orders.isLoading && !(orders.data || []).length}>
                        {(orders.data || []).slice(0, 5).map((o) => (
                           <tr key={o._id}>
                              <td className={td}>{o.title}</td>
                              <td className={td}>{userById[o.buyerId]?.username || "Deleted user"}</td>
                              <td className={`${td} text-muted`}>{moment(o.createdAt).format("D MMM YYYY")}</td>
                              <td className={`${td} text-right`}>
                                 <Badge tone={o.isCompleted ? "done" : "pending"}>{o.isCompleted ? "Completed" : "Pending"}</Badge>
                              </td>
                           </tr>
                        ))}
                     </Table>
                  </Panel>
               </>
            )}

            {section === "users" && (
               <Panel
                  title="All users"
                  tools={
                     <>
                        <SearchBox value={userSearch} onChange={setUserSearch} placeholder="Search name or email" />
                        <label className="flex">
                           <span className="sr-only">Role</span>
                           <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="h-10 rounded-[10px] border border-line-strong bg-white px-2.5 text-sm">
                              <option value="all">All roles</option>
                              <option value="provider">Providers</option>
                              <option value="customer">Customers</option>
                              <option value="admin">Admins</option>
                           </select>
                        </label>
                     </>
                  }>
                  {users.isLoading ? (
                     <Spinner />
                  ) : (
                     <Table head={["User", "City", "Role", "Joined", "Actions"]} empty={!filteredUsers.length}>
                        {filteredUsers.map((u) => (
                           <tr key={u._id}>
                              <td className={td}>
                                 <span className="flex items-center gap-2.5">
                                    <Avatar user={u} size={34} />
                                    <span className="flex flex-col">
                                       <strong>{u.username}</strong>
                                       <span className="text-[13px] text-muted">{u.email}</span>
                                    </span>
                                 </span>
                              </td>
                              <td className={td}>{u.country}</td>
                              <td className={td}>{roleBadge(u)}</td>
                              <td className={`${td} text-muted`}>{moment(u.createdAt).format("D MMM YYYY")}</td>
                              <td className={`${td} text-right`}>
                                 {u._id !== me?._id && (
                                    <button
                                       type="button"
                                       aria-label={`Delete ${u.username}`}
                                       onClick={() => confirmDelete(`/users/${u._id}`, `user ${u.username}`, "Their services and courses are removed too.")}
                                       className={btn.danger}>
                                       Delete
                                    </button>
                                 )}
                              </td>
                           </tr>
                        ))}
                     </Table>
                  )}
               </Panel>
            )}

            {section === "gigs" && (
               <Panel title="All services" tools={<SearchBox value={gigSearch} onChange={setGigSearch} placeholder="Search services" />}>
                  {gigs.isLoading ? (
                     <Spinner />
                  ) : (
                     <Table head={["Service", "Provider", "Price", "Created", "Actions"]} empty={!filteredGigs.length}>
                        {filteredGigs.map((g) => (
                           <tr key={g._id}>
                              <td className={td}>
                                 <span className="flex items-center gap-3">
                                    <Picture src={g.cover} alt="" className="h-11 w-14 shrink-0 rounded-lg" />
                                    <span className="flex flex-col">
                                       <Link to={`/gig/${g._id}`} className="font-semibold hover:underline">
                                          {g.title}
                                       </Link>
                                       <span className="text-[13px] text-muted">{categoryLabel(g.category)}</span>
                                    </span>
                                 </span>
                              </td>
                              <td className={td}>{userById[g.userId]?.username || "…"}</td>
                              <td className={td}>{formatPrice(g.price)}</td>
                              <td className={`${td} text-muted`}>{moment(g.createdAt).format("D MMM YYYY")}</td>
                              <td className={`${td} text-right`}>
                                 <button type="button" aria-label={`Delete ${g.title}`} onClick={() => confirmDelete(`/gigs/${g._id}`, `"${g.title}"`)} className={btn.danger}>
                                    Delete
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </Table>
                  )}
               </Panel>
            )}

            {section === "orders" && (
               <Panel title="All orders">
                  {orders.isLoading ? (
                     <Spinner />
                  ) : (
                     <Table head={["Service", "Customer", "Provider", "Price", "Date", "Status"]} empty={!(orders.data || []).length}>
                        {(orders.data || []).map((o) => (
                           <tr key={o._id}>
                              <td className={td}>{o.title}</td>
                              <td className={td}>{userById[o.buyerId]?.username || "Deleted user"}</td>
                              <td className={td}>{userById[o.sellerId]?.username || "Deleted user"}</td>
                              <td className={td}>{formatPrice(o.price)}</td>
                              <td className={`${td} text-muted`}>{moment(o.createdAt).format("D MMM YYYY")}</td>
                              <td className={`${td} text-right`}>
                                 <Badge tone={o.isCompleted ? "done" : "pending"}>{o.isCompleted ? "Completed" : "Pending"}</Badge>
                              </td>
                           </tr>
                        ))}
                     </Table>
                  )}
               </Panel>
            )}

            {section === "courses" && (
               <Panel title="All courses">
                  {courses.isLoading ? (
                     <Spinner />
                  ) : (
                     <Table head={["Course", "Teacher", "Level", "Enrolled", "Actions"]} empty={!(courses.data || []).length}>
                        {(courses.data || []).map((c) => (
                           <tr key={c._id}>
                              <td className={td}>
                                 <Link to={`/courses/${c._id}`} className="font-semibold hover:underline">
                                    {c.title}
                                 </Link>
                              </td>
                              <td className={td}>{userById[c.userId]?.username || "…"}</td>
                              <td className={td}>
                                 <Badge>{c.level}</Badge>
                              </td>
                              <td className={td}>{c.enrolledCount || 0}</td>
                              <td className={`${td} text-right`}>
                                 <button type="button" aria-label={`Delete ${c.title}`} onClick={() => confirmDelete(`/courses/${c._id}`, `"${c.title}"`)} className={btn.danger}>
                                    Delete
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </Table>
                  )}
               </Panel>
            )}
         </main>
      </div>
   );
}
