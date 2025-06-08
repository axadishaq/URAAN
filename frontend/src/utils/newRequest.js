import axios from "axios";

const baseURL = import.meta.env.VITE_REQUEST;
if (!import.meta.env.VITE_REQUEST) {
   console.warn(
      "VITE_REQUEST environment variable is not defined. Using fallback baseURL:",
      baseURL
   );
}

const newRequest = axios.create({
   baseURL: baseURL,
   withCredentials: true,
});

export default newRequest;
