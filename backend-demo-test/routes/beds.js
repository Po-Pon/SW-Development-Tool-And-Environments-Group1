const Beds = require("../models/Beds")
const User = require("../models/User")
const router = require("express").Router()
const Bedsdealing = require("../models/Bedsdealing")

const bedController = require("../controllers/beds.controller")

router.get("/bedsready", bedController.getBedready)

router.get("/beds/:id", bedController.getBedbyId)

router.get("/bedsbyusers/:id", bedController.getBedByUsersId)

module.exports = router
