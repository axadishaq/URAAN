import axios from "axios";
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;

// Uploads an image to Cloudinary and returns its https URL.
// Returns undefined when no file is given; throws if the upload fails.
const upload = async (file) => {
   if (!file) return undefined;
   if (!CLOUDINARY_URL)
      throw new Error("VITE_CLOUDINARY_URL is not set in frontend/.env");

   const data = new FormData();
   data.append("file", file);
   data.append("upload_preset", "uraaan");
   try {
      const res = await axios.post(CLOUDINARY_URL, data);
      return res.data.secure_url || res.data.url;
   } catch (err) {
      console.log("Image upload error", err);
      throw new Error("Image upload failed. Please try another image.");
   }
};
export default upload;
