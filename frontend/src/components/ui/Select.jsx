import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

// Themed replacement for <select>. The browser draws a native <select>'s open
// list with system colours, so this renders its own list in URAAN's theme.
// Keyboard: arrows / Home / End move, a letter jumps, Enter or Space picks,
// Escape closes. A hidden input keeps `name` working for forms.
//
// options: [{ value, label }]
// onChange(value)
// height and text size of the closed box
const SIZES = {
   lg: "h-[54px] text-base",
   md: "h-12 text-base",
   sm: "h-11 text-[15px]",
   xs: "h-10 text-sm",
};

const Select = ({
   value,
   onChange,
   options,
   placeholder = "Select…",
   name,
   id,
   ariaLabel,
   ariaLabelledBy,
   invalid = false,
   disabled = false,
   icon: Icon,
   className = "",
   size = "md",
   bare = false,
}) => {
   const autoId = useId();
   const buttonId = id || `select-${autoId}`;
   const listId = `${buttonId}-list`;
   const [open, setOpen] = useState(false);
   const [active, setActive] = useState(-1);
   const [pos, setPos] = useState(null);
   const buttonRef = useRef(null);
   const listRef = useRef(null);
   const typed = useRef({ text: "", time: 0 });

   const selectedIndex = options.findIndex((o) => String(o.value) === String(value ?? ""));
   const selected = options[selectedIndex];

   // place the list under (or above) the button, in viewport coordinates
   const place = () => {
      const r = buttonRef.current?.getBoundingClientRect();
      if (!r) return;
      const height = Math.min(288, options.length * 44 + 12);
      const below = window.innerHeight - r.bottom;
      const up = below < height + 12 && r.top > below;
      setPos({
         left: Math.min(r.left, window.innerWidth - Math.max(r.width, 200) - 8),
         width: Math.max(r.width, 200),
         top: up ? undefined : r.bottom + 6,
         bottom: up ? window.innerHeight - r.top + 6 : undefined,
      });
   };

   const openList = () => {
      if (disabled) return;
      setActive(selectedIndex >= 0 ? selectedIndex : 0);
      place();
      setOpen(true);
   };
   const close = (focusButton = true) => {
      setOpen(false);
      if (focusButton) buttonRef.current?.focus();
   };
   const pick = (i) => {
      const option = options[i];
      if (!option) return;
      if (String(option.value) !== String(value ?? "")) onChange?.(option.value);
      close();
   };

   // keep it in place while scrolling / resizing; close on outside click
   useLayoutEffect(() => {
      if (!open) return;
      const onMove = () => place();
      const onDown = (e) => {
         if (!buttonRef.current?.contains(e.target) && !listRef.current?.contains(e.target)) close(false);
      };
      window.addEventListener("resize", onMove);
      window.addEventListener("scroll", onMove, true);
      document.addEventListener("mousedown", onDown);
      return () => {
         window.removeEventListener("resize", onMove);
         window.removeEventListener("scroll", onMove, true);
         document.removeEventListener("mousedown", onDown);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [open]);

   // keep the highlighted option visible
   useEffect(() => {
      if (open && active >= 0) listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
   }, [open, active]);

   const onKeyDown = (e) => {
      const last = options.length - 1;
      if (!open) {
         if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
            e.preventDefault();
            openList();
         }
         return;
      }
      if (e.key === "ArrowDown") setActive((a) => Math.min(last, a + 1));
      else if (e.key === "ArrowUp") setActive((a) => Math.max(0, a - 1));
      else if (e.key === "Home") setActive(0);
      else if (e.key === "End") setActive(last);
      else if (e.key === "Enter" || e.key === " ") pick(active);
      else if (e.key === "Escape") close();
      else if (e.key === "Tab") return close(false);
      else if (e.key.length === 1) {
         // type to jump to the first option starting with the typed letters
         const now = Date.now();
         typed.current.text = (now - typed.current.time < 700 ? typed.current.text : "") + e.key.toLowerCase();
         typed.current.time = now;
         const hit = options.findIndex((o) => String(o.label).toLowerCase().startsWith(typed.current.text));
         if (hit >= 0) setActive(hit);
         return;
      } else return;
      e.preventDefault();
   };

   return (
      <div className={`relative ${className}`}>
         {name && <input type="hidden" name={name} value={value ?? ""} />}
         <button
            ref={buttonRef}
            id={buttonId}
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-invalid={invalid || undefined}
            data-value={value ?? ""}
            disabled={disabled}
            onClick={() => (open ? close() : openList())}
            onKeyDown={onKeyDown}
            className={`flex w-full items-center gap-2.5 rounded-[10px] px-3.5 text-left font-normal text-ink focus:outline-none focus:ring-2 focus:ring-peach disabled:opacity-60 ${SIZES[size]} ${
               bare ? "bg-cream" : invalid ? "border-2 border-danger bg-white" : "border border-line-strong bg-white"
            }`}>
            {Icon && <Icon size={20} className="shrink-0 text-subtle" aria-hidden="true" />}
            <span className={`flex-1 truncate ${selected ? "" : "text-subtle"}`}>{selected ? selected.label : placeholder}</span>
            <ChevronDown
               size={18}
               aria-hidden="true"
               className={`shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
            />
         </button>

         {open &&
            pos &&
            createPortal(
               <ul
                  ref={listRef}
                  id={listId}
                  role="listbox"
                  aria-labelledby={ariaLabelledBy || buttonId}
                  style={{ position: "fixed", left: pos.left, top: pos.top, bottom: pos.bottom, width: pos.width }}
                  className="z-[200] m-0 max-h-72 list-none overflow-y-auto rounded-xl border border-line bg-white p-1.5 font-sans shadow-[0_12px_32px_rgba(43,13,7,0.16)]">
                  {options.map((o, i) => {
                     const isSelected = i === selectedIndex;
                     return (
                        <li
                           key={String(o.value)}
                           id={`${listId}-${i}`}
                           role="option"
                           aria-selected={isSelected}
                           onMouseEnter={() => setActive(i)}
                           onMouseDown={(e) => e.preventDefault()}
                           onClick={() => pick(i)}
                           className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-[15px] text-ink ${
                              i === active ? "bg-blush" : ""
                           } ${isSelected ? "font-semibold" : ""}`}>
                           <span>{o.label}</span>
                           {isSelected && <Check size={16} className="shrink-0 text-clay" aria-hidden="true" />}
                        </li>
                     );
                  })}
               </ul>,
               document.body
            )}
      </div>
   );
};

export default Select;
