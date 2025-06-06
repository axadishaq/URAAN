import React, { useState } from "react";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";
import upload from "../../utils/upload";
import { useId } from "react";

const AddCourse = () => {
   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   const userId = currentUser?._id;
   console.log(userId);
   const [form, setForm] = useState({
      userId: userId,
      title: "",
      description: "",
      price: "",
      category: "",
      coverImage: "",
      level: "Beginner",
   });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const navigate = useNavigate();

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleFileChange = (e) => {
      setForm({ ...form, coverImage: e.target.files[0] });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      try {
         let coverImageUrl = form.coverImage;
         if (form.coverImage && typeof form.coverImage !== "string") {
            // Upload the image and get the URL
            coverImageUrl = await upload(form.coverImage);
         }
         const courseData = {
            ...form,
            coverImage: coverImageUrl,
         };
         await newRequest.post("/courses", courseData);
         navigate("/courses");
      } catch (err) {
         setError("Failed to add course");
      }
      setLoading(false);
   };

   return (
      <div className="min-h-screen bg-theme-light flex flex-col items-center justify-center py-12 px-4">
         <div className="text-3xl font-bold mb-8 text-theme-dark">
            Add New Course
         </div>
         <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
            <label className="block font-semibold mb-2">Title</label>
            <input
               type="text"
               name="title"
               placeholder="Course Title"
               value={form.title}
               onChange={handleChange}
               required
               className="mb-4 w-full border border-theme-accent p-2 rounded"
            />

            <label className="block font-semibold mb-2">Description</label>
            <textarea
               name="description"
               placeholder="Briefly Describe your Course, what type of skill you tech. Write Course outline and Important points."
               value={form.description}
               onChange={handleChange}
               rows={4}
               required
               className="mb-4 w-full border border-theme-accent p-2 rounded"
            />

            <label className="block font-semibold mb-2">Price (Rs.)</label>
            <input
               type="number"
               name="price"
               value={form.price}
               onChange={handleChange}
               required
               min="1"
               className="mb-4 w-full border border-theme-accent p-2 rounded"
            />

            <label className="block font-semibold mb-2">Category</label>
            <select
               type="text"
               name="category"
               value={form.category}
               onChange={handleChange}
               required
               className="mb-4 w-full border border-theme-accent p-2 rounded">
               <option value="">Select a category</option>
               <option value="design">Design</option>
               <option value="Technicion">Technicion / Repair</option>
               <option value="Clothing">Clothing</option>
               <option value="Groceries">Groceries</option>
               <option value="Electronics">Electronics</option>
               <option value="Household">Household</option>
               <option value="Transport">Transport</option>
               <option value="Delievery">Delievery</option>
            </select>

            <label className="block font-semibold mb-2">Cover Image</label>
            <input
               type="file"
               name="coverImage"
               accept="image/*"
               onChange={handleFileChange}
               className="mb-4 w-full border border-theme-accent rounded p-2"
            />

            <label className="block font-semibold mb-2">Level</label>
            <select
               name="level"
               value={form.level}
               onChange={handleChange}
               className="mb-8 w-full border border-theme-accent p-2 rounded ">
               <option value="Beginner">Beginner</option>
               <option value="Intermediate">Intermediate</option>
               <option value="Advanced">Advanced</option>
            </select>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <button
               type="submit"
               disabled={loading}
               className="w-full bg-theme-accent text-white py-3 rounded font-bold hover:bg-theme-dark transition">
               {loading ? "Adding..." : "Add Course"}
            </button>
         </form>
      </div>
   );
};

export default AddCourse;
