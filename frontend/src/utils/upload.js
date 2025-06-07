import axios from "axios";
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;

const upload = async (file) => {
   const data = new FormData();
   data.append("file", file);
   data.append("upload_preset", "uraaan");
   try {
      const res = await axios.post(
         CLOUDINARY_URL,
         data
      );
      return res.data.url;
   } catch (err) {
      console.log("Image upload error", err);
   }
};
export default upload;
