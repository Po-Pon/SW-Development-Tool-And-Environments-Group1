const config = process.env
const express = require("express")
const pool = require("../config/database")
const Joi = require("joi")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { isLoggedIn } = require("../middlewares")
const { raw } = require("express")

const {
  changepassword,
  updateProfile,
  logout,
  getProfile,
  signin,
  signup,
} = require("../controllers/user.controller")

router = express.Router()

router.get("/", async (req, res, next) => {
  res.status(200).send("Hello This is Bestbeds API")
})

router.put("/users/changepassword", isLoggedIn, changepassword)

router.put("/users/profile", isLoggedIn, updateProfile)

router.post("/users/logout", isLoggedIn, logout)

router.get("/users/me", isLoggedIn, getProfile)

router.post("/users/signin", signin)

router.post("/users/signup", signup)

exports.router = router
