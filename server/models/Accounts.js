const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    name: {
        type: String,
      },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    Role: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
      },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
