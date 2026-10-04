import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest, { getErrorMessage } from "../../utils/newRequest.js";
import { COURSE_LEVELS } from "../../utils/categories";
import CourseCard from "../../components/courseCard/CourseCard";
import { EmptyState, Notice, PageTitle } from "../../components/ui/ui";
import { btn } from "../../components/ui/styles";

const Courses = () => {
   const [params] = useSearchParams();
   const level = params.get("level") || "";

   const { isLoading, error, data } = useQuery({
      queryKey: ["courses", level],
      queryFn: () =>
         newRequest.get("/courses", { params: level ? { level } : {} }).then((res) => res.data),
   });
   const courses = data || [];

   const tab = (on) =>
      `flex h-10 items-center rounded-[9px] px-4 text-sm font-semibold ${
         on ? "bg-ink text-white" : "text-ink hover:bg-white"
      }`;

   return (
      <div className="bg-cream">
         <div className="mx-auto flex max-w-[1200px] flex-col gap-7 px-4 pb-16 pt-9 sm:px-5">
            <PageTitle
               title={level ? `${level} courses` : "Courses"}
               text="Short skill courses taught by providers on URAAN."
               action={
                  <nav aria-label="Course level" className="flex flex-wrap gap-1.5 rounded-xl bg-[#f0e3d9] p-1">
                     <Link to="/courses" aria-current={!level ? "page" : undefined} className={tab(!level)}>
                        All
                     </Link>
                     {COURSE_LEVELS.map((l) => (
                        <Link key={l} to={`/courses?level=${l}`} aria-current={level === l ? "page" : undefined} className={tab(level === l)}>
                           {l}
                        </Link>
                     ))}
                  </nav>
               }
            />
            {error ? (
               <Notice>{getErrorMessage(error)}</Notice>
            ) : isLoading ? (
               <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((n) => (
                     <div key={n} className="h-80 animate-pulse rounded-2xl bg-white" />
                  ))}
               </div>
            ) : courses.length === 0 ? (
               <div className="rounded-2xl border border-line bg-white">
                  <EmptyState
                     title={`No ${level ? `${level} ` : ""}courses found.`}
                     text="Check back soon, or see all levels."
                     action={
                        level ? (
                           <Link to="/courses" className={btn.secondary}>
                              Show all courses
                           </Link>
                        ) : null
                     }
                  />
               </div>
            ) : (
               <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {courses.map((course) => (
                     <CourseCard key={course._id} course={course} />
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};

export default Courses;
