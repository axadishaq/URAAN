// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const CourseDetail = () => {
//    const { id } = useParams();
//    const [course, setCourse] = useState(null);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState(null);

//    useEffect(() => {
//       const fetchCourse = async () => {
//          try {
//             const res = await axios.get(
//                `http://localhost:8800/api/courses/${id}`
//             );
//             setCourse(res.data);
//          } catch (err) {
//             setError("Course not found");
//          } finally {
//             setLoading(false);
//          }
//       };
//       fetchCourse();
//    }, [id]);

//    if (loading)
//       return (
//          <>
//             {/* Loader  */}
//             <div className="flex-col gap-4 w-full h-screen flex items-center justify-center">
//                <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
//                   <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
//                </div>
//             </div>
//          </>
//       );
//    if (error) return <div>{error}</div>;
//    if (!course) return <div>No course data.</div>;

//    return (
//       <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
//          <img
//             src={course.coverImage || "/img/avatar.png"}
//             alt={course.title}
//             className="w-full h-64 object-cover rounded-md mb-6"
//          />
//          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
//          <p className="mb-4 text-theme-medium">{course.description}</p>
//          <div className="mb-2">
//             <span className="bg-gray-100 text-theme-medium px-3 py-1 rounded-full text-sm mr-2">
//                {course.category}
//             </span>
//             <span className="border-theme-accent border text-theme-accent px-3 py-1 rounded-md text-sm font-medium">
//                {course.level}
//             </span>
//          </div>
//          <div className="font-semibold text-theme-medium mb-4">
//             Rs. {course.price}
//          </div>
//          <div>
//             {/* <h2 className="text-xl font-semibold mb-2">Content</h2>
//             <ul className="list-disc pl-6">
//                {course.content?.map((item, idx) => (
//                   <li key={idx}>
//                      <strong>{item.title}</strong> ({item.duration} min)
//                   </li>
//                ))}
//             </ul> */}
//          </div>
//       </div>
//    );
// };

// export default CourseDetail;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import newRequest from "../../utils/newRequest";

const CourseDetail = () => {
   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   const userId = currentUser?._id || currentUser?.id;
   //    const token = localStorage.getItem("token") || currentUser?.token;

   const { id } = useParams();
   const [course, setCourse] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [enrollMsg, setEnrollMsg] = useState("");
   // Replace with your auth logic
   const navigate = useNavigate();
   useEffect(() => {
      const fetchCourse = async () => {
         try {
            const res = await axios.get(
               `http://localhost:8800/api/courses/${id}`
            );
            setCourse(res.data);
         } catch (err) {
            setError("Course not found");
         } finally {
            setLoading(false);
         }
      };
      fetchCourse();
   }, [id]);
   // console.log(userId, id);
   const handleEnroll = async () => {
      //   console.log(localStorage.getItem("currentUser"));
      if (!currentUser || !userId) {
         setEnrollMsg("You must be logged in to enroll.");
         alert("You must be logged in to enroll.");
         return;
      }
      try {
         await newRequest.post("http://localhost:8800/api/enrollments", {
            userId: userId,
            courseId: id,
         });
         setEnrollMsg("Enrolled successfully!");
         alert("Enrolled successfully");
         navigate("/myenrollments"); // Redirect to my courses page
      } catch (err) {
         setEnrollMsg(err.response?.data?.message || "Enrollment failed");
         alert(err.response?.data?.message || "Enrollment failed");
      }
   };

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
   if (error) return <div>{error}</div>;
   if (!course) return <div>No course data.</div>;

   return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
         <img
            src={course.coverImage || "/img/avatar.png"}
            alt={course.title}
            className="w-full h-64 object-cover rounded-md mb-6"
         />
         <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
         <p className="mb-4 text-theme-medium">{course.description}</p>
         <div className="mb-2">
            <span className="bg-gray-100 text-theme-medium px-3 py-1 rounded-full text-lg mr-2">
               {course.category}
            </span>
            <span className="border-theme-accent border text-theme-accent px-3 py-1 rounded-md text-sm font-medium">
               {course.level}
            </span>
         </div>
         <div className="font-semibold text-theme-medium mb-4 text-xl">
            Rs. {course.price}
         </div>
         <div>
            {/* <h2 className="text-xl font-semibold mb-2">Content</h2>
            <ul className="list-disc pl-6">
               {course.content?.map((item, idx) => (
                  <li key={idx}>
                     <strong>{item.title}</strong> ({item.duration} min)
                  </li>
               ))}
            </ul> */}
         </div>
         <button
            onClick={handleEnroll}
            className=" w-full mt-6 px-6 py-2 bg-theme-dark text-white rounded-lg hover:bg-theme-accent">
            Enroll
         </button>
         {enrollMsg && <div className="mt-4 text-green-600">{enrollMsg}</div>}
      </div>
   );
};

export default CourseDetail;
