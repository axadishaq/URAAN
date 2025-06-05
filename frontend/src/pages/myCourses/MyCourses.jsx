import React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyCourses() {
   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   const queryClient = useQueryClient();

   const { isLoading, error, data } = useQuery({
      queryKey: ["myCourses"],
      queryFn: () =>
         newRequest
            .get(`/courses?userId=${currentUser._id}`)
            .then((res) => res.data),
   });

   const mutation = useMutation({
      mutationFn: (id) => {
         return newRequest.delete(`/courses/${id}`);
      },
      onSuccess: () => {
         queryClient.invalidateQueries(["myCourses"]);
      },
   });

   const handleDelete = (id) => {
      if (!window.confirm("Are you sure you want to delete this gig?")) return;
      mutation.mutate(id);
      alert("Deleted Successfully!");
   };

   return (
      <div className="bg-theme-light min-h-screen py-8 px-4 sm:px-6 lg:px-8">
         {isLoading ? (
            <div className="flex-col gap-4 w-full h-screen flex items-center justify-center">
               <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                  <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
               </div>
            </div>
         ) : error ? (
            <div className="text-red-600">{error}</div>
         ) : (
            <div className="max-w-7xl mx-auto">
               <div className="flex items-center justify-between mb-6">
                  <h1 className="text-4xl font-semibold text-theme-dark">
                     My Courses
                  </h1>
                  <Link
                     to={"/addcourse"}
                     className="bg-theme-dark hover:bg-theme-dark/90 text-white px-4 py-2 rounded-lg transition-colors">
                     + Create New Course
                  </Link>
               </div>

               <div className="h-auto">
                  <div className="bg-theme-light min-h-screen py-8 px-4 sm:px-6 lg:px-8">
                     <div className="max-w-7xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                           {/* Header */}
                           <div className="bg-theme-dark text-white p-4 flex items-center justify-between">
                              <h2 className="text-xl font-semibold">Courses</h2>
                           </div>

                           {/* Courses List */}
                           <div className="divide-y divide-gray-300">
                              {data && data.length > 0 ? (
                                 data.map((course) => (
                                    <div
                                       key={course._id}
                                       className="p-2 px-8 flex flex-wrap justify-between items-center hover:bg-theme-light transition-all ">
                                       <div className="flex gap-2">
                                          <img
                                             src={course.coverImage}
                                             alt="Course"
                                             className="w-28 h-16 rounded object-cover"
                                          />
                                          <div className="flex flex-col justify-center">
                                             <h4 className="text-theme-dark font-semibold">
                                                {course.title}
                                             </h4>
                                             <p className="text-theme-medium text-sm">
                                                Category: {course.category}
                                             </p>
                                             <p className="text-theme-medium text-sm">
                                                Level: {course.level}
                                             </p>
                                          </div>
                                       </div>
                                       <div className="rounded-lg hidden sm:block">
                                          <p>RS. {course.price}</p>
                                       </div>
                                       <div>
                                          <button
                                             onClick={() =>
                                                handleDelete(course._id)
                                             }
                                             className="p-2 px-6 bg-theme-accent rounded-lg text-white hover:border border-theme-medium">
                                             Delete
                                          </button>
                                       </div>
                                    </div>
                                 ))
                              ) : (
                                 <div className="p-4 text-center text-theme-medium">
                                    No courses found.
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default MyCourses;
