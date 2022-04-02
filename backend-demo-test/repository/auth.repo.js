const User = require("../models/User")

const findUserByEmail = (email) => User.findOne({ email: email })

const findIdcard = (id) => User.findOne({ idcard: id })

module.exports = {
  findUserByEmail,
  findIdcard,
}
