import React from "react";
import { useState } from "react";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/Footer";

export const Login = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);
   const [formData, setFormData] = useState({});
   const [submitSuccess, setSubmitSuccess] = useState(false);
   const [submitError, setSubmitError] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
         const res = await newRequest.post("/auth/login", {
            username,
            password,
         });
         console.log(res.data);

         localStorage.setItem("currentUser", JSON.stringify(res.data));
         navigate("/");
      } catch (err) {
         // setError(err.response.data);
         console.log(err);
      }
      setTimeout(() => {
         if (formData.email && formData.password) {
            setSubmitSuccess(true);
            setSubmitError(false);
         } else {
            setSubmitSuccess(false);
            setSubmitError(true);
         }
         setIsSubmitting(false);
      }, 1000);
   };
   return (
      <>
         <Navbar />
         <div className="min-h-screen bg-theme-light flex flex-col items-center py-6 px-6 sm:px-6 lg:px-10">
            <div className="flex justify-center mb-8">
               <div className="flex justify-between h-16">
                  {/* Logo and brand name */}
                  <Link to="/" className="flex items-center">
                     <div className="flex ">
                        <img src="/uraan.png" alt="" className="h-24 w-24 " />
                        <h1 className="text-5xl font-bold  items-center  mt-10 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-pink-500 to-blue-500">
                           URAAN
                        </h1>
                     </div>
                  </Link>
               </div>
            </div>

            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
               <h1 className="text-3xl font-bold text-center text-theme-dark mb-8">
                  Login
               </h1>

               {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
                     Login successful!
                  </div>
               )}
               {submitError && (
                  <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
                     Please enter valid credentials.
                  </div>
               )}

               <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                     type="username"
                     name="username"
                     placeholder="Username"
                     onChange={(e) => setUsername(e.target.value)}
                     className="w-full px-4 py-3 rounded-lg border border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-accent"
                  />

                  <input
                     type="password"
                     name="password"
                     placeholder="Password"
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full px-4 py-3 rounded-lg border border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-accent"
                  />

                  <div className="flex justify-end items-center text-sm text-theme-medium">
                     <Link
                        to="#"
                        className="hover:text-theme-dark text-theme-accent">
                        Forgot Password?
                     </Link>
                  </div>

                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className="w-full bg-theme-accent text-white py-3 px-4 rounded-lg border-3 border-theme-medium font-bold hover:bg-theme-dark transition-all duration-500">
                     {isSubmitting ? "Logging in..." : "Login"}
                  </button>
               </form>
               {/* Divider */}
               <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                     <div className="w-full border-t border-theme-medium"></div>
                  </div>
                  <div className="relative flex justify-center">
                     <span className="px-2 bg-white text-theme-medium text-sm">
                        or
                     </span>
                  </div>
               </div>

               {/* Continue with Google */}
               <Link
                  to=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" inline-flex items-center justify-center w-full bg-white border border-theme-medium text-theme-dark py-3 px-4 rounded-lg font-medium hover:bg-theme-light transition-colors mb-4">
                  <svg
                     className="w-5 h-5 mr-2"
                     viewBox="0 0 24 24"
                     fill="currentColor">
                     <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                     />
                     <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                     />
                     <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                     />
                     <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                     />
                     <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Continue with Google
               </Link>

               {/* Continue with Number */}
               {/* <Link
               to=""
               className="inline-block w-full text-center bg-white border border-theme-medium text-theme-dark py-3 px-4 rounded-lg font-medium hover:bg-theme-light transition-colors mb-4">
               Continue with Number
            </Link> */}

               <p className="mt-4 text-center text-theme-medium">
                  Don't have an account?{" "}
                  <Link
                     to="/register"
                     className="text-theme-dark hover:text-theme-accent">
                     Register now
                  </Link>
               </p>
            </div>
         </div>
         <Footer />
      </>
   );
};
