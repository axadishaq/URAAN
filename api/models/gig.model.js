import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema(
   {
      userId: {
         type: String,
         required: true,
         // unique: true,
      },

      title: {
         type: String,
         required: true,
      },

      desc: {
         type: String,
         required: false,
      },
      price: {
         type: Number,
         min: [0, "Price can't be negative"],
      },
      category: {
         type: String,
         required: true,
      },
      totalStars: {
         type: Number,
         default: 0,
      },
      starNumber: {
         type: Number,
         default: 0,
      },
      cover: {
         type: String,
         required: true,
      },
      images: {
         type: [String],
         required: false,
      },

      country: {
         type: String,
         // required: true,
      },
      shortTitle: {
         type: String,
         required: true,
      },
      shortDesc: {
         type: String,
         required: true,
      },
      deliveryTime: {
         type: Number,
         required: true,
         min: [1, "Delivery time must be at least 1 day"],
      },
      revisionNumber: {
         type: Number,
         min: [0, "Revisions can't be negative"],
         // required: true,
      },
      features: {
         type: [String],
         // required: false,
      },
      sales: {
         type: Number,
         default: 0,
      },
   },
   {
      timestamps: true,
   }
);

export default mongoose.model("gigs", GigSchema);
