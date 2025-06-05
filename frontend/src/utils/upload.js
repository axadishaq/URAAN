import axios from "axios";
const upload = async (file) => {
   const data = new FormData();
   data.append("file", file);
   data.append("upload_preset", "uraaan");
   try {
      const res = await axios.post(
         "https://api.cloudinary.com/v1_1/axad/image/upload",
         data
      );

      return res.data.url;
   } catch (err) {
      console.log("Image upload error", err, data.url);
   }
};
export default upload;
