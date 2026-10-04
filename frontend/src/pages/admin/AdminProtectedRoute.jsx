import React, { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../utils/currentUser";
import { Spinner } from "../../components/ui/ui";

// The admin panel (and its chart library) only loads for admins
const AdminPanel = lazy(() => import("./AdminPanel"));

export default function AdminProtectedRoute() {
   const currentUser = getCurrentUser();
   if (!currentUser) {
      return <Navigate to="/login" replace state={{ from: { pathname: "/admin" } }} />;
   }
   if (!currentUser.isAdmin) {
      // Logged in but not an admin
      return <Navigate to="/" replace />;
   }
   return (
      <Suspense fallback={<Spinner label="Loading admin panel" />}>
         <AdminPanel />
      </Suspense>
   );
}
