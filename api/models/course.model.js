import mongoose from "mongoose";
const { Schema } = mongoose;

const CourseSchema = new Schema(
   {
      gigId: {
         type: String,
         // required: true,
      },
      userId: {
         type: String,
         required: true,
      },
      title: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      price: {
         type: Number,
         required: true,
      },

      category: {
         type: String,
         required: true,
      },
      coverImage: {
         type: String,
      },
      level: {
         type: String,
         enum: ["Beginner", "Intermediate", "Advanced"],
         default: "Beginner",
      },
      enrolledCount: {
         type: Number,
         default: 0,
      },
      rating: {
         type: Number,
         default: 0,
      },
      reviewCount: {
         type: Number,
         default: 0,
      },
   },
   {
      timestamps: true,
   }
);

export default mongoose.model("courses", CourseSchema);
