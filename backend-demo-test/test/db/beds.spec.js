const { expect } = require("chai")
const mongoose = require("mongoose")
const { ObjectId } = require("mongoose").Types
const dotenv = require("dotenv")
dotenv.config()

const {
  findAllBeds,
  findBedsready,
  findBedsById,
  findBedsByUserId,
  updatedBedamount,
} = require("../../repository/beds.repo")

describe("Beds", () => {
  before(() => mongoose.connect(process.env.MONGO_URL))

  it("find all beds", () => {
    return findAllBeds().then((beds) => {
      expect(beds != null).to.be.true
    })
  })

  it("find bedsready", () => {
    return findBedsready().then((beds) => {
      expect(beds[0].amount > 0).to.be.true
    })
  })

  it("find beds", () => {
    return findBedsById("620930a64d6edd7989adea36").then((bed) => {
      expect(bed.province).to.equal("สมุทรปราการ")
    })
  })

  it("find bed by user id", () => {
    return findBedsByUserId("620b8dfc03658a53611258a4").then((bed) => {
      expect(bed[0].province).to.equal("กรุงเทพฯ")
    })
  })

  it("updated user data", () => {
    return updatedBedamount("620bb28003658a53611258dd", 83).then((bed) => {
      expect(bed.amount).to.equal(82)
    })
  })
})
