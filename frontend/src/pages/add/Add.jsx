import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Upload, X } from "lucide-react";

import upload from "../../utils/upload.js";
import newRequest, { getErrorMessage } from "../../utils/newRequest.js";
import { getCurrentUser } from "../../utils/currentUser";
import { SERVICE_CATEGORIES, categoryLabel } from "../../utils/categories";
import { CITIES } from "../../utils/cities";
import { formatPrice } from "../../utils/format";
import { Badge, Field, Notice, PageTitle, SelectField, TextAreaField } from "../../components/ui/ui";
import { btn } from "../../components/ui/styles";
import { useToast } from "../../components/ui/Toast";

const MAX_PHOTOS = 6;

const Step = ({ n, title, children }) => (
   <section className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6">
      <h2 className="m-0 flex items-center gap-2.5 text-[19px] font-bold">
         <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-sm text-white">{n}</span>
         {title}
      </h2>
      {children}
   </section>
);

const Add = () => {
   const currentUser = getCurrentUser();
   const [form, setForm] = useState({
      title: "",
      category: "",
      country: currentUser?.country || "",
      desc: "",
      shortTitle: "",
      shortDesc: "",
      price: "",
      deliveryTime: "",
      revisionNumber: "",
   });
   const [features, setFeatures] = useState([]);
   const [featureText, setFeatureText] = useState("");
   const [photos, setPhotos] = useState([]); // [{ file, url }]
   const [errors, setErrors] = useState({});
   const [submitError, setSubmitError] = useState("");
   const [uploading, setUploading] = useState(false);

   const navigate = useNavigate();
   const queryClient = useQueryClient();
   const toast = useToast();

   // free preview URLs when the page closes
   const photosRef = useRef(photos);
   photosRef.current = photos;
   useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

   const set = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "" });
   };

   const addPhotos = (fileList) => {
      const added = [...fileList]
         .filter((f) => f.type.startsWith("image/"))
         .map((file) => ({ file, url: URL.createObjectURL(file) }));
      setPhotos((prev) => [...prev, ...added].slice(0, MAX_PHOTOS));
      setErrors({ ...errors, photos: "" });
   };
   const removePhoto = (i) => {
      URL.revokeObjectURL(photos[i].url);
      setPhotos(photos.filter((_, idx) => idx !== i));
   };

   const addFeature = () => {
      const value = featureText.trim();
      if (value && !features.includes(value)) setFeatures([...features, value]);
      setFeatureText("");
   };

   const mutation = useMutation({
      mutationFn: (gig) => newRequest.post("/gigs/creategig", gig),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["myGigs"] });
         queryClient.invalidateQueries({ queryKey: ["gigs"] });
         toast({ title: "Service published", text: "Customers can now find and order it." });
         navigate("/mygigs");
      },
      onError: (err) => setSubmitError(getErrorMessage(err, "Failed to create service.")),
   });

   const checks = [
      ["Title, category and city", form.title.trim() && form.category && form.country.trim()],
      ["Description and business details", form.desc.trim() && form.shortTitle.trim() && form.shortDesc.trim()],
      ["Price and delivery time", Number(form.price) > 0 && Number(form.deliveryTime) >= 1],
      ["At least one photo", photos.length > 0],
   ];

   const validate = () => {
      const e = {};
      if (!form.title.trim()) e.title = "Add a title.";
      if (!form.category) e.category = "Choose a category.";
      if (!form.country.trim()) e.country = "Choose your city.";
      if (!form.desc.trim()) e.desc = "Describe your service.";
      if (!form.shortTitle.trim()) e.shortTitle = "Add your business or shop name.";
      if (!form.shortDesc.trim()) e.shortDesc = "Add a one line summary.";
      if (!(Number(form.price) > 0)) e.price = "Enter a price above 0.";
      if (!(Number(form.deliveryTime) >= 1)) e.deliveryTime = "At least 1 day.";
      if (Number(form.revisionNumber) < 0) e.revisionNumber = "Can't be negative.";
      if (!photos.length) e.photos = "Add at least one photo. The first one is the cover.";
      return e;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitError("");
      const found = validate();
      setErrors(found);
      if (Object.keys(found).length) {
         window.scrollTo({ top: 0, behavior: "smooth" });
         return;
      }
      setUploading(true);
      let urls;
      try {
         // photos upload only now, when publishing
         urls = (await Promise.all(photos.map((p) => upload(p.file)))).filter(Boolean);
      } catch (err) {
         setUploading(false);
         return setSubmitError(err.message);
      }
      setUploading(false);
      mutation.mutate({
         ...form,
         title: form.title.trim(),
         country: form.country.trim(),
         price: Number(form.price),
         deliveryTime: Number(form.deliveryTime),
         revisionNumber: Number(form.revisionNumber) || 0,
         features,
         cover: urls[0],
         images: urls,
      });
   };

   const busy = uploading || mutation.isPending;

   return (
      <div className="bg-cream">
         <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 pb-16 pt-9 sm:px-5">
            <PageTitle title="Post a service" text="Fields marked * are required." />
            {submitError && <Notice onClose={() => setSubmitError("")}>{submitError}</Notice>}
            {Object.values(errors).some(Boolean) && (
               <Notice>Some details are missing. Check the fields marked in red.</Notice>
            )}

            <div className="flex flex-col items-start gap-7 lg:flex-row">
               <form onSubmit={handleSubmit} noValidate className="flex w-full min-w-0 flex-1 flex-col gap-5">
                  <Step n={1} title="Basics">
                     <Field
                        label="Service title *"
                        name="title"
                        maxLength={80}
                        placeholder="e.g. AC repair and gas refill at home"
                        value={form.title}
                        onChange={set}
                        error={errors.title}
                        hint={`Say what you do in a few words. ${form.title.length} / 80`}
                     />
                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <SelectField label="Category *" name="category" value={form.category} onChange={set} error={errors.category}>
                           <option value="">Select a category</option>
                           {SERVICE_CATEGORIES.map((c) => (
                              <option key={c.value} value={c.value}>
                                 {c.label}
                              </option>
                           ))}
                        </SelectField>
                        <Field
                           label="City *"
                           name="country"
                           list="city-options"
                           placeholder="e.g. Multan"
                           value={form.country}
                           onChange={set}
                           error={errors.country}
                        />
                        <datalist id="city-options">
                           {CITIES.map((c) => (
                              <option key={c} value={c} />
                           ))}
                        </datalist>
                     </div>
                  </Step>

                  <Step n={2} title="Details">
                     <TextAreaField
                        label="Description *"
                        name="desc"
                        rows={4}
                        placeholder="What you do, what customers get and anything they should know."
                        value={form.desc}
                        onChange={set}
                        error={errors.desc}
                     />
                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Field
                           label="Business / shop name *"
                           name="shortTitle"
                           placeholder="e.g. Chaudhary Transports & Goods"
                           value={form.shortTitle}
                           onChange={set}
                           error={errors.shortTitle}
                        />
                        <Field
                           label="One line summary *"
                           name="shortDesc"
                           placeholder="e.g. Same day home visits"
                           value={form.shortDesc}
                           onChange={set}
                           error={errors.shortDesc}
                        />
                     </div>
                     <div className="flex flex-col gap-2">
                        <label htmlFor="feature" className="text-sm font-semibold">
                           What's included
                        </label>
                        <div className="flex gap-2">
                           <input
                              id="feature"
                              value={featureText}
                              onChange={(e) => setFeatureText(e.target.value)}
                              onKeyDown={(e) => {
                                 if (e.key === "Enter") {
                                    e.preventDefault();
                                    addFeature();
                                 }
                              }}
                              placeholder="Add an item and press Enter"
                              className="h-11 min-w-0 flex-1 rounded-[10px] border border-line-strong px-3.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-peach"
                           />
                           <button type="button" onClick={addFeature} className={`${btn.small} border-ink`}>
                              Add
                           </button>
                        </div>
                        {features.length > 0 && (
                           <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                              {features.map((f) => (
                                 <li key={f} className="flex h-[34px] items-center gap-1 rounded-full bg-blush pl-3 pr-1 text-sm">
                                    {f}
                                    <button
                                       type="button"
                                       aria-label={`Remove ${f}`}
                                       onClick={() => setFeatures(features.filter((x) => x !== f))}
                                       className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white">
                                       <X size={14} />
                                    </button>
                                 </li>
                              ))}
                           </ul>
                        )}
                     </div>
                  </Step>

                  <Step n={3} title="Price & delivery">
                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <Field label="Price (Rs.) *" name="price" type="number" min="1" value={form.price} onChange={set} error={errors.price} />
                        <Field
                           label="Delivery time (days) *"
                           name="deliveryTime"
                           type="number"
                           min="1"
                           value={form.deliveryTime}
                           onChange={set}
                           error={errors.deliveryTime}
                        />
                        <Field
                           label="Free revisions"
                           name="revisionNumber"
                           type="number"
                           min="0"
                           placeholder="0"
                           value={form.revisionNumber}
                           onChange={set}
                           error={errors.revisionNumber}
                        />
                     </div>
                  </Step>

                  <Step n={4} title="Photos *">
                     <label
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                           e.preventDefault();
                           addPhotos(e.dataTransfer.files);
                        }}
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-[14px] border-2 border-dashed bg-cream p-7 text-center focus-within:ring-2 focus-within:ring-peach ${
                           errors.photos ? "border-danger" : "border-line-strong"
                        }`}>
                        <Upload size={28} className="text-muted" aria-hidden="true" />
                        <strong className="text-[15px]">Drop photos here or browse</strong>
                        <span className="text-[13px] text-muted">
                           Up to {MAX_PHOTOS} images. The first one is your cover. They upload when you publish.
                        </span>
                        <input
                           type="file"
                           multiple
                           accept="image/*"
                           onChange={(e) => {
                              addPhotos(e.target.files);
                              e.target.value = "";
                           }}
                           className="sr-only"
                        />
                     </label>
                     {errors.photos && <span className="text-[13px] text-[#8e1f17]">{errors.photos}</span>}
                     {photos.length > 0 && (
                        <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
                           {photos.map((p, i) => (
                              <li key={p.url} className="relative">
                                 <img src={p.url} alt="" className="h-[88px] w-[120px] rounded-[10px] object-cover" />
                                 {i === 0 && (
                                    <Badge tone="dark" className="absolute left-1.5 top-1.5">
                                       Cover
                                    </Badge>
                                 )}
                                 <button
                                    type="button"
                                    onClick={() => removePhoto(i)}
                                    aria-label={`Remove photo ${i + 1}`}
                                    className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink shadow">
                                    <X size={14} />
                                 </button>
                              </li>
                           ))}
                        </ul>
                     )}
                  </Step>

                  <div className="flex justify-end gap-2.5">
                     <Link to="/mygigs" className={btn.secondary}>
                        Cancel
                     </Link>
                     <button type="submit" disabled={busy} className={btn.primary}>
                        {uploading ? "Uploading photos..." : mutation.isPending ? "Publishing..." : "Publish service"}
                     </button>
                  </div>
               </form>

               <aside aria-label="Preview" className="flex w-full shrink-0 flex-col gap-3.5 lg:sticky lg:top-24 lg:w-[340px]">
                  <span className="text-[13px] font-bold uppercase tracking-wider text-muted">Live preview</span>
                  <div className="overflow-hidden rounded-2xl border border-line bg-white">
                     {photos[0] ? (
                        <img src={photos[0].url} alt="" className="h-40 w-full object-cover" />
                     ) : (
                        <div className="h-40 bg-sand" />
                     )}
                     <div className="flex flex-col gap-2 p-4">
                        <span className="text-sm text-muted">
                           <strong className="text-ink">{form.shortTitle || "Your business"}</strong>
                           {form.country && ` · ${form.country}`}
                        </span>
                        <span className="text-[17px] font-semibold">{form.title || "Your service title"}</span>
                        {form.category && <span className="text-sm text-muted">{categoryLabel(form.category)}</span>}
                        <span className="flex items-center justify-between border-t border-[#f0e3d9] pt-2">
                           <Badge tone="info">New</Badge>
                           <strong className="text-lg">{form.price ? formatPrice(form.price) : "Rs. …"}</strong>
                        </span>
                     </div>
                  </div>
                  <div className="flex flex-col gap-2.5 rounded-2xl border border-line bg-white p-4">
                     <strong className="text-[15px]">Before you publish</strong>
                     {checks.map(([label, ok]) => (
                        <span key={label} className="flex items-center gap-2.5 text-sm">
                           <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                                 ok ? "bg-success text-white" : "border-2 border-line-strong"
                              }`}>
                              {ok && <Check size={12} strokeWidth={3.5} aria-hidden="true" />}
                           </span>
                           {label}
                        </span>
                     ))}
                  </div>
               </aside>
            </div>
         </div>
      </div>
   );
};

export default Add;
