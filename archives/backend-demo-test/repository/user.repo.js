const User = require("../models/User")

const findAllUser = () => User.find()

const findUserById = (id) => User.findById(id)

const updatedUserData = (id, body) =>
  User.findByIdAndUpdate(
    id,
    {
      $set: body,
    },
    { new: true }
  )

module.exports = {
  findAllUser,
  findUserById,
  updatedUserData,
}
