const { expect } = require("chai")
const chai = require("chai")
const chaiHttp = require("chai-http")

const { after, before, describe, it } = require("mocha")

const server = require("../../build/main.js").default

chai.use(chaiHttp)
chai.should()

const pool = require("../../config/database")

const {
  selectBedsdealingById,
  updateBedsdealing,
  customerBedsdealing,
  bedsdealingByUserId,
  selectBedsdealingBedIdByBedId,
  insertBedsdealing,
  selectBedsdealingByBedId,
} = require("../../repository/bedsdealing.repo")

var date = new Date()

describe("Component Testing bedsdealing", () => {
  it("it can create bedsdealing", () => {
    return insertBedsdealing(date, 11, 59).then((res) => {
      expect(res.status == true).to.be.true
      expect(res.message).to.be.equal("ดำเนินการจองสำเร็จ")
    })
  })

  it("it can get bedsdealing by bed_id", () => {
    return selectBedsdealingByBedId(11).then((res) => {
      expect(res).to.be.a("array")
    })
  })

  it("it can get bedsdealing bed id by bed_id", () => {
    return selectBedsdealingBedIdByBedId(11, 59).then((res) => {
      expect(res).to.be.a("array")
    })
  })

  it("it can get bedsdealing by user id", () => {
    return bedsdealingByUserId(59).then((res) => {
      expect(res).to.be.a("object")
      expect(res.message).to.be.equal("เรียกข้อมูลสำเร็จ")
    })
  })

  it("it can get customer bedsdealing", () => {
    return customerBedsdealing(11).then((res) => {
      expect(res).to.be.a("object")
      expect(res.message).to.be.equal("เรียกข้อมูลสำเร็จ")
    })
  })

  it("it can update bedsdealing", async () => {
    let last = await pool.query("SELECT MAX(id) FROM bedsdealing")
    let last2 = Object.values(last[0])
    let last3 = Object.values(last2[0])
    return updateBedsdealing(last3[0]).then((res) => {
      expect(res).to.be.a("object")
      expect(res.message).to.be.equal("ยืนยันผู้ใช้เข้าพักสำเร็จ")
    })
  })

  it("it can get bedsdealing by id", async () => {
    let last = await pool.query("SELECT MAX(id) FROM bedsdealing")
    let last2 = Object.values(last[0])
    let last3 = Object.values(last2[0])
    return selectBedsdealingById(last3[0]).then((res) => {
      expect(res).to.be.a("object")
    })
  })

  after(async () => {
    await pool.query("delete from bedsdealing order by id desc limit 1")
  })
})
