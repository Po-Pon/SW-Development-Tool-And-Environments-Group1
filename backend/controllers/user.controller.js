const config = process.env
const pool = require("../config/database")
const Joi = require("joi")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {
  updateUserPass,
  updateUserProfile,
  deleteTokens,
  selectUserByEmail,
  checkEmail,
  checkIdcard,
  addUser,
} = require("../repository/user.repo")

const changepasswordSchema = Joi.object({
  oldpassword: Joi.string().required().min(5).max(20),
  password: Joi.string().required().min(5).max(20),
  c_password: Joi.string().required().valid(Joi.ref("password")),
})

const changepassword = async (req, res) => {
  try {
    await changepasswordSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.json({ status: false, message: err.message })
  }

  const { oldpassword, password } = req.body
  const user_id = req.user.id

  try {
    const response = await updateUserPass(oldpassword, password, user_id)

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

const profileSchema = Joi.object({
  firstname: Joi.string().required().max(100),
  lastname: Joi.string().required().max(100),
  phone: Joi.string()
    .required()
    .min(10)
    .max(10)
    .pattern(/^[0-9]+$/),
  lineid: Joi.string().max(100),
})

const updateProfile = async (req, res) => {
  try {
    await profileSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.json({ status: false, message: err.message })
  }

  try {
    const { firstname, lastname, phone, lineid } = req.body
    const user_id = req.user.id
    const response = await updateUserProfile(
      firstname,
      lastname,
      phone,
      lineid,
      user_id
    )

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

const logout = async (req, res) => {
  await deleteTokens(req.user.id)
  res.json({ status: true, message: "ลงชื่อออกสำเร็จ" })
}

const getProfile = async (req, res) => {
  res.json(req.user)
}

const signinSchema = Joi.object({
  email: Joi.string().required().max(100).email(),
  password: Joi.string().required().min(5).max(20),
})

const signin = async (req, res) => {
  try {
    await signinSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.json({ status: false, message: err.message })
  }

  try {
    const { email, password } = req.body
    const response = await selectUserByEmail(email, password)

    if (response) {
      res.json({
        status: response.status,
        message: response.message,
        token: response.token,
      })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

const emailValidator = async (value, helpers) => {
  const response = await checkEmail(value)

  if (response.length > 0) {
    const message = "อีเมลนี้ถูกใช้งานแล้ว"
    throw new Joi.ValidationError(message, { message })
  }
  return value
}

const idcardValidator = async (value, helpers) => {
  const response = await checkIdcard(value)
  if (response.length > 0) {
    const message = "รหัสบัตรประชาชนถูกใช้งานแล้ว"
    throw new Joi.ValidationError(message, { message })
  }
  return value
}

const signupSchema = Joi.object({
  fname: Joi.string().required().max(100),
  lname: Joi.string().required().max(100),
  idcard: Joi.string()
    .required()
    .min(13)
    .max(13)
    .pattern(/^[0-9]+$/)
    .external(idcardValidator),
  phone: Joi.string()
    .required()
    .min(10)
    .max(10)
    .pattern(/^[0-9]+$/),
  email: Joi.string().required().max(100).email().external(emailValidator),
  lineid: Joi.string().max(100),
  password: Joi.string().required().min(5).max(20),
  c_password: Joi.string().required().valid(Joi.ref("password")),
})

const signup = async (req, res) => {
  try {
    await signupSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.json({ status: false, message: err.message })
  }

  try {
    const { fname, lname, idcard, phone, email, lineid, password } = req.body
    const password_encrypted = await bcrypt.hash(password, 5)
    const response = await addUser(
      fname,
      lname,
      idcard,
      phone,
      email,
      lineid,
      password_encrypted
    )
    if (response) {
      res.json({ status: response.status, message: response.message })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

module.exports = {
  changepassword,
  updateProfile,
  logout,
  getProfile,
  signin,
  signup,
}
