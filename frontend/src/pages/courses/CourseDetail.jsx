import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Users } from "lucide-react";
import newRequest, { getErrorMessage } from "../../utils/newRequest.js";
import { getCurrentUser } from "../../utils/currentUser";
import { categoryLabel } from "../../utils/categories";
import { formatPrice } from "../../utils/format";
import { Avatar, Badge, Breadcrumb, EmptyState, Notice, Picture, Spinner } from "../../components/ui/ui";
import { btn } from "../../components/ui/styles";
import { useToast } from "../../components/ui/Toast";

const CourseDetail = () => {
   const currentUser = getCurrentUser();
   const userId = currentUser?._id;
   const { id } = useParams();
   const navigate = useNavigate();
   const queryClient = useQueryClient();
   const toast = useToast();
   const [enrollMsg, setEnrollMsg] = useState("");
   const [enrolling, setEnrolling] = useState(false);

   const { isLoading, error, data: course } = useQuery({
      queryKey: ["course", id],
      queryFn: () => newRequest.get(`/courses/${id}`).then((res) => res.data),
   });
   const { data: owner } = useQuery({
      queryKey: ["user", course?.userId],
      queryFn: () => newRequest.get(`/users/${course.userId}`).then((res) => res.data),
      enabled: !!course?.userId,
   });
   // Is the user already enrolled?
   const { data: status } = useQuery({
      queryKey: ["enrollment-status", id, userId],
      queryFn: () => newRequest.get(`/enrollments/status/${id}`).then((res) => res.data),
      enabled: !!userId,
   });
   const enrolled = status?.enrolled;

   if (isLoading) return <Spinner label="Loading course" />;
   if (error)
      return (
         <div className="mx-auto max-w-xl px-4 py-16">
            <EmptyState
               title={getErrorMessage(error, "Course not found")}
               action={
                  <Link to="/courses" className={btn.secondary}>
                     Back to courses
                  </Link>
               }
            />
         </div>
      );

   const isOwner = userId && course.userId === userId;

   const handleEnroll = async () => {
      if (!userId) {
         toast({ type: "info", title: "Please log in first", text: "You need an account to enroll." });
         navigate("/login", { state: { from: { pathname: `/courses/${id}` } } });
         return;
      }
      setEnrolling(true);
      setEnrollMsg("");
      try {
         await newRequest.post("/enrollments", { courseId: id });
         queryClient.invalidateQueries({ queryKey: ["enrollments"] });
         queryClient.invalidateQueries({ queryKey: ["enrollment-status", id] });
         queryClient.invalidateQueries({ queryKey: ["course", id] });
         toast({ title: "Enrolled successfully", text: `"${course.title}" is now in My learning.` });
         navigate("/myenrollments");
      } catch (err) {
         setEnrollMsg(getErrorMessage(err, "Enrollment failed"));
         queryClient.invalidateQueries({ queryKey: ["enrollment-status", id] });
         setEnrolling(false);
      }
   };

   return (
      <div className="bg-cream">
         <div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-4 pb-16 pt-7 sm:px-5">
            <Breadcrumb
               items={[
                  { label: "Courses", to: "/courses" },
                  { label: course.level, to: `/courses?level=${course.level}` },
                  { label: course.title },
               ]}
            />
            <div className="flex flex-col items-start gap-8 lg:flex-row">
               <article className="flex w-full min-w-0 flex-1 flex-col gap-5">
                  <Picture src={course.coverImage} alt="" className="h-64 w-full rounded-2xl sm:h-80" />
                  <div className="flex flex-wrap gap-2">
                     <Badge>{course.level}</Badge>
                     <Badge tone="outline">{categoryLabel(course.category)}</Badge>
                  </div>
                  <h1 className="m-0 font-display text-3xl font-bold leading-tight sm:text-4xl">{course.title}</h1>
                  <div className="rounded-2xl border border-line bg-white p-6">
                     <h2 className="mb-3 mt-0 text-xl font-bold">About this course</h2>
                     <p className="m-0 whitespace-pre-line text-base leading-relaxed text-[#3e2219]">{course.description}</p>
                  </div>
               </article>

               <aside className="flex w-full shrink-0 flex-col gap-4 rounded-2xl border border-line bg-white p-6 shadow-[0_8px_24px_rgba(43,13,7,0.06)] lg:sticky lg:top-24 lg:w-[340px]">
                  <span className="font-display text-[32px] font-bold">
                     {Number(course.price) === 0 ? "Free" : formatPrice(course.price)}
                  </span>
                  <span className="flex items-center gap-2 text-[15px] text-muted">
                     <Users size={18} aria-hidden="true" />
                     {course.enrolledCount || 0} enrolled
                  </span>
                  {owner && (
                     <span className="flex items-center gap-2.5 text-[15px]">
                        <Avatar user={owner} size={36} />
                        <span>
                           Taught by <strong>{owner.username}</strong>
                           {owner.country && <span className="text-muted"> · {owner.country}</span>}
                        </span>
                     </span>
                  )}
                  {enrollMsg && <Notice>{enrollMsg}</Notice>}
                  {isOwner ? (
                     <p className="m-0 rounded-xl bg-cream p-3 text-center text-[15px] text-muted">This is your course.</p>
                  ) : enrolled ? (
                     <Link to="/myenrollments" className={`${btn.secondary} w-full`}>
                        Enrolled ✓ · Go to my courses
                     </Link>
                  ) : (
                     <button type="button" onClick={handleEnroll} disabled={enrolling} className={`${btn.primary} h-[52px] w-full`}>
                        {enrolling ? "Enrolling..." : "Enroll"}
                     </button>
                  )}
               </aside>
            </div>
         </div>
      </div>
   );
};

export default CourseDetail;
