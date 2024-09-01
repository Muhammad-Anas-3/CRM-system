import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer Name is required"],
    },
    email: {
      type: String,
      required: [true, "Customer Email is required"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Customer address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);
