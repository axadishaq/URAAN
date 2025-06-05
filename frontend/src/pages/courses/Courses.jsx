import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router";

const Courses = () => {
   const [courses, setCourses] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const location = useLocation();
   const params = new URLSearchParams(location.search);
   const level = params.get("level");

   useEffect(() => {
      const fetchCourses = async () => {
         try {
            const res = await axios.get("http://localhost:8800/api/courses");
            let data = res.data;
            if (level) {
               data = data.filter((course) => course.level === level);
            }
            setCourses(data);
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      };
      fetchCourses();
   }, [level]);

   // const [courses, setCourses] = useState([]);
   // const [loading, setLoading] = useState(true);
   // const [error, setError] = useState(null);

   // const fetchCourses = async () => {
   //    try {
   //       const res = await axios.get("http://localhost:8800/api/courses");
   //       setCourses(res.data);
   //    } catch (err) {
   //       setError(err.message);
   //    } finally {
   //       setLoading(false);
   //    }
   // };
   // useEffect(() => {
   //    fetchCourses();
   // }, []);

   if (loading)
      return (
         <>
            {/* Loader  */}
            <div className="flex-col gap-4 w-full h-screen flex items-center justify-center">
               <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                  <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
               </div>
            </div>
         </>
      );
   if (error) return <div>Error: {error}</div>;

   return (
      <>
         <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* <!-- Job Card 2 --> */}
                  {courses.map((course) => (
                     <div
                        key={course._id}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-lg/30 hover:-translate-y-2  transition-all duration-500">
                        <div>
                           <div className="flex gap-2">
                              <span className="border-theme-accent border text-theme-accent px-3 py-1 rounded-md text-sm font-medium">
                                 {course.level}
                              </span>
                              {/* <span className="border-theme-accent border text-theme-accent px-3 py-1 rounded-md text-sm font-medium">
                                 {course.owner?.country}
                              </span> */}
                           </div>
                        </div>
                        <div className="flex items-start justify-arround item-center mb-4 mt-4">
                           <div className="w-12 h-12 bg-gray-100 rounded-md my-auto">
                              <img
                                 src={course.coverImage || "/img/avatar.png"}
                                 alt="course"
                                 className="w-full h-full rounded-md"
                              />
                           </div>
                           <h3 className="font-semibold text-xl m-2">
                              {course.title}
                           </h3>
                        </div>
                        <div className="flex items-center text-theme-medium mb-3">
                           <span>
                              {course?.description?.substring(0, 100)}
                              ...
                           </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                           <span className="bg-gray-100 text-theme-medium px-3 py-1 rounded-full text-sm">
                              {course.category}
                           </span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="font-semibold text-theme-medium">
                              Rs. {course.price}
                           </span>
                        </div>
                        <div className="flex justify-center items-center  text-white rounded-lg mt-4 p-2 border-3 transition-all duration-500 bg-theme-dark font-bold  hover:bg-theme-light hover:border-amber-900 hover:text-theme-dark">
                           <Link to={`/courses/${course._id}`} className=" ">
                              Enroll Now
                           </Link>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>
         {/* <div>
            <h2>All Courses</h2>
            {courses.length === 0 ? (
               <p>No courses found.</p>
            ) : (
               <ul>
                  {courses.map((course) => (
                     <li key={course._id}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <p>
                           <strong>Category:</strong> {course.category}
                        </p>
                        <p>
                           <strong>Level:</strong> {course.level}
                        </p>
                        <p>
                           <strong>Price:</strong> ${course.price}
                        </p>
                     </li>
                  ))}
               </ul>
            )}
         </div> */}
      </>
   );
};

export default Courses;
