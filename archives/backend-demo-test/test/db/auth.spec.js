const { expect } = require("chai")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const { findUserByEmail, findIdcard } = require("../../repository/auth.repo")

describe("Auth", () => {
  before(() => mongoose.connect(process.env.MONGO_URL))

  it("find user by email", () => {
    return findUserByEmail("phalat18@gmail.com").then((user) => {
      expect(user.email).to.equal("phalat18@gmail.com")
    })
  })

  it("find id card", () => {
    return findIdcard("1100600428467").then((user) => {
      expect(user.idcard).to.equal("1100600428467")
    })
  })
})
