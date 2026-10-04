import React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import newRequest, { getErrorMessage } from "../../utils/newRequest";
import { getCurrentUser } from "../../utils/currentUser";
import { categoryLabel } from "../../utils/categories";
import { formatPrice } from "../../utils/format";
import { Badge, EmptyState, Notice, PageTitle, Picture, Spinner } from "../../components/ui/ui";
import { btn } from "../../components/ui/styles";
import { useToast } from "../../components/ui/Toast";

function MyCourses() {
   const currentUser = getCurrentUser();
   const queryClient = useQueryClient();
   const toast = useToast();

   const { isLoading, error, data } = useQuery({
      queryKey: ["myCourses", currentUser?._id],
      queryFn: () => newRequest.get(`/courses?userId=${currentUser._id}`).then((res) => res.data),
   });

   const mutation = useMutation({
      mutationFn: (course) => newRequest.delete(`/courses/${course._id}`),
      onSuccess: (_, course) => {
         queryClient.invalidateQueries({ queryKey: ["myCourses"] });
         queryClient.invalidateQueries({ queryKey: ["courses"] });
         queryClient.invalidateQueries({ queryKey: ["enrollments"] });
         toast({ title: "Course deleted", text: `"${course.title}" was removed.` });
      },
      onError: (err) => toast({ type: "error", title: "Could not delete the course", text: getErrorMessage(err) }),
   });

   const handleDelete = (course) => {
      if (window.confirm(`Delete "${course.title}"? Enrolled students will lose access.`)) mutation.mutate(course);
   };

   const courses = data || [];

   return (
      <div className="bg-cream">
         <div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-4 pb-14 pt-9 sm:px-5">
            <PageTitle
               title="My courses"
               text="Courses you teach on URAAN."
               action={
                  <Link to="/addcourse" className={btn.primary}>
                     <Plus size={18} aria-hidden="true" />
                     Create a course
                  </Link>
               }
            />
            <section className="overflow-hidden rounded-2xl border border-line bg-white">
               {isLoading ? (
                  <Spinner label="Loading courses" />
               ) : error ? (
                  <div className="p-4">
                     <Notice>{getErrorMessage(error)}</Notice>
                  </div>
               ) : courses.length === 0 ? (
                  <EmptyState
                     title="No courses yet"
                     text="Share your skills by creating a short course."
                     action={
                        <Link to="/addcourse" className={btn.primary}>
                           Create a course
                        </Link>
                     }
                  />
               ) : (
                  <ul className="m-0 list-none p-0">
                     {courses.map((course) => (
                        <li key={course._id} className="flex flex-wrap items-center gap-4 border-b border-[#f0e3d9] px-5 py-4 last:border-b-0">
                           <Picture src={course.coverImage} alt="" className="h-16 w-[88px] shrink-0 rounded-[10px]" />
                           <div className="flex min-w-[220px] flex-1 flex-col gap-1">
                              <Link to={`/courses/${course._id}`} className="font-semibold text-ink hover:underline">
                                 {course.title}
                              </Link>
                              <span className="flex flex-wrap items-center gap-2 text-sm text-muted">
                                 <Badge>{course.level}</Badge>
                                 {categoryLabel(course.category)} · {course.enrolledCount || 0} enrolled
                              </span>
                           </div>
                           <span className="w-24 text-right font-bold">{formatPrice(course.price)}</span>
                           <div className="flex gap-2">
                              <Link to={`/courses/${course._id}`} className={btn.small}>
                                 View
                              </Link>
                              <button type="button" onClick={() => handleDelete(course)} disabled={mutation.isPending} className={btn.danger}>
                                 Delete
                              </button>
                           </div>
                        </li>
                     ))}
                  </ul>
               )}
            </section>
         </div>
      </div>
   );
}

export default MyCourses;
