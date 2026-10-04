import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, BriefcaseBusiness, Upload, X } from "lucide-react";
import upload from "../../utils/upload";
import newRequest, { getErrorMessage } from "../../utils/newRequest.js";
import { CITIES } from "../../utils/cities";
import AuthLayout from "../../components/authLayout/AuthLayout";
import { Field, Notice, PasswordField, SelectField, TextAreaField } from "../../components/ui/ui";
import { btn } from "../../components/ui/styles";
import { useToast } from "../../components/ui/Toast";

const RoleCard = ({ checked, onChange, icon: Icon, title, text }) => (
   <label
      className={`relative flex cursor-pointer flex-col gap-1.5 rounded-xl p-3.5 focus-within:ring-2 focus-within:ring-peach ${
         checked ? "border-2 border-ink bg-blush" : "border border-line-strong bg-white"
      }`}>
      <input type="radio" name="role" checked={checked} onChange={onChange} className="sr-only" />
      <Icon size={24} aria-hidden="true" />
      <strong className="text-[15px]">{title}</strong>
      <span className="text-[13px] text-muted">{text}</span>
   </label>
);

export const Register = () => {
   const [errors, setErrors] = useState({});
   const [submitError, setSubmitError] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [file, setFile] = useState(null);
   const [preview, setPreview] = useState("");
   const [otherCity, setOtherCity] = useState(false);
   const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
      phone: "",
      country: "",
      isSeller: false,
      desc: "",
   });

   const navigate = useNavigate();
   const toast = useToast();

   // preview of the chosen photo (freed when it changes)
   useEffect(() => {
      if (!file) {
         setPreview("");
         return;
      }
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
   }, [file]);

   const handleChange = (e) => {
      setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
   };

   const validate = () => {
      const e = {};
      if (!user.username.trim()) e.username = "Choose a username.";
      if (!/^\S+@\S+\.\S+$/.test(user.email.trim())) e.email = "Enter a valid email address.";
      if (user.password.length < 8) e.password = "Use at least 8 characters.";
      if (!user.country.trim()) e.country = "Enter your city.";
      return e;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitError("");
      const found = validate();
      setErrors(found);
      if (Object.keys(found).length) return;

      setIsSubmitting(true);
      try {
         // the profile image is optional
         const img_url = await upload(file);
         await newRequest.post("/auth/register", { ...user, img: img_url });
         toast({ title: "Account created", text: "Log in to continue." });
         navigate("/login");
      } catch (err) {
         setSubmitError(getErrorMessage(err, "Registration failed."));
         setIsSubmitting(false);
      }
   };

   return (
      <AuthLayout>
         <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]" noValidate>
            <div className="flex flex-col gap-1.5">
               <h1 className="m-0 font-display text-[32px] font-bold">Create your account</h1>
               <p className="m-0 text-[15px] text-muted">It takes about a minute.</p>
            </div>

            {submitError && <Notice>{submitError}</Notice>}

            <fieldset className="m-0 grid grid-cols-2 gap-2.5 border-0 p-0">
               <legend className="mb-2 text-sm font-semibold">I want to…</legend>
               <RoleCard
                  checked={!user.isSeller}
                  onChange={() => setUser({ ...user, isSeller: false })}
                  icon={Search}
                  title="Hire or learn"
                  text="Order services, take courses"
               />
               <RoleCard
                  checked={user.isSeller}
                  onChange={() => setUser({ ...user, isSeller: true })}
                  icon={BriefcaseBusiness}
                  title="Offer services"
                  text="Post services and courses"
               />
            </fieldset>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
               <Field
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={user.username}
                  onChange={handleChange}
                  error={errors.username}
               />
               {otherCity ? (
                  <Field
                     label="City"
                     name="country"
                     placeholder="Your city"
                     value={user.country}
                     onChange={handleChange}
                     error={errors.country}
                  />
               ) : (
                  <SelectField
                     label="City"
                     name="country"
                     value={user.country}
                     onChange={(e) => {
                        if (e.target.value === "__other") {
                           setOtherCity(true);
                           setUser({ ...user, country: "" });
                        } else handleChange(e);
                     }}
                     error={errors.country}>
                     <option value="">Choose your city</option>
                     {CITIES.map((c) => (
                        <option key={c}>{c}</option>
                     ))}
                     <option value="__other">Other city…</option>
                  </SelectField>
               )}
            </div>
            <Field
               label="Email"
               name="email"
               type="email"
               autoComplete="email"
               value={user.email}
               onChange={handleChange}
               error={errors.email}
            />
            <PasswordField
               name="password"
               autoComplete="new-password"
               value={user.password}
               onChange={handleChange}
               error={errors.password}
               hint="At least 8 characters."
            />

            {user.isSeller && (
               <>
                  <Field
                     label="Phone number"
                     name="phone"
                     type="tel"
                     placeholder="03XX XXXXXXX"
                     value={user.phone}
                     onChange={handleChange}
                  />
                  <TextAreaField
                     label="About you"
                     name="desc"
                     rows={3}
                     placeholder="What you do and how long you've done it"
                     value={user.desc}
                     onChange={handleChange}
                  />
               </>
            )}

            <div className="flex items-center gap-3.5 rounded-xl border border-dashed border-line-strong bg-white p-3">
               {preview ? (
                  <img src={preview} alt="" className="h-[52px] w-[52px] rounded-full object-cover" />
               ) : (
                  <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-blush text-muted">
                     <Upload size={22} aria-hidden="true" />
                  </span>
               )}
               <span className="flex flex-1 flex-col gap-0.5">
                  <strong className="text-sm">Profile photo</strong>
                  <span className="text-[13px] text-muted">{file ? file.name : "Optional · JPG or PNG"}</span>
               </span>
               {file ? (
                  <button type="button" onClick={() => setFile(null)} aria-label="Remove photo" className={btn.ghost}>
                     <X size={18} />
                  </button>
               ) : (
                  <label className={`${btn.small} border-ink`}>
                     Choose
                     <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0] || null)}
                        className="sr-only"
                     />
                  </label>
               )}
            </div>

            <button type="submit" disabled={isSubmitting} className={`${btn.primary} h-[52px]`}>
               {isSubmitting ? "Creating account..." : "Create account"}
            </button>
            <p className="m-0 text-center text-[15px] text-muted">
               Already have an account?{" "}
               <Link to="/login" className="font-semibold text-clay hover:underline">
                  Log in
               </Link>
            </p>
         </form>
      </AuthLayout>
   );
};
