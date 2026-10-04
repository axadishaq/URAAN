import axios from "axios";

const fallbackURL = "http://localhost:8800/api/";

if (!import.meta.env.VITE_REQUEST) {
   console.warn(
      "VITE_REQUEST environment variable is not defined. Using fallback baseURL:",
      fallbackURL
   );
}

const newRequest = axios.create({
   baseURL: import.meta.env.VITE_REQUEST || fallbackURL,
   withCredentials: true,
});

// If the login cookie expired, forget the stored user and send them to the
// login page, so the UI doesn't keep a logged-in state the server rejects.
newRequest.interceptors.response.use(
   (res) => res,
   (err) => {
      const status = err?.response?.status;
      const url = err?.config?.url || "";
      if ((status === 401 || status === 403) && !url.includes("auth/")) {
         const message = err?.response?.data?.message || "";
         if (
            /not authorized|token is not valid/i.test(message) &&
            localStorage.getItem("currentUser")
         ) {
            localStorage.removeItem("currentUser");
            if (!window.location.pathname.startsWith("/login")) {
               sessionStorage.setItem(
                  "loginMessage",
                  "Your session has expired. Please log in again."
               );
               window.location.assign(
                  `/login?next=${encodeURIComponent(window.location.pathname)}`
               );
            }
         }
      }
      return Promise.reject(err);
   }
);

// Turn any axios error into a message we can show to the user
export const getErrorMessage = (err, fallback = "Something went wrong!") => {
   const data = err?.response?.data;
   if (typeof data === "string" && data) return data;
   if (data?.message) return data.message;
   if (err?.message === "Network Error")
      return "Can't reach the server. Is the backend running?";
   return err?.message || fallback;
};

export default newRequest;
