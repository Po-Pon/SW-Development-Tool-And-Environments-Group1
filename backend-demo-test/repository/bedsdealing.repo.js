const Bedsdealing = require("../models/Bedsdealing")

const findAllBedsdealing = () => Bedsdealing.find()

const findBedsdealingById = (id) => Bedsdealing.findById(id)

const findBedsdealingByUserId = (id) => Bedsdealing.find({ user_id: id })

const findBedsdealingByBedsId = (id) => Bedsdealing.find({ bed_id: id })

const createBedsdealing = (date, bed_id, user_id) =>
  new Bedsdealing({
    date: new Date(date),
    bed_id: bed_id,
    user_id: user_id,
  })

module.exports = {
  findAllBedsdealing,
  findBedsdealingById,
  findBedsdealingByUserId,
  findBedsdealingByBedsId,
  createBedsdealing,
}
