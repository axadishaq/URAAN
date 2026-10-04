import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import CourseCard from "../courseCard/CourseCard";
import { btn } from "../ui/styles";

export const FeatureCourses = () => {
   const { data, isLoading } = useQuery({
      queryKey: ["courses", "featured"],
      queryFn: () => newRequest.get("/courses").then((res) => res.data),
   });
   const courses = (data || []).slice(0, 3);

   // Nothing to feature yet: keep the home page tidy
   if (!isLoading && courses.length === 0) return null;

   return (
      <section className="bg-cream px-4 py-20">
         <div className="mx-auto flex max-w-[1200px] flex-col gap-7">
            <div className="flex flex-wrap items-end justify-between gap-3">
               <div className="flex flex-col gap-2">
                  <h2 className="m-0 font-display text-3xl font-bold sm:text-4xl">Featured Courses</h2>
                  <p className="m-0 text-base text-muted">Handpicked courses from local experts.</p>
               </div>
               <Link to="/courses" className={btn.primary}>
                  View all courses
               </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
               {isLoading
                  ? [1, 2, 3].map((n) => <div key={n} className="h-80 animate-pulse rounded-2xl bg-white" />)
                  : courses.map((course) => <CourseCard key={course._id} course={course} />)}
            </div>
         </div>
      </section>
   );
};
