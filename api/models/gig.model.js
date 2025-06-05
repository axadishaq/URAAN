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
      },
      revisionNumber: {
         type: Number,
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
