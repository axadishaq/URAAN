import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
   {
      gigId: {
         type: String,
         required: true,
      },

      title: {
         type: String,
         required: true,
      },

      desc: {
         type: String,
         required: false,
      },
      img: {
         type: String,
         required: false,
      },
      price: {
         type: Number,
         required: true,
      },
      sellerId: {
         type: String,
         required: true,
      },
      buyerId: {
         type: String,
         required: true,
      },
      deliveryTime: {
         type: Number,
         required: true,
      },
      isCompleted: {
         type: Boolean,
         default: false,
      },
      payment_intent: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

export default mongoose.model("orders", OrderSchema);
