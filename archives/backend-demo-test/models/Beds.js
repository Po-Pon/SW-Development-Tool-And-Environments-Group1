const mongoose = require("mongoose")

const BedsSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      min: 1,
      max: 9999,
      required: true,
    },
    hno: {
      type: String,
      max: 30,
      required: true,
    },
    no: {
      type: String,
      max: 30,
      required: true,
    },
    lane: {
      type: String,
      max: 50,
      required: true,
    },
    district: {
      type: String,
      max: 50,
      required: true,
    },
    area: {
      type: String,
      max: 50,
      required: true,
    },
    province: {
      type: String,
      max: 50,
      required: true,
    },
    zipcode: {
      type: String,
      max: 5,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Beds", BedsSchema)
