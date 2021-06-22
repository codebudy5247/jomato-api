const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressInfo = {
  street: String,
  aptName: String,
  locality: String,
  zip: String,
  lat: Number,
  lng: Number,
  phoneNo: Number,
};

const sellerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  formattedAddress: {
    type: String,
    required: true,
  },
  imageUrl: [{
    type: String,
    required: true,
  }, ],
  Role: {
    type: String,
    enum: ["user", "admin", "seller"],
    default: "user",
  },
  avatar: {
    type: String,
    default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
  },
  address: addressInfo,
  minOrderAmount: Number,
  costForOne: Number,
  // payment: [
  //   {
  //     type: String,
  //     // enum: ["CASH", "ONLINE_PAYMENT", "UPI"],
  //     required: true,
  //   },
  // ],
  //account: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
  //items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
}, {
  timestamps: true
});

module.exports = mongoose.model("Seller", sellerSchema);