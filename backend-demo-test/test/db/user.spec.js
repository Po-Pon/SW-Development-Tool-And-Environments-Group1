const { expect } = require("chai")
const mongoose = require("mongoose")
const { ObjectId } = require("mongoose").Types
const dotenv = require("dotenv")
dotenv.config()

const {
  findAllUser,
  findUserById,
  updatedUserData,
} = require("../../repository/user.repo")

describe("Users", () => {
  before(() => mongoose.connect(process.env.MONGO_URL))

  it("find all user", () => {
    return findAllUser().then((user) => {
      expect(user != null).to.true
    })
  })

  it("find user", () => {
    return findUserById("6208b3f444c7f91d395ba10e").then((user) => {
      expect(user.email).to.equal("phalat18@gmail.com")
    })
  })

  it("updated user data", () => {
    return updatedUserData("6208b3f444c7f91d395ba10e", {
      fname: "phalat",
    }).then((user) => {
      expect(user.fname).to.equal("phalat")
    })
  })
})
