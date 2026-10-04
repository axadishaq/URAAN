import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import upload from "../../utils/upload";
import newRequest, { getErrorMessage } from "../../utils/newRequest.js";
import { COURSE_CATEGORIES, COURSE_LEVELS } from "../../utils/categories";
import { Field, Notice, PageTitle, SelectField, TextAreaField } from "../../components/ui/ui";
import { btn } from "../../components/ui/styles";
import { useToast } from "../../components/ui/Toast";

const AddCourse = () => {
   const [form, setForm] = useState({
      title: "",
      description: "",
      price: "",
      category: "",
      level: "Beginner",
   });
   const [cover, setCover] = useState(null);
   const [preview, setPreview] = useState("");
   const [errors, setErrors] = useState({});
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const queryClient = useQueryClient();
   const toast = useToast();

   useEffect(() => {
      if (!cover) {
         setPreview("");
         return;
      }
      const url = URL.createObjectURL(cover);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
   }, [cover]);

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "" });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      const found = {};
      if (!form.title.trim()) found.title = "Add a course title.";
      if (!form.description.trim()) found.description = "Describe what students will learn.";
      if (!(Number(form.price) >= 0) || form.price === "") found.price = "Enter a price (0 for free).";
      if (!form.category) found.category = "Choose a category.";
      setErrors(found);
      if (Object.keys(found).length) return;

      setLoading(true);
      try {
         const coverImage = await upload(cover);
         await newRequest.post("/courses", {
            ...form,
            title: form.title.trim(),
            price: Number(form.price),
            coverImage,
         });
         queryClient.invalidateQueries({ queryKey: ["myCourses"] });
         queryClient.invalidateQueries({ queryKey: ["courses"] });
         toast({ title: "Course published", text: "Students can now enroll." });
         navigate("/mycourses");
      } catch (err) {
         setError(getErrorMessage(err, "Failed to add course"));
         setLoading(false);
      }
   };

   return (
      <div className="bg-cream">
         <div className="mx-auto flex max-w-[760px] flex-col gap-6 px-4 pb-16 pt-9 sm:px-5">
            <PageTitle title="Create a course" text="Teach a skill to people in your city." />
            {error && <Notice onClose={() => setError("")}>{error}</Notice>}
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6">
               <Field label="Course title *" name="title" value={form.title} onChange={handleChange} error={errors.title} placeholder="e.g. Stitching 101: shalwar kameez basics" />
               <TextAreaField
                  label="Description *"
                  name="description"
                  rows={5}
                  placeholder="What you teach, the course outline and anything students should bring."
                  value={form.description}
                  onChange={handleChange}
                  error={errors.description}
               />
               <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <Field label="Price (Rs.) *" name="price" type="number" min="0" value={form.price} onChange={handleChange} error={errors.price} />
                  <SelectField label="Category *" name="category" value={form.category} onChange={handleChange} error={errors.category}>
                     <option value="">Select a category</option>
                     {COURSE_CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>
                           {c.label}
                        </option>
                     ))}
                  </SelectField>
                  <SelectField label="Level" name="level" value={form.level} onChange={handleChange}>
                     {COURSE_LEVELS.map((l) => (
                        <option key={l}>{l}</option>
                     ))}
                  </SelectField>
               </div>

               <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">Cover image</span>
                  {preview ? (
                     <div className="relative self-start">
                        <img src={preview} alt="" className="h-36 w-60 rounded-xl object-cover" />
                        <button
                           type="button"
                           onClick={() => setCover(null)}
                           aria-label="Remove cover image"
                           className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
                           <X size={16} />
                        </button>
                     </div>
                  ) : (
                     <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-line-strong bg-cream p-5 focus-within:ring-2 focus-within:ring-peach">
                        <Upload size={24} className="text-muted" aria-hidden="true" />
                        <span className="flex flex-col">
                           <strong className="text-[15px]">Choose a cover image</strong>
                           <span className="text-[13px] text-muted">Optional · JPG or PNG</span>
                        </span>
                        <input
                           type="file"
                           name="coverImage"
                           accept="image/*"
                           onChange={(e) => setCover(e.target.files[0] || null)}
                           className="sr-only"
                        />
                     </label>
                  )}
               </div>

               <div className="mt-2 flex justify-end gap-2.5">
                  <Link to="/mycourses" className={btn.secondary}>
                     Cancel
                  </Link>
                  <button type="submit" disabled={loading} className={btn.primary}>
                     {loading ? "Publishing..." : "Add Course"}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default AddCourse;
