import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import newRequest, { getErrorMessage } from "../../utils/newRequest";
import { getCurrentUser } from "../../utils/currentUser";
import { categoryLabel } from "../../utils/categories";
import { Badge, EmptyState, Notice, PageTitle, Picture, Spinner } from "../../components/ui/ui";
import { btn } from "../../components/ui/styles";

function MyEnrollments() {
   const currentUser = getCurrentUser();

   // One request returns each enrollment with its course attached
   const { isLoading, error, data } = useQuery({
      queryKey: ["enrollments", currentUser?._id],
      queryFn: () => newRequest.get("/enrollments/me").then((res) => res.data),
      enabled: !!currentUser,
   });
   const enrollments = data || [];

   return (
      <div className="bg-cream">
         <div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-4 pb-14 pt-9 sm:px-5">
            <PageTitle
               title="My learning"
               text="Courses you have enrolled in."
               action={
                  <Link to="/orders" className={btn.secondary}>
                     View my orders
                  </Link>
               }
            />
            {isLoading ? (
               <Spinner label="Loading courses" />
            ) : error ? (
               <Notice>{getErrorMessage(error, "Failed to load enrolled courses.")}</Notice>
            ) : enrollments.length === 0 ? (
               <div className="rounded-2xl border border-line bg-white">
                  <EmptyState
                     title="No enrolled courses yet"
                     text="Learn a new skill from providers in your city."
                     action={
                        <Link to="/courses" className={btn.primary}>
                           Browse courses
                        </Link>
                     }
                  />
               </div>
            ) : (
               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {enrollments.map(({ _id, course, createdAt }) => (
                     <Link
                        key={_id}
                        to={`/courses/${course._id}`}
                        className="flex gap-3.5 rounded-[14px] border border-line bg-white p-3.5 text-ink hover:shadow-[0_8px_24px_rgba(43,13,7,0.08)]">
                        <Picture src={course.coverImage} alt="" className="h-[72px] w-24 shrink-0 rounded-[10px]" />
                        <span className="flex min-w-0 flex-col gap-1">
                           <span className="flex flex-wrap gap-1.5">
                              <Badge>{course.level}</Badge>
                              <Badge tone="outline">{categoryLabel(course.category)}</Badge>
                           </span>
                           <strong className="truncate">{course.title}</strong>
                           <span className="text-[13px] text-muted">Enrolled {moment(createdAt).format("D MMM YYYY")}</span>
                        </span>
                     </Link>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
}

export default MyEnrollments;
