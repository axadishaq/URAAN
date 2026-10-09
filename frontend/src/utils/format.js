import moment from "moment";

export const formatPrice = (value) =>
   `Rs. ${Number(value || 0).toLocaleString("en-PK")}`;

export const averageRating = (gig) =>
   gig?.starNumber > 0 ? gig.totalStars / gig.starNumber : 0;

export const ratingText = (gig) => averageRating(gig).toFixed(1);

// "2 days left", "Overdue by 3 days" or "Delivered"
export const dueInfo = (order) => {
   if (order.isCompleted) return { text: "Delivered", late: false };
   if (!order.deliveryTime) return { text: "Time agreed in chat", late: false };
   const due = moment(order.createdAt).add(Number(order.deliveryTime), "days");
   return due.isAfter(moment())
      ? { text: `${due.toNow(true)} left`, late: false }
      : { text: `Overdue by ${due.fromNow(true)}`, late: true };
};
