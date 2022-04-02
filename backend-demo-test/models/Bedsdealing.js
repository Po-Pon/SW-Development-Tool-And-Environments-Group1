const mongoose = require("mongoose")

const BedsdealingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  bed_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("Bedsdealing", BedsdealingSchema)
