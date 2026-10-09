import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";

import GigCard from "../../components/gigCard/GigCard";
import newRequest, { getErrorMessage } from "../../utils/newRequest";
import { SERVICE_CATEGORIES, categoryLabel } from "../../utils/categories";
import { CITIES } from "../../utils/cities";
import { Breadcrumb, EmptyState, Notice } from "../../components/ui/ui";
import { btn } from "../../components/ui/styles";

const SORTS = [
   ["sales", "Best selling"],
   ["createdAt", "Newest"],
   ["rating", "Top rated"],
   ["price", "Price: low to high"],
   ["priceDesc", "Price: high to low"],
];
const DELIVERY = [
   ["1", "Within 1 day"],
   ["3", "Up to 3 days"],
   ["7", "Up to a week"],
   ["", "Any time"],
];
const PAGE = 12;
const FILTER_KEYS = ["category", "country", "min", "max", "maxDays"];

const radio = "h-[18px] w-[18px] accent-ink";

function Gigs({ city }) {
   const [params, setParams] = useSearchParams();
   // older links used ?cat=
   const category = params.get("category") || params.get("cat") || "";
   const country = city || params.get("country") || "";
   const search = params.get("search") || "";
   const sort = params.get("sort") || "sales";

   const [draft, setDraft] = useState({});
   const [sheetOpen, setSheetOpen] = useState(false);
   const [visible, setVisible] = useState(PAGE);

   // keep the filter form in sync with the URL
   const paramsKey = params.toString();
   useEffect(() => {
      setDraft({
         category,
         country,
         min: params.get("min") || "",
         max: params.get("max") || "",
         maxDays: params.get("maxDays") || "",
      });
      setVisible(PAGE);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [paramsKey, city]);

   const query = new URLSearchParams(params);
   query.delete("cat");
   if (category) query.set("category", category);
   if (country) query.set("country", country);
   query.set("sort", sort);
   const queryString = query.toString();

   const { isLoading, error, data } = useQuery({
      queryKey: ["gigs", queryString],
      queryFn: () => newRequest.get(`/gigs?${queryString}`).then((res) => res.data),
   });

   const update = (changes) => {
      const next = new URLSearchParams(params);
      next.delete("cat");
      for (const [k, v] of Object.entries(changes)) {
         if (city && k === "country") continue;
         if (v) next.set(k, v);
         else next.delete(k);
      }
      setParams(next);
   };

   const apply = (e) => {
      e?.preventDefault();
      update(draft);
      setSheetOpen(false);
   };

   const clearAll = () => {
      const next = new URLSearchParams();
      if (params.get("sort")) next.set("sort", params.get("sort"));
      setParams(next);
      setSheetOpen(false);
   };

   const chips = [
      category && { key: "category", label: categoryLabel(category) },
      !city && country && { key: "country", label: country },
      search && { key: "search", label: `"${search}"` },
      params.get("min") && { key: "min", label: `From Rs. ${params.get("min")}` },
      params.get("max") && { key: "max", label: `Up to Rs. ${params.get("max")}` },
      params.get("maxDays") && {
         key: "maxDays",
         label: DELIVERY.find(([v]) => v === params.get("maxDays"))?.[1] || `${params.get("maxDays")} days`,
      },
   ].filter(Boolean);
   const activeCount = FILTER_KEYS.filter((k) => (k === "country" ? !city && country : params.get(k))).length;

   const title = [
      category ? categoryLabel(category) : search ? `Results for "${search}"` : "All services",
      country && `in ${country}`,
   ]
      .filter(Boolean)
      .join(" ");

   const gigs = data || [];

   const filterForm = (
      <form onSubmit={apply} className="flex flex-col gap-6">
         <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
            <legend className="mb-2.5 text-[15px] font-bold">Category</legend>
            <label className="flex min-h-8 items-center gap-2.5 text-[15px]">
               <input
                  type="radio"
                  name="category"
                  className={radio}
                  checked={!draft.category}
                  onChange={() => setDraft({ ...draft, category: "" })}
               />
               All categories
            </label>
            {SERVICE_CATEGORIES.map((c) => (
               <label key={c.value} className="flex min-h-8 items-center gap-2.5 text-[15px]">
                  <input
                     type="radio"
                     name="category"
                     className={radio}
                     checked={draft.category?.toLowerCase() === c.value.toLowerCase()}
                     onChange={() => setDraft({ ...draft, category: c.value })}
                  />
                  {c.label}
               </label>
            ))}
         </fieldset>

         {!city && (
            <label className="flex flex-col gap-2 text-[15px] font-bold">
               City
               <select
                  value={draft.country || ""}
                  onChange={(e) => setDraft({ ...draft, country: e.target.value })}
                  className="h-11 rounded-[10px] border border-line-strong bg-white px-3 text-[15px] font-normal">
                  <option value="">Any city</option>
                  {CITIES.map((c) => (
                     <option key={c}>{c}</option>
                  ))}
               </select>
            </label>
         )}

         <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
            <legend className="mb-2.5 text-[15px] font-bold">Budget (Rs.)</legend>
            <div className="grid grid-cols-2 gap-2">
               <label className="flex flex-col gap-1 text-[13px] text-muted">
                  Min
                  <input
                     type="number"
                     min="0"
                     placeholder="0"
                     value={draft.min || ""}
                     onChange={(e) => setDraft({ ...draft, min: e.target.value })}
                     className="h-11 w-full rounded-[10px] border border-line-strong px-3 text-[15px] text-ink"
                  />
               </label>
               <label className="flex flex-col gap-1 text-[13px] text-muted">
                  Max
                  <input
                     type="number"
                     min="0"
                     placeholder="Any"
                     value={draft.max || ""}
                     onChange={(e) => setDraft({ ...draft, max: e.target.value })}
                     className="h-11 w-full rounded-[10px] border border-line-strong px-3 text-[15px] text-ink"
                  />
               </label>
            </div>
         </fieldset>

         <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
            <legend className="mb-2.5 text-[15px] font-bold">Delivery time</legend>
            {DELIVERY.map(([value, label]) => (
               <label key={label} className="flex items-center gap-2.5 text-[15px]">
                  <input
                     type="radio"
                     name="maxDays"
                     className={radio}
                     checked={(draft.maxDays || "") === value}
                     onChange={() => setDraft({ ...draft, maxDays: value })}
                  />
                  {label}
               </label>
            ))}
         </fieldset>

         <button type="submit" className={btn.primary}>
            Apply filters
         </button>
      </form>
   );

   return (
      <div className="bg-cream">
         <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-4 pb-16 pt-8 sm:px-5">
            <Breadcrumb
               items={[
                  { label: "Home", to: "/" },
                  ...(city || category || search
                     ? [{ label: "Services", to: "/gigs" }, { label: city || categoryLabel(category) || "Search" }]
                     : [{ label: "Services" }]),
               ]}
            />
            <div className="flex flex-wrap items-end justify-between gap-4">
               <div className="flex flex-col gap-1.5">
                  <h1 className="m-0 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                     {city ? `Services in ${city}` : title}
                  </h1>
                  <p className="m-0 text-base text-muted" aria-live="polite">
                     {isLoading ? "Loading services…" : `${gigs.length} ${gigs.length === 1 ? "service" : "services"} found`}
                  </p>
               </div>
               <div className="flex items-center gap-2">
                  <button
                     type="button"
                     onClick={() => setSheetOpen(true)}
                     className={`${btn.small} border-ink lg:hidden`}>
                     <SlidersHorizontal size={18} aria-hidden="true" />
                     Filters{activeCount ? ` (${activeCount})` : ""}
                  </button>
                  <label className="flex items-center gap-2.5 text-sm text-muted">
                     <span className="hidden sm:inline">Sort by</span>
                     <select
                        aria-label="Sort by"
                        value={sort}
                        onChange={(e) => update({ sort: e.target.value })}
                        className="h-11 rounded-[10px] border border-line-strong bg-white px-3 text-[15px] text-ink">
                        {SORTS.map(([v, l]) => (
                           <option key={v} value={v}>
                              {l}
                           </option>
                        ))}
                     </select>
                  </label>
               </div>
            </div>

            {chips.length > 0 && (
               <div className="flex flex-wrap items-center gap-2">
                  {chips.map((chip) => (
                     <button
                        key={chip.key}
                        type="button"
                        onClick={() => update({ [chip.key]: "", ...(chip.key === "category" ? { cat: "" } : {}) })}
                        aria-label={`Remove filter ${chip.label}`}
                        className="flex h-9 items-center gap-1.5 rounded-full border border-ink bg-white pl-3.5 pr-2.5 text-sm font-semibold">
                        {chip.label}
                        <X size={16} aria-hidden="true" />
                     </button>
                  ))}
                  <button type="button" onClick={clearAll} className="h-9 px-2 text-sm font-semibold text-clay underline">
                     Clear all
                  </button>
               </div>
            )}

            <div className="flex items-start gap-7">
               {/* Filters: sidebar on desktop, bottom sheet on phones */}
               <aside
                  aria-label="Filters"
                  className="hidden w-[280px] shrink-0 rounded-2xl border border-line bg-white p-5 lg:block">
                  {filterForm}
               </aside>
               {sheetOpen && (
                  <div className="fixed inset-0 z-[60] lg:hidden">
                     <button
                        type="button"
                        aria-label="Close filters"
                        onClick={() => setSheetOpen(false)}
                        className="absolute inset-0 bg-[rgba(43,13,7,0.45)]"
                     />
                     <section
                        role="dialog"
                        aria-label="Filters"
                        className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[20px] bg-white px-5 pb-6 pt-3">
                        <div className="mb-4 flex items-center justify-between">
                           <h2 className="m-0 text-xl font-bold">Filters</h2>
                           <button
                              type="button"
                              onClick={() => setSheetOpen(false)}
                              aria-label="Close filters"
                              className="flex h-11 w-11 items-center justify-center">
                              <X size={22} />
                           </button>
                        </div>
                        {filterForm}
                        <button type="button" onClick={clearAll} className={`${btn.secondary} mt-3 w-full`}>
                           Clear all
                        </button>
                     </section>
                  </div>
               )}

               <section aria-label="Results" className="flex min-w-0 flex-1 flex-col gap-6">
                  {error ? (
                     <Notice>{getErrorMessage(error)}</Notice>
                  ) : isLoading ? (
                     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                           <div key={n} className="h-80 animate-pulse rounded-2xl bg-white" />
                        ))}
                     </div>
                  ) : gigs.length === 0 ? (
                     <div className="rounded-2xl border border-line bg-white">
                        <EmptyState
                           title="No services found"
                           text="Try another category or city, or widen your budget."
                           action={
                              activeCount || search ? (
                                 <button type="button" onClick={clearAll} className={btn.secondary}>
                                    Clear filters
                                 </button>
                              ) : null
                           }
                        />
                     </div>
                  ) : (
                     <>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                           {gigs.slice(0, visible).map((gig) => (
                              <GigCard key={gig._id} item={gig} />
                           ))}
                        </div>
                        {visible < gigs.length && (
                           <button
                              type="button"
                              onClick={() => setVisible(visible + PAGE)}
                              className={`${btn.secondary} self-center`}>
                              Show more services
                           </button>
                        )}
                     </>
                  )}
               </section>
            </div>
         </div>
      </div>
   );
}

export default Gigs;
