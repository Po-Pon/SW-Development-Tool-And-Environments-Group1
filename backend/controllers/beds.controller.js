const pool = require("../config/database")
const Joi = require("joi")

const {
  selectBedsReady,
  selectBedsSearch,
  deleteBedById,
  updateBedsAddress,
  updateBedsAmount,
  selectBedsDetail,
  updateBedsState,
  selectBedsByUser,
  insertBed,
} = require("../repository/beds.repo")

const getBedsAvailable = async (req, res) => {
  try {
    const response = await selectBedsReady()
    if (response) {
      res.json({
        status: response.status,
        message: response.message,
        beds: response.beds,
      })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

const getBedsSearch = async (req, res) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    const search = `%${req.query.search}%`
    const response = await selectBedsSearch(search)
    if (response) {
      res.json({
        status: response.status,
        message: response.message,
        beds: response.beds,
      })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

const deleteBed = async (req, res) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    const bed_id = req.params.id
    const response = await deleteBedById(bed_id)

    if (response) {
      res.json({
        status: response.status,
        message: response.message,
      })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

const bedAddressSchema = Joi.object({
  address: Joi.string().required(),
  lat: Joi.required(),
  lng: Joi.required(),
})

const changeBedAddress = async (req, res) => {
  try {
    await bedAddressSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.json({ status: false, message: err.message })
  }

  try {
    const { address, lat, lng } = req.body
    const bed_id = req.params.id
    const response = await updateBedsAddress(address, lat, lng, bed_id)

    if (response) {
      res.json({
        status: response.status,
        message: response.message,
      })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

const bedAmountSchema = Joi.object({
  amount: Joi.number().required().min(0).max(9999),
})

const changeAmountBed = async (req, res) => {
  try {
    await bedAmountSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.json({ status: false, message: err.message })
  }

  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    const { amount } = req.body
    const bed_id = req.params.id
    const response = await updateBedsAmount(amount, bed_id)

    if (response) {
      res.json({
        status: response.status,
        message: response.message,
        bed: response.bed,
      })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

const getBedDetail = async (req, res) => {
  try {
    const bed_id = req.params.id
    const response = await selectBedsDetail(bed_id)

    if (response) {
      res.json({
        status: response.status,
        message: response.message,
        bed: response.bed,
      })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

const changeStateBed = async (req, res) => {
  try {
    let { state } = req.body
    const bed_id = req.params.id
    const response = await updateBedsState(state, bed_id)

    if (response) {
      res.json({
        status: response.status,
        message: response.message,
      })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

const getBedsByUser = async (req, res) => {
  try {
    const user_id = req.user.id
    const response = await selectBedsByUser(user_id)

    if (response) {
      res.json({
        status: response.status,
        message: response.message,
        beds: response.beds,
      })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

const bedsSchema = Joi.object({
  amount: Joi.number().required().min(1).max(9999),
  address: Joi.string().required(),
  lat: Joi.required(),
  lng: Joi.required(),
})

const addBed = async (req, res) => {
  try {
    await bedsSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.json({ status: false, message: err.message })
  }

  try {
    const { amount, address, lat, lng } = req.body
    const user_id = req.user.id
    const response = await insertBed(amount, address, lat, lng, user_id)

    if (response) {
      res.json({
        status: response.status,
        message: response.message,
      })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

module.exports = {
  getBedsAvailable,
  getBedsSearch,
  deleteBed,
  changeBedAddress,
  changeAmountBed,
  getBedDetail,
  changeStateBed,
  getBedsByUser,
  addBed,
}