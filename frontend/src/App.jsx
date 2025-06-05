import { useState } from "react";
import "./App.css";
import "./index.css";
import {
   BrowserRouter,
   Link,
   Route,
   Routes,
   createBrowserRouter,
   Outlet,
   RouterProvider,
} from "react-router";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/Footer";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import Courses from "./pages/courses/Courses";
import CourseDetail from "./pages/courses/CourseDetail"; // Create this component
import Enrollments from "./pages/enrollments/Enrollments";
import GigsByCountry from "./pages/gigsByCity/GigsByCountry";
import AddCourse from "./pages/addcourse/AddCourse";
import MyCourses from "./pages/myCourses/MyCourses";
import MyEnrollments from "./pages/myEnrollments/MyEnrollments";
// import AdminPanel from "./pages/admin/AdminPanel";
import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute";
import NotFound from "./pages/notFound/NotFound";

import {
   QueryClient,
   QueryClientProvider,
   useQuery,
} from "@tanstack/react-query";

function App() {
   const queryClient = new QueryClient();

   const Layout = () => {
      return (
         <div className="app">
            <QueryClientProvider client={queryClient}>
               <Navbar />
               <Outlet />
               <Footer />
            </QueryClientProvider>
         </div>
      );
   };

   const router = createBrowserRouter([
      {
         path: "/",
         element: <Layout />,
         children: [
            {
               path: "/",
               element: <Home />,
            },
            {
               path: "/gigs",
               element: <Gigs />,
            },
            {
               path: "/myGigs",
               element: <MyGigs />,
            },
            {
               path: "/orders",
               element: <Orders />,
            },
            {
               path: "/messages",
               element: <Messages />,
            },
            {
               path: "/message/:id",
               element: <Message />,
            },
            {
               path: "/add",
               element: <Add />,
            },
            {
               path: "/gig/:id",
               element: <Gig />,
            },
            {
               path: "/courses",
               element: <Courses />,
            },
            {
               path: "/courses/:id",
               element: <CourseDetail />, // Single course detail page
            },
            {
               path: "/addcourse",
               element: <AddCourse />, // Single course detail page
            },
            {
               path: "/mycourses",
               element: <MyCourses />, // Single course detail page
            },
            {
               path: "/enrollments",
               element: <Enrollments />,
            },
            {
               path: "/orders/:id",
               element: <Orders />,
            },
            {
               path: "/myenrollments",
               element: (
                  <>
                     <Orders />
                     <MyEnrollments />
                  </>
               ),
            },
            {
               path: "/gigs/country/:country",
               element: <GigsByCountry />,
            },
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
   element: <NotFound/>,
},
   ]);

   return (
      // <>
      //    <h1>hwwjh uch</h1>
      //    <Home />
      // </>
      <RouterProvider router={router} />
      // <>
      //    <BrowserRouter>
      //       <Navbar />
      //       <Routes>
      //          <Route path="/" element={<Home />}></Route>
      //          <Route path="/login" element={<Login />}></Route>
      //          <Route path="/register" element={<Register />}></Route>
      //       </Routes>
      //       <Footer />
      //    </BrowserRouter>
      // </>
   );
}

export default App;
