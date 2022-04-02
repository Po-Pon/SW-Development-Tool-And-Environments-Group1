const { expect } = require("chai")
const mongoose = require("mongoose")
const { ObjectId } = require("mongoose").Types
const dotenv = require("dotenv")
dotenv.config()

const {
  findAllBedsdealing,
  findBedsdealingById,
  findBedsdealingByUserId,
  findBedsdealingByBedsId,
  createBedsdealing,
} = require("../../repository/bedsdealing.repo")

describe("Beds", () => {
  before(() => mongoose.connect(process.env.MONGO_URL))

  it("find all bedsdealing", () => {
    return findAllBedsdealing().then((bedsdealing) => {
      expect(bedsdealing != null).to.be.true
    })
  })

  it("find bedsdealing by id", () => {
    return findBedsdealingById("620cb960ad5614b8ae1d208f").then(
      (bedsdealing) => {
        expect(bedsdealing.bed_id).to.equal("620965c5fbc1fc3411ca57cb")
      }
    )
  })

  it("find bedsdealing by user id", () => {
    return findBedsdealingByUserId("62096385fbc1fc3411ca5784").then(
      (bedsdealing) => {
        expect(bedsdealing[0].user_id).to.equal("62096385fbc1fc3411ca5784")
      }
    )
  })

  it("find bdesdealing by bed id", () => {
    return findBedsdealingByBedsId("620965c5fbc1fc3411ca57cb").then(
      (bedsdealing) => {
        expect(bedsdealing[0].bed_id).to.equal("620965c5fbc1fc3411ca57cb")
      }
    )
  })
})
