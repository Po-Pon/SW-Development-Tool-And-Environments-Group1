const Bedsdealing = require("../models/Bedsdealing")
const Beds = require("../models/Beds")
const router = require("express").Router()
const User = require("../models/User")

const bedsdealingController = require("../controllers/bedsdealing.controller")

router.post("/bedsdealing", bedsdealingController.createBedsdealing)

router.get("/bedsdealing/:id", bedsdealingController.getBedsdealingById)

router.get(
  "/bedsdealingbyusers/:id",
  bedsdealingController.getBedsdealingByUsersId
)

router.get("/bedsdealing", bedsdealingController.getAllBedsdealing)

router.get(
  "/bedsdealingbybeds/:id",
  bedsdealingController.getBedsdealingByBedsId
)

module.exports = router
