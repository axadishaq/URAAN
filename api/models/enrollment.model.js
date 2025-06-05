import mongoose from "mongoose";
const { Schema } = mongoose;

const EnrollmentSchema = new Schema(
   {
      userId: { type: String, required: true },
      courseId: { type: String, required: true },
      enrolledAt: { type: Date, default: Date.now },
   },
   { timestamps: true }
);

export default mongoose.model("enrollments", EnrollmentSchema);
