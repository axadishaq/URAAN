import React, { useReducer, useState } from "react";
import { X } from "lucide-react";

import { gigReducer, INITIAL_STATE } from "../../pages/reducers/gigReducer.js";
import upload from "../../utils/upload.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";

const Add = () => {
   const [singleFile, setSingleFile] = useState(undefined);
   const [files, setFiles] = useState([]);
   const [uploading, setUploading] = useState(false);

   const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

   const handleChange = (e) => {
      dispatch({
         type: "CHANGE_INPUT",
         payload: { name: e.target.name, value: e.target.value },
      });
   };

   const handleFeature = (e) => {
      e.preventDefault();
      dispatch({
         type: "ADD_FEATURE",
         payload: e.target[0].value,
      });
      e.target[0].value = "";
   };

   const handleUpload = async () => {
      setUploading(true);
      try {
         const cover = await upload(singleFile);

         const images = await Promise.all(
            [...files].map(async (file) => {
               const url = await upload(file);
               return url;
            })
         );
         setUploading(false);
         dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
      } catch (err) {
         console.log(err);
         setUploading(false);
      }
   };

   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: (gig) => {
         return newRequest.post("/gigs/creategig", gig);
      },
      onSuccess: () => {
         queryClient.invalidateQueries(["myGigs"]);
         navigate("/gigs");
      },
      onError: (error) => {
         console.error("Failed to create gig:", error);
         alert("Failed to create service. Please try again.");
      },
   });

   const handleSubmit = (e) => {
      e.preventDefault();

      // Debug: Log the current state
      console.log("Submitting state:", state);

      // Basic validation
      if (!state.title) {
         alert("Please enter a title");
         return;
      }

      if (!state.desc) {
         alert("Please enter a description");
         return;
      }

      if (!state.price) {
         alert("Please enter a price");
         return;
      }

      try {
         mutation.mutate(state);
         // navigate("/mygigs");
      } catch (error) {
         console.error("Error during mutation:", error);
      }
   };
   // console.log(state);
   return (
      <div className="min-h-screen bg-theme-light flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-full text-md">
         <div className="mt-6 text-4xl font-bold text-theme-dark mb-8">
            <h1>Post a new Service / Hire a Group</h1>
         </div>
         <form onSubmit={handleSubmit}>
            <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-10 grid grid-cols-1 md:grid-cols-2 gap-3">
               <div>
                  <label className="block text-xl font-semibold text-theme-dark">
                     Title
                  </label>
                  <input
                     type="text"
                     name="title"
                     onChange={handleChange}
                     className="mt-5 block w-full rounded-lg border border-theme-accent shadow-sm p-3"
                     placeholder="What you'll do."
                     required
                  />

                  <label className="block mt-8 text-xl font-semibold text-theme-dark">
                     Category
                  </label>
                  <select
                     name="category"
                     id="category"
                     onChange={handleChange}
                     className="mt-5 block w-full rounded-lg border border-theme-accent shadow-sm p-3"
                     required>
                     <option value="">Select a category</option>
                     <option value="design">Design</option>
                     <option value="Technicion">Technicion / Repair</option>
                     <option value="Clothing">Clothing</option>
                     <option value="Groceries">Groceries</option>
                     <option value="Electronics">Electronics</option>
                     <option value="Household">Household</option>
                     <option value="Transport">Transport</option>
                     <option value="Delievery">Delievery</option>
                     <option value="GroupHiring">Group Hiring</option>
                  </select>

                  <label className="block mt-8 text-xl font-semibold text-theme-dark">
                     Cover Image
                  </label>
                  <input
                     type="file"
                     onChange={(e) => setSingleFile(e.target.files[0])}
                     className="mt-5 block w-full border border-theme-accent shadow-sm p-3 rounded-lg"
                     accept="image/*"
                  />

                  <label className="block mt-8 text-xl font-semibold text-theme-dark">
                     Upload Images
                  </label>
                  <input
                     type="file"
                     multiple
                     onChange={(e) => setFiles(e.target.files)}
                     className="mt-5 block w-full border border-theme-accent shadow-sm p-3 rounded-lg"
                     accept="image/*"
                  />
                  <button
                     type="button"
                     className="mt-5 w-1/2 py-3 px-4 bg-theme-accent text-white rounded-md transition-all duration-300 transform hover:scale-103 hover:bg-theme-dark shadow-lg hover:shadow-xl"
                     onClick={handleUpload}
                     disabled={uploading}>
                     {uploading ? "Uploading..." : "Upload"}
                  </button>

                  <label className="block mt-8 text-xl font-semibold text-theme-dark">
                     Description
                  </label>
                  <textarea
                     name="desc"
                     onChange={handleChange}
                     rows="4"
                     className="mt-5 block w-full rounded-lg border border-theme-accent shadow-sm p-3"
                     placeholder="Brief descriptions to introduce your Work."
                     required></textarea>
                  <label className="mt-5 block text-xl font-semibold text-theme-dark">
                     City
                  </label>
                  <input
                     type="text"
                     name="country"
                     onChange={handleChange}
                     className="mt-5 block w-full rounded-lg border border-theme-accent shadow-sm p-3"
                     placeholder="City Name"
                     required
                  />
               </div>

               <div>
                  <label className="block text-xl font-semibold text-theme-dark">
                     Business / Shop Name
                  </label>
                  <input
                     type="text"
                     name="shortTitle"
                     required
                     onChange={handleChange}
                     className="mt-5 block w-full rounded-lg border border-theme-accent shadow-sm p-3"
                     placeholder="e.g. Chaudhary Transports & Goods"
                  />

                  <label className="block mt-8 text-xl font-semibold text-theme-dark">
                     Business Description
                  </label>
                  <textarea
                     name="shortDesc"
                     onChange={handleChange}
                     required
                     rows="3"
                     className="mt-5 block w-full rounded-lg border border-theme-accent shadow-sm p-3"
                     placeholder="Describe your Business shortly."></textarea>

                  <label className="block mt-8 text-xl font-semibold text-theme-dark">
                     Time (days)
                  </label>
                  <input
                     type="number"
                     name="deliveryTime"
                     onChange={handleChange}
                     className="mt-5 block w-full rounded-lg border border-theme-accent shadow-sm p-3"
                     placeholder="How much time you'll take. e.g. 3"
                     min="1"
                  />

                  <label className="block mt-8 text-xl font-semibold text-theme-dark">
                     Revision Number
                  </label>
                  <input
                     type="number"
                     name="revisionNumber"
                     placeholder="No. of modifications(Service only)"
                     onChange={handleChange}
                     className="mt-5 block w-full rounded-lg border border-theme-accent shadow-sm p-3"
                     min="0"
                  />

                  <label className="block mt-8 text-xl font-semibold text-theme-dark">
                     Add Features
                  </label>
                  <div onSubmit={handleFeature}>
                     <div className="flex gap-2 mt-5">
                        <input
                           type="text"
                           placeholder="Feature of your Service."
                           className="block w-full rounded-lg border border-theme-accent shadow-sm p-3"
                        />
                        <button
                           type="button"
                           onClick={(e) => {
                              const input = e.target.previousElementSibling;
                              if (input.value.trim()) {
                                 dispatch({
                                    type: "ADD_FEATURE",
                                    payload: input.value.trim(),
                                 });
                                 input.value = "";
                              }
                           }}
                           className="py-3 px-4 bg-theme-accent text-white rounded-md transition-all duration-300 transform hover:scale-103 hover:bg-theme-dark shadow-lg hover:shadow-xl">
                           Add
                        </button>
                     </div>
                  </div>
                  <div className="flex gap-2 mt-5 flex-wrap w-full">
                     {state?.features?.map((f, index) => (
                        <div
                           className="flex gap-2 text-lg"
                           key={`${f}-${index}`}>
                           <button
                              type="button"
                              className="flex gap-2 justify-between py-1 px-2 bg-theme-accent text-white rounded-md transition-all duration-300 transform hover:scale-103 hover:bg-theme-dark shadow-lg hover:shadow-xl"
                              onClick={() =>
                                 dispatch({
                                    type: "REMOVE_FEATURE",
                                    payload: f,
                                 })
                              }>
                              {f}
                              <span className="text-red-800 hover:text-red-600 my-auto">
                                 <X />
                              </span>
                           </button>
                        </div>
                     ))}
                  </div>

                  <label className="block mt-8 text-xl font-semibold text-theme-dark">
                     Price (Rs. )
                  </label>
                  <input
                     type="number"
                     name="price"
                     onChange={handleChange}
                     className="mt-5 block w-full rounded-lg border border-theme-accent shadow-sm p-3"
                     min="1"
                     step="0.01"
                     required
                  />
               </div>

               <div className="md:col-span-2 flex justify-start">
                  <button
                     type="submit"
                     disabled={mutation.isLoading}
                     className="w-full mt-8 px-5 py-3 bg-theme-accent text-white rounded-lg text-xl font-bold hover:bg-theme-dark transition disabled:opacity-50 disabled:cursor-not-allowed">
                     {mutation.isLoading ? "Creating..." : "Create"}
                  </button>
               </div>
            </div>
         </form>
      </div>
   );
};

export default Add;
