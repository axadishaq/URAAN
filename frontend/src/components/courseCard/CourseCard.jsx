import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { categoryLabel } from "../../utils/categories";
import { formatPrice } from "../../utils/format";
import { Badge, Picture } from "../ui/ui";

const CourseCard = ({ course }) => {
   const { data: owner } = useQuery({
      queryKey: ["user", course.userId],
      queryFn: () => newRequest.get(`/users/${course.userId}`).then((res) => res.data),
      enabled: !!course.userId,
   });

   return (
      <Link
         to={`/courses/${course._id}`}
         className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white text-ink transition-shadow hover:shadow-[0_10px_28px_rgba(43,13,7,0.10)]">
         <Picture src={course.coverImage} alt="" className="h-40 w-full" />
         <div className="flex flex-1 flex-col gap-2.5 p-[18px]">
            <div className="flex flex-wrap gap-2">
               <Badge>{course.level}</Badge>
               <Badge tone="outline">{categoryLabel(course.category)}</Badge>
            </div>
            <h3 className="m-0 text-lg font-semibold leading-snug">{course.title}</h3>
            <span className="text-sm text-muted">
               {owner ? `by ${owner.username} · ` : ""}
               {course.enrolledCount || 0} enrolled
            </span>
            <div className="flex-1" />
            <div className="flex items-center justify-between">
               <span className="text-lg font-bold">{formatPrice(course.price)}</span>
               <span className="text-sm font-semibold text-clay group-hover:underline">Enroll Now →</span>
            </div>
         </div>
      </Link>
   );
};

export default CourseCard;
