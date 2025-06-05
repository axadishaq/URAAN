import React from "react";
import { Navigate } from "react-router-dom";
import AdminPanel from "./AdminPanel";

export default function AdminProtectedRoute() {
   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   if (!currentUser) {
      return <Navigate to="/login" replace />;
   } else if (!currentUser || !currentUser.isAdmin) {
      // Not logged in or not admin, redirect to login
      alert("Access denied. Admins only.");
      return <Navigate to="/" replace />;
   }
   // User is admin, show the panel
   return <AdminPanel />;
}
