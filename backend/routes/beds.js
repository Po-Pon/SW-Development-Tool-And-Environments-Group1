const config = process.env
const express = require("express")
const pool = require("../config/database")
const Joi = require("joi")
const { isLoggedIn } = require("../middlewares")

const {
  getBedsAvailable,
  getBedsSearch,
  deleteBed,
  changeBedAddress,
  changeAmountBed,
  getBedDetail,
  changeStateBed,
  getBedsByUser,
  addBed,
} = require("../controllers/beds.controller")

router = express.Router()

router.get("/beds/available", getBedsAvailable)

router.get("/beds/search", getBedsSearch)

router.delete("/bed/:id", isLoggedIn, deleteBed)

router.put("/bed/address/:id", isLoggedIn, changeBedAddress)

router.put("/bed/amount/:id", isLoggedIn, changeAmountBed)

router.get("/bed/:id", isLoggedIn, getBedDetail)

router.put("/bed/state/:id", isLoggedIn, changeStateBed)

router.get("/bedsByUser", isLoggedIn, getBedsByUser)

router.post("/beds", isLoggedIn, addBed)

exports.router = router