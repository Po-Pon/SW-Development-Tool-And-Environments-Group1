const pool = require("../config/database")
const Joi = require("joi")
const moment = require("moment")

const {
  selectBedsdealingById,
  updateBedsdealing,
  customerBedsdealing,
  bedsdealingByUserId,
  selectBedsdealingBedIdByBedId,
  insertBedsdealing,
} = require("../repository/bedsdealing.repo")

const {
  selectBedById,
  selectBedAmount,
  reduceBedAmount,
} = require("../repository/beds.repo")

const changeBedsdealingState = async (req, res) => {
  try {
    const bedsdealing_id = req.params.id
    const bedsdealing = await selectBedsdealingById(bedsdealing_id)
    let availableDate
    if (
      moment(new Date()).format("YYYY-MM-DD") >=
      moment(bedsdealing.date).format("YYYY-MM-DD")
    ) {
      availableDate = false
    } else {
      availableDate = true
    }
    if (!bedsdealing) {
      return res.json({
        status: false,
        message: "ไม่พบข้อมูล โปรดลองอีกครั้งในภายหลัง",
      })
    } else if (availableDate) {
      return res.json({
        status: false,
        message: "ยังไม่ถึงวันเข้าพัก",
      })
    } else {
      const response = await updateBedsdealing(bedsdealing_id)

      if (response) {
        res.json({
          status: response.status,
          message: response.message,
        })
      } else {
        res.status(400).json(response.message)
      }
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

const getBedsdealingState = async (req, res) => {
  try {
    const bed_id = req.params.id
    const bed = await selectBedById(bed_id)

    const response = await customerBedsdealing(bed_id)

    if (response) {
      res.json({
        status: response.status,
        message: response.message,
        bed: bed,
        customers: response.customers,
      })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

const getBedsdealingByUser = async (req, res) => {
  try {
    const user_id = req.user.id
    const response = await bedsdealingByUserId(user_id)

    if (response) {
      res.json({
        status: response.status,
        message: response.message,
        bedsdealing: response.bedsdealing,
      })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

const bedsdealingSchema = Joi.object({
  date: Joi.date().required().greater("now"),
  bed_id: Joi.number().required(),
  user_id: Joi.number().required(),
})

const addBedsdealing = async (req, res) => {
  try {
    await bedsdealingSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.json({ status: false, message: err.message })
  }

  try {
    const { date, bed_id } = req.body
    const user_id = req.user.id
    const bed = await selectBedAmount(bed_id)

    const bedsdealing = await selectBedsdealingBedIdByBedId(bed_id, user_id)

    if (!bed) {
      return res.json({
        status: false,
        message: "ไม่พบเตียง โปรดลองอีกครั้งในภายหลัง",
      })
    } else if (!bed.amount > 0) {
      return res.json({
        status: false,
        message: "ขออภัย ขณะนี้ไม่เหลือเตียงให้จอง",
      })
    } else if (!bed.state) {
      res.json({ status: false, message: "ขณะนี้ เตียงปิดการจองแล้ว" })
    } else if (bedsdealing.length > 0) {
      return res.json({
        status: false,
        message: "ไม่ให้จองซ้ำ คุณจองสถานที่นี้ไปแล้ว",
      })
    } else {
      await reduceBedAmount(bed.amount, bed.id)

      const response = await insertBedsdealing(date, bed_id, user_id)

      if (response) {
        res.json({
          status: response.status,
          message: response.message,
        })
      } else {
        res.status(400).json(response.message)
      }
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

module.exports = {
  changeBedsdealingState,
  getBedsdealingState,
  getBedsdealingByUser,
  addBedsdealing,
}
