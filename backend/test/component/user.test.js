const { expect } = require("chai")
const chai = require("chai")
const chaiHttp = require("chai-http")

const { after, before, describe, it } = require("mocha")

const server = require("../../build/main.js").default

chai.use(chaiHttp)
chai.should()

const pool = require("../../config/database")

const {
  updateUserPass,
  updateUserProfile,
  deleteTokens,
  selectUserByEmail,
  checkEmail,
  checkIdcard,
  addUser,
} = require("../../repository/user.repo")

const data = {
  email: "ponpon@gmail.com",
  password: "15901590",
  c_password: "15901590",
  fname: "user",
  lname: "user",
  idcard: "1234567899998",
  lineid: "_user",
  phone: "0812345678",
}

describe("Component Testing user", () => {
  it("it should have return message response", () => {
    return addUser(
      data.fname,
      data.lname,
      data.idcard,
      data.phone,
      data.email,
      data.lineid,
      data.c_password
    ).then((res) => {
      expect(res.status != null).to.be.true
    })
  })

  it("it should have return idcard have in database", () => {
    return checkIdcard("1234567891235").then((res) => {
      expect(res).to.be.a("array")
    })
  })

  it("it should have return email have in database", () => {
    return checkEmail("phalat18@gmail.com").then((res) => {
      expect(res).to.be.a("array")
    })
  })

  it("it should have return user by email", () => {
    return selectUserByEmail("phalat18@gmail.com", "15901590").then((res) => {
      expect(res.status != null).to.be.true
    })
  })

  it("it can delete token", () => {
    return deleteTokens(7).then((res) => {})
  })

  it("it can update profile", () => {
    return updateUserProfile(
      "พลัฏฐ์",
      "วงศ์สิทธิพรรุ่ง",
      "0953901155",
      "_po_pon",
      7
    ).then((res) => {
      expect(res.status != null).to.be.true
    })
  })

  it("it can change password", () => {
    return updateUserPass("15901590", "15901590", 7).then((res) => {
      expect(res.status != null).to.be.true
    })
  })

  after(async () => {
    await pool.query("delete from users order by id desc limit 1")
  })
})
