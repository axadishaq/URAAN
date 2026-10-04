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

EnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.model("enrollments", EnrollmentSchema);
