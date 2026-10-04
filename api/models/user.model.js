import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
         trim: true,
      },
      email: {
         type: String,
         required: true,
         lowercase: true,
         trim: true,
      },
      password: {
         type: String,
         required: true,
      },
      img: {
         type: String,
         required: false,
      },
      country: {
         type: String,
         required: true,
         trim: true,
      },
      phone: {
         type: String,
         required: false,
      },
      desc: {
         type: String,
         required: false,
      },
      isSeller: {
         type: Boolean,
         default: false,
      },
      isAdmin: {
         type: Boolean,
         default: false,
      },
   },
   {
      timestamps: true,
   }
);

export default mongoose.model("users", UserSchema);
