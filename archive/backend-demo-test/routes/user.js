const User = require("../models/User")
const router = require("express").Router()

const userController = require("../controllers/user.controller")

router.get("/:id", userController.getUser)

router.put("/:id", userController.updatedUser)

router.put("/changepass/:id", userController.changePass)

module.exports = router
