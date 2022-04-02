const Beds = require("../models/Beds")

const findAllBeds = () => Beds.find()

const findBedsready = () => Beds.find({ amount: { $gt: 0 } })

const findBedsById = (id) => Beds.findById(id)

const findBedsByUserId = (user_id) => Beds.find({ user_id: user_id })

const updatedBedamount = (id, old) =>
  Beds.findByIdAndUpdate(
    id,
    {
      $set: { amount: old - 1 },
    },
    { new: true }
  )

module.exports = {
  findAllBeds,
  findBedsready,
  findBedsById,
  findBedsByUserId,
  updatedBedamount,
}
