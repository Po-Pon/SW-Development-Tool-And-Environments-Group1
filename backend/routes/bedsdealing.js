const config = process.env
const express = require("express")
const pool = require("../config/database")
const Joi = require("joi")
const { isLoggedIn } = require("../middlewares")
const moment = require("moment")

const {
  changeBedsdealingState,
  getBedsdealingState,
  getBedsdealingByUser,
  addBedsdealing,
} = require("../controllers/bedsdealing.controller")

router = express.Router()

router.put("/bedsdealing/customer/:id", isLoggedIn, changeBedsdealingState)

router.get("/bedsdealing/customer/:id", isLoggedIn, getBedsdealingState)

router.get("/bedsdealingByUser", isLoggedIn, getBedsdealingByUser)

router.post("/bedsdealing", isLoggedIn, addBedsdealing)

exports.router = router
