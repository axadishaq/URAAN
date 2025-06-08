import axios from "axios";

if (!import.meta.env.VITE_REQUEST) {
   console.warn(
      "VITE_REQUEST environment variable is not defined. Using fallback baseURL:",
      baseURL
   );
}

const newRequest = axios.create({
   baseURL: import.meta.env.VITE_REQUEST,
   withCredentials: true,
});

export default newRequest;
