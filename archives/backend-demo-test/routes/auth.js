const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

const authController = require("../controllers/auth.controller")

// REGISTER
router.post("/register", authController.userRegister)

router.post("/login", authController.userLogin)

module.exports = router
