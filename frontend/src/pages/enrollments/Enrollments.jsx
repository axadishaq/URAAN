import React, { useEffect, useState } from "react";
import newRequest from "../../utils/newRequest";

const Enrollments = () => {
   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   const userId = currentUser?._id || currentUser?.id;
   const token = localStorage.getItem("token") || currentUser?.token;

   const [enrollments, setEnrollments] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      if (!userId || !token) {
         setError("You must be logged in to view enrollments.Missing Token! ");
         setLoading(false);
         return;
      }
      const fetchEnrollments = async () => {
         try {
            // const res = await newRequest.get(
            //    `/enrollments/user/${userId}`,
            //    {
            //       headers: {
            //          Authorization: `Bearer ${token}`,
            //       },
            //    }
            // );
            const res = await newRequest(
               `/enrollments/user/${userId}`
            );
            setEnrollments(res.data);
         } catch (err) {
            setError("Failed to fetch enrollments");
         } finally {
            setLoading(false);
         }
      };
      fetchEnrollments();
   }, [userId, token]);

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

   return (
      <div className="max-w-3xl mx-auto p-8">
         <h2 className="text-2xl font-bold mb-4">My Enrollments</h2>
         {enrollments.length === 0 ? (
            <p>No enrollments found.</p>
         ) : (
            <ul>
               {enrollments.map((enroll) => (
                  <li key={enroll._id} className="mb-6 border-b pb-4">
                     <h3 className="text-xl font-semibold">
                        {enroll.courseId?.title}
                     </h3>
                     <p>{enroll.courseId?.description}</p>
                     <span className="text-sm text-gray-500">
                        Enrolled at:{" "}
                        {new Date(enroll.enrolledAt).toLocaleString()}
                     </span>
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
};

export default Enrollments;
