import "./App.css";
import "./index.css";
import {
   createBrowserRouter,
   Navigate,
   Outlet,
   RouterProvider,
   useLocation,
} from "react-router";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import Courses from "./pages/courses/Courses";
import CourseDetail from "./pages/courses/CourseDetail";
import GigsByCountry from "./pages/gigsByCity/GigsByCountry";
import AddCourse from "./pages/addcourse/AddCourse";
import MyCourses from "./pages/myCourses/MyCourses";
import MyEnrollments from "./pages/myEnrollments/MyEnrollments";
import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute";
import NotFound from "./pages/notFound/NotFound";
import Blog from "./pages/blog/Blog";
import BlogPost from "./pages/blog/BlogPost";
import { getCurrentUser } from "./utils/currentUser";
import { ToastProvider } from "./components/ui/Toast";
import { useEffect } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Created once, so cached data survives re-renders
const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         // retry only server or network failures, not 4xx answers
         retry: (count, err) =>
            count < 1 && !(err?.response?.status < 500),
         refetchOnWindowFocus: false,
      },
   },
});

// New page: start at the top, or at #section when the link has one
const ScrollManager = () => {
   const { pathname, hash } = useLocation();
   useEffect(() => {
      if (hash) {
         const el = document.getElementById(hash.slice(1));
         if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            return;
         }
      }
      window.scrollTo(0, 0);
   }, [pathname, hash]);
   return null;
};

const Layout = () => {
   return (
      <div className="app">
         <ScrollManager />
         <Navbar />
         <main>
            <Outlet />
         </main>
         <Footer />
      </div>
   );
};

// Pages that need a logged-in user (and optionally a service provider)
const RequireAuth = ({ seller = false, children }) => {
   const location = useLocation();
   const currentUser = getCurrentUser();
   if (!currentUser)
      return <Navigate to="/login" replace state={{ from: location }} />;
   if (seller && !currentUser.isSeller) return <Navigate to="/" replace />;
   return children;
};

const router = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children: [
         { path: "/", element: <Home /> },
         { path: "/gigs", element: <Gigs /> },
         { path: "/gig/:id", element: <Gig /> },
         { path: "/courses", element: <Courses /> },
         { path: "/courses/:id", element: <CourseDetail /> },
         { path: "/gigs/country/:country", element: <GigsByCountry /> },
         { path: "/blog", element: <Blog /> },
         { path: "/blog/:slug", element: <BlogPost /> },
         // links from the old placeholder blog
         { path: "/post/*", element: <Navigate to="/blog" replace /> },
         {
            path: "/myGigs",
            element: (
               <RequireAuth seller>
                  <MyGigs />
               </RequireAuth>
            ),
         },
         {
            path: "/add",
            element: (
               <RequireAuth seller>
                  <Add />
               </RequireAuth>
            ),
         },
         {
            path: "/addcourse",
            element: (
               <RequireAuth seller>
                  <AddCourse />
               </RequireAuth>
            ),
         },
         {
            path: "/mycourses",
            element: (
               <RequireAuth seller>
                  <MyCourses />
               </RequireAuth>
            ),
         },
         {
            path: "/orders",
            element: (
               <RequireAuth>
                  <Orders />
               </RequireAuth>
            ),
         },
         {
            path: "/messages",
            element: (
               <RequireAuth>
                  <Messages />
               </RequireAuth>
            ),
         },
         {
            path: "/message/:id",
            element: (
               <RequireAuth>
                  <Message />
               </RequireAuth>
            ),
         },
         {
            path: "/myenrollments",
            element: (
               <RequireAuth>
                  <MyEnrollments />
               </RequireAuth>
            ),
         },
         // old link kept working
         { path: "/enrollments", element: <Navigate to="/myenrollments" replace /> },
      ],
   },
   {
      path: "/register",
      element: <Register />,
   },
   {
      path: "/login",
      element: <Login />,
   },
   {
      path: "/admin",
      element: <AdminProtectedRoute />,
   },
   {
      path: "*",
      element: <NotFound />,
   },
]);

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <ToastProvider>
            <RouterProvider router={router} />
         </ToastProvider>
      </QueryClientProvider>
   );
}


export default App;
