const mongoose = require("mongoose");
const schema = mongoose.Schema;
const user = new schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    otp: {
      type: Number,
    },
    otpExpire: {
      type: Date,
      default: Date.now(),
      get: (otpExpire) => otpExpire.getTime(),
      set: (otpExpire) => new Date(otpExpire),
    },
    stateId: {
      type: Number,
      enum: [0, 1], // 0 => ACTIVE, 1 => INACTIVE
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", user);
