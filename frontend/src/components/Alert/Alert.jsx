import React from "react";

const Alert = ({ type = "info", message, onClose }) => {
   const base =
      "p-4 rounded-md mb-4 text-sm border flex justify-between items-center";
   const styles = {
      success: "bg-green-100 text-green-800 border-green-300",
      error: "bg-red-100 text-red-800 border-red-300",
      info: "bg-blue-100 text-blue-800 border-blue-300",
      warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
   };

   return (
      <div className={`${base} ${styles[type]}`}>
         <span>{message}</span>
         {onClose && (
            <button onClick={onClose} className="ml-4 font-bold">
               ×
            </button>
         )}
      </div>
   );
};

export default Alert;
