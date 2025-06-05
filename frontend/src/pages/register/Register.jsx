import axios from "axios";
import React from "react";
import { useState } from "react";
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/Footer";
export const Register = () => {
   const [formErrors, setFormErrors] = useState({});
   const [submitSuccess, setSubmitSuccess] = useState(false);
   const [submitError, setSubmitError] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [activeTab, setActiveTab] = useState("candidate");
   const [file, setFile] = useState(null);
   const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
      img: "",
      number: "",
      country: "",
      isSeller: false,
      desc: "",
   });
   // console.log(user);

   const navigate = useNavigate();

   const handleChange = (e) => {
      setUser((prev) => {
         return { ...prev, [e.target.name]: e.target.value };
      });
   };

   const handleTabChange = (tab) => {
      setActiveTab(tab);
      if (tab === "employer") {
         setUser((prev) => {
            return { ...prev, isSeller: true };
         });
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      // can paste here upload.js for generating URL for images
      const img_url = await upload(file);
      console.log(img_url);
      try {
         await axios.post("http://localhost:8800/api/auth/register", {
            ...user,
            img: img_url,
         });
         navigate("/");
         alert("You have signed up successfully! Please login to continue.");
      } catch (err) {
         console.log(err);
      }
      setTimeout(() => {
         setSubmitSuccess(true);
         setIsSubmitting(false);
      }, 1000);
      //just to test the user details
      // console.log(user);
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
                        <img
                           src="/uraan.png"
                           alt=""
                           className="h-18 w-18 sm:w-24 sm:h-24"
                        />
                        <h1 className="text-3xl sm:text-5xl font-bold items-center  mt-10 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-pink-500 to-blue-500">
                           URAAN
                        </h1>
                     </div>
                  </Link>
               </div>
            </div>

            <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8">
               <h1 className="text-3xl font-bold text-center text-theme-dark mb-8">
                  Create Account
               </h1>

               <div className="mb-8">
                  <div className="flex">
                     <button
                        onClick={() => handleTabChange("candidate")}
                        className={`flex-1 py-3 font-medium text-sm rounded ${
                           activeTab === "candidate"
                              ? "text-theme-dark border-2 border-theme-accent bg-theme-light"
                              : "text-theme-medium"
                        }`}>
                        Candidate
                     </button>
                     <button
                        onClick={() => handleTabChange("employer")}
                        className={`flex-1 py-3 font-medium text-sm rounded ${
                           activeTab === "employer"
                              ? "text-theme-dark border-2 border-theme-accent bg-theme-light"
                              : "text-theme-medium"
                        }`}>
                        Service Provider / Hire
                     </button>
                  </div>
               </div>

               {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
                     You have signed up successfully!
                  </div>
               )}
               {submitError && (
                  <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
                     Oops! Something went wrong while submitting the form.
                  </div>
               )}

               <form onSubmit={handleSubmit} className="space-y-4">
                  <label
                     htmlFor="username"
                     className="block text-sm font-medium text-gray-700 mb-1">
                     Username
                  </label>
                  <input
                     type="text"
                     name="username"
                     placeholder="Username"
                     required
                     onChange={handleChange}
                     className="w-full px-4 py-3 rounded-lg border border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-accent"
                  />
                  <label
                     htmlFor="email"
                     className="block text-sm font-medium text-gray-700 mb-1">
                     Email
                  </label>
                  <input
                     type="email"
                     name="email"
                     placeholder="Email"
                     onChange={handleChange}
                     className="w-full px-4 py-3 rounded-lg border border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-accent"
                  />
                  <label
                     htmlFor="password"
                     className="block text-sm font-medium text-gray-700 mb-1">
                     Password
                  </label>
                  <input
                     type="password"
                     name="password"
                     placeholder="Password"
                     onChange={handleChange}
                     className="w-full px-4 py-3 rounded-lg border border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-accent"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                     Password must be at least 8 characters
                  </p>

                  <div>
                     <label className="block text-theme-medium mb-1">
                        Profile Image
                     </label>
                     <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full px-4 py-3 rounded-lg border border-theme-dark"
                     />
                  </div>
                  <label
                     htmlFor="country"
                     className="block text-sm font-medium text-gray-700 mb-1">
                     City
                  </label>
                  <input
                     type="text"
                     name="country"
                     placeholder="City"
                     onChange={handleChange}
                     className="w-full px-4 py-3 rounded-lg border border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-accent"
                  />

                  {activeTab === "employer" && (
                     <>
                        <label
                           htmlFor="phone"
                           className="block text-sm font-medium text-gray-700 mb-1">
                           Phone Number
                        </label>
                        <input
                           type="number"
                           name="number"
                           placeholder="Contact Number"
                           onChange={handleChange}
                           className="w-full px-4 py-3 rounded-lg border border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-accent"
                        />
                        <label
                           htmlFor="description"
                           className="block text-sm font-medium text-gray-700 mb-1">
                           Short Description
                        </label>
                        <textarea
                           name="desc"
                           cols="30"
                           rows="5"
                           placeholder="Short Description"
                           onChange={handleChange}
                           className="w-full px-4 py-3 rounded-lg border border-theme-dark focus:outline-none focus:ring-2 focus:ring-theme-accent"></textarea>
                     </>
                  )}

                  <div className="flex items-center">
                     <label className="text-theme-medium">
                        I agree to the{" "}
                        <Link
                           to=""
                           className="text-theme-dark hover:text-theme-accent">
                           Terms & Conditions
                        </Link>
                        .
                     </label>
                  </div>

                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className="w-full bg-theme-accent text-white py-3 px-4 rounded-lg border-3 border-theme-medium font-bold hover:bg-theme-dark transition-all duration-500">
                     {isSubmitting ? "Please wait..." : "Register"}
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
               <span
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
               </span>

               <p className="mt-4 text-center text-theme-medium">
                  Already have an account?{" "}
                  <Link
                     to="/login"
                     className="text-theme-dark hover:text-theme-accent">
                     Login now
                  </Link>
               </p>
            </div>
         </div>
         <Footer />
      </>
   );
};
