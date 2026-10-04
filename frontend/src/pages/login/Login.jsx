import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest, { getErrorMessage } from "../../utils/newRequest";
import AuthLayout from "../../components/authLayout/AuthLayout";
import { Field, Notice, PasswordField } from "../../components/ui/ui";
import { btn } from "../../components/ui/styles";

export const Login = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);
   const [isSubmitting, setIsSubmitting] = useState(false);
   // shown once after an expired session sent the user here
   const [notice] = useState(() => {
      const msg = sessionStorage.getItem("loginMessage");
      sessionStorage.removeItem("loginMessage");
      return msg;
   });

   const navigate = useNavigate();
   const location = useLocation();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      if (!username.trim() || !password) {
         setError("Please enter your username and password.");
         return;
      }
      setIsSubmitting(true);

      try {
         const res = await newRequest.post("/auth/login", {
            username: username.trim(),
            password,
         });

         localStorage.setItem("currentUser", JSON.stringify(res.data));
         // go back to the page that asked for login, if any
         const from =
            location.state?.from?.pathname ||
            new URLSearchParams(location.search).get("next");
         const safe = from && from.startsWith("/") && !from.startsWith("//");
         navigate(safe && from !== "/login" ? from : "/", { replace: true });
      } catch (err) {
         setError(getErrorMessage(err, "Login failed. Please try again."));
         setIsSubmitting(false);
      }
   };

   return (
      <AuthLayout>
         <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]" noValidate>
            <div className="flex flex-col gap-1.5">
               <h1 className="m-0 font-display text-[32px] font-bold">Welcome back</h1>
               <p className="m-0 text-[15px] text-muted">
                  Log in to order services, chat and see your courses.
               </p>
            </div>
            {notice && !error && <Notice type="warning">{notice}</Notice>}
            {error && <Notice>{error}</Notice>}
            <Field
               label="Username"
               name="username"
               autoComplete="username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />
            <PasswordField
               name="password"
               autoComplete="current-password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={isSubmitting} className={`${btn.primary} h-[52px]`}>
               {isSubmitting ? "Logging in..." : "Log in"}
            </button>
            <p className="m-0 text-center text-[15px] text-muted">
               New to URAAN?{" "}
               <Link to="/register" className="font-semibold text-clay hover:underline">
                  Create an account
               </Link>
            </p>
         </form>
      </AuthLayout>
   );
};
