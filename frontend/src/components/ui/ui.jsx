import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ImageIcon, Star, Eye, EyeOff } from "lucide-react";

// ---------- Form fields ----------
const inputBase =
   "w-full rounded-[10px] border bg-white px-3.5 text-base text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-peach";

export const Field = ({ label, error, hint, className = "", id, ...props }) => {
   const fieldId = id || props.name;
   return (
      <label htmlFor={fieldId} className={`flex flex-col gap-1.5 text-sm font-semibold ${className}`}>
         {label}
         <input
            id={fieldId}
            aria-invalid={!!error}
            className={`${inputBase} h-12 font-normal ${error ? "border-2 border-danger" : "border-line-strong"}`}
            {...props}
         />
         {error ? (
            <span className="text-[13px] font-normal text-[#8e1f17]">{error}</span>
         ) : hint ? (
            <span className="text-[13px] font-normal text-muted">{hint}</span>
         ) : null}
      </label>
   );
};

export const PasswordField = ({ label = "Password", error, hint, ...props }) => {
   const [show, setShow] = useState(false);
   return (
      <div className="flex flex-col gap-1.5 text-sm font-semibold">
         <label htmlFor={props.name}>{label}</label>
         <div
            className={`flex items-center rounded-[10px] border bg-white pr-1 focus-within:ring-2 focus-within:ring-peach ${
               error ? "border-2 border-danger" : "border-line-strong"
            }`}>
            <input
               id={props.name}
               type={show ? "text" : "password"}
               aria-invalid={!!error}
               className="h-12 min-w-0 flex-1 rounded-[10px] bg-transparent px-3.5 text-base font-normal text-ink focus:outline-none"
               {...props}
            />
            <button
               type="button"
               onClick={() => setShow(!show)}
               aria-label={show ? "Hide password" : "Show password"}
               className="flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:bg-blush">
               {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
         </div>
         {error ? (
            <span className="text-[13px] font-normal text-[#8e1f17]">{error}</span>
         ) : hint ? (
            <span className="text-[13px] font-normal text-muted">{hint}</span>
         ) : null}
      </div>
   );
};

export const SelectField = ({ label, error, children, className = "", id, ...props }) => {
   const fieldId = id || props.name;
   return (
      <label htmlFor={fieldId} className={`flex flex-col gap-1.5 text-sm font-semibold ${className}`}>
         {label}
         <select
            id={fieldId}
            aria-invalid={!!error}
            className={`${inputBase} h-12 font-normal ${error ? "border-2 border-danger" : "border-line-strong"}`}
            {...props}>
            {children}
         </select>
         {error && <span className="text-[13px] font-normal text-[#8e1f17]">{error}</span>}
      </label>
   );
};

export const TextAreaField = ({ label, error, hint, className = "", id, ...props }) => {
   const fieldId = id || props.name;
   return (
      <label htmlFor={fieldId} className={`flex flex-col gap-1.5 text-sm font-semibold ${className}`}>
         {label}
         <textarea
            id={fieldId}
            aria-invalid={!!error}
            className={`${inputBase} resize-y py-3 font-normal ${error ? "border-2 border-danger" : "border-line-strong"}`}
            {...props}
         />
         {error ? (
            <span className="text-[13px] font-normal text-[#8e1f17]">{error}</span>
         ) : hint ? (
            <span className="text-[13px] font-normal text-muted">{hint}</span>
         ) : null}
      </label>
   );
};

// ---------- Feedback ----------
export const Spinner = ({ label = "Loading" }) => (
   <div role="status" className="flex items-center justify-center py-16">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-blush border-t-ink" />
      <span className="sr-only">{label}</span>
   </div>
);

export const Notice = ({ type = "error", children, onClose }) => {
   const styles = {
      error: "bg-danger-bg text-[#8e1f17]",
      success: "bg-success-bg text-success",
      info: "bg-info-bg text-info",
      warning: "bg-warning-bg text-warning",
   };
   return (
      <div
         role={type === "error" ? "alert" : "status"}
         className={`flex items-start justify-between gap-3 rounded-[10px] px-4 py-3 text-sm ${styles[type]}`}>
         <span>{children}</span>
         {onClose && (
            <button type="button" onClick={onClose} aria-label="Dismiss" className="font-bold">
               ×
            </button>
         )}
      </div>
   );
};

export const EmptyState = ({ title, text, action }) => (
   <div className="flex flex-col items-center gap-2 px-5 py-12 text-center">
      <strong className="text-[17px]">{title}</strong>
      {text && <p className="m-0 max-w-md text-[15px] text-muted">{text}</p>}
      {action && <div className="mt-3">{action}</div>}
   </div>
);

// ---------- Small pieces ----------
export const Avatar = ({ user, name, size = 36, className = "" }) => {
   const label = user?.username || name || "?";
   const style = { width: size, height: size, fontSize: Math.round(size * 0.4) };
   return user?.img ? (
      <img
         src={user.img}
         alt=""
         style={style}
         className={`shrink-0 rounded-full border border-line object-cover ${className}`}
      />
   ) : (
      <span
         aria-hidden="true"
         style={style}
         className={`flex shrink-0 items-center justify-center rounded-full bg-blush font-bold text-ink ${className}`}>
         {label.charAt(0).toUpperCase()}
      </span>
   );
};

export const Stars = ({ value = 0, size = 16 }) => (
   <span className="inline-flex gap-0.5" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
         <Star
            key={n}
            size={size}
            aria-hidden="true"
            className={n <= Math.round(value) ? "fill-[#e0a100] text-[#e0a100]" : "text-line-strong"}
         />
      ))}
   </span>
);

export const Badge = ({ tone = "neutral", children, className = "" }) => {
   const tones = {
      neutral: "bg-blush text-ink",
      outline: "border border-line text-muted bg-white",
      pending: "bg-warning-bg text-warning",
      done: "bg-success-bg text-success",
      info: "bg-info-bg text-info",
      danger: "bg-danger-bg text-[#8e1f17]",
      dark: "bg-ink text-white",
   };
   return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${tones[tone]} ${className}`}>
         {children}
      </span>
   );
};

export const Breadcrumb = ({ items }) => (
   <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-muted">
      {items.map((item, i) => (
         <span key={item.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={14} aria-hidden="true" />}
            {item.to ? (
               <Link to={item.to} className="hover:text-ink hover:underline">
                  {item.label}
               </Link>
            ) : (
               <span aria-current="page" className="text-ink">
                  {item.label}
               </span>
            )}
         </span>
      ))}
   </nav>
);

// Image with a soft placeholder when there is no picture (or it fails to load)
export const Picture = ({ src, alt = "", className = "" }) => {
   const [failed, setFailed] = useState(false);
   if (!src || failed)
      return (
         <div className={`flex items-center justify-center bg-sand text-subtle ${className}`}>
            <ImageIcon size={28} aria-hidden="true" />
         </div>
      );
   return (
      <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
   );
};

export const PageTitle = ({ title, text, action }) => (
   <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1.5">
         <h1 className="m-0 font-display text-4xl font-bold tracking-tight">{title}</h1>
         {text && <p className="m-0 text-base text-muted">{text}</p>}
      </div>
      {action}
   </div>
);
