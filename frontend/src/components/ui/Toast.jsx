import React, { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

// Small notifications that replace the browser's alert() pop ups
const ToastContext = createContext(() => {});

const ICONS = {
   success: { Icon: CheckCircle2, color: "text-success bg-success-bg" },
   error: { Icon: AlertCircle, color: "text-danger bg-danger-bg" },
   info: { Icon: Info, color: "text-info bg-info-bg" },
};

export const ToastProvider = ({ children }) => {
   const [toasts, setToasts] = useState([]);

   const dismiss = useCallback(
      (id) => setToasts((list) => list.filter((t) => t.id !== id)),
      []
   );

   // toast("Saved") or toast({ title, text, type })
   const toast = useCallback(
      (input) => {
         const t = typeof input === "string" ? { title: input } : input;
         const id = Date.now() + Math.random();
         setToasts((list) => [...list.slice(-2), { type: "success", ...t, id }]);
         setTimeout(() => dismiss(id), t.duration || 4500);
      },
      [dismiss]
   );

   return (
      <ToastContext.Provider value={toast}>
         {children}
         <div
            aria-live="polite"
            className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(420px,calc(100vw-32px))] flex-col gap-2">
            {toasts.map(({ id, type, title, text }) => {
               const { Icon, color } = ICONS[type] || ICONS.info;
               return (
                  <div
                     key={id}
                     role="status"
                     className="pointer-events-auto flex items-start gap-3 rounded-[14px] border border-line bg-white p-4 shadow-[0_12px_32px_rgba(43,13,7,0.14)]">
                     <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${color}`}>
                        <Icon size={18} aria-hidden="true" />
                     </span>
                     <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <strong className="text-[15px]">{title}</strong>
                        {text && <span className="text-sm text-muted">{text}</span>}
                     </span>
                     <button
                        type="button"
                        onClick={() => dismiss(id)}
                        aria-label="Dismiss"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-blush">
                        <X size={16} />
                     </button>
                  </div>
               );
            })}
         </div>
      </ToastContext.Provider>
   );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);
