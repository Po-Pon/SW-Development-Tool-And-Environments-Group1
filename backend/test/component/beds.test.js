const { expect } = require("chai")
const chai = require("chai")
const chaiHttp = require("chai-http")

const { after, before, describe, it } = require("mocha")

const server = require("../../build/main.js").default

chai.use(chaiHttp)
chai.should()

const pool = require("../../config/database")

const {
  selectBedsReady,
  selectBedsSearch,
  deleteBedById,
  updateBedsAddress,
  updateBedsAmount,
  selectBedsDetail,
  updateBedsState,
  selectBedsByUser,
  insertBed,
  selectBedById,
  selectBedAmount,
  reduceBedAmount,
} = require("../../repository/beds.repo")

const data = {
  amount: 100,
  address:
    "39/2 ถ. ลาดพร้าว แขวง สะพานสอง เขตวังทองหลาง กรุงเทพมหานคร 10310 ประเทศไทย",
  lat: "13.7884688",
  lng: "100.608406",
}

describe("Component Testing beds", () => {
  it("it can create bed", () => {
    return insertBed(data.amount, data.address, data.lat, data.lng, 4).then(
      (res) => {
        expect(res.status != null).to.be.true
      }
    )
  })

  it("it can reduce bed amount", () => {
    return reduceBedAmount(600, 11)
  })

  it("it can get bed amount", () => {
    return selectBedAmount(11).then((res) => {
      expect(res.amount).to.be.equal(599)
    })
  })

  it("it can get bed by id", () => {
    return selectBedById(11).then((res) => {
      expect(res).to.be.a("object")
    })
  })

  it("it can get beds by user", () => {
    return selectBedsByUser(3).then((res) => {
      expect(res).to.be.a("object")
      expect(res.status != null).to.be.true
      expect(res.beds).to.be.a("array")
    })
  })

  it("it can change bed state", () => {
    return updateBedsState(1, 11).then((res) => {
      expect(res).to.be.a("object")
      expect(res.status != null).to.be.true
    })
  })

  it("it can reponse bed detail", () => {
    return selectBedsDetail(11).then((res) => {
      expect(res).to.be.a("object")
      expect(res.status != null).to.be.true
      expect(res.bed != null)
    })
  })

  it("it can update bed amount", () => {
    return updateBedsAmount(600, 11).then((res) => {
      expect(res).to.be.a("object")
      expect(res.status != null).to.be.true
      expect(res.message).to.be.equal("เปลี่ยนจำนวนเตียงสำเร็จ")
    })
  })

  it("it can update bed address", () => {
    return updateBedsAddress(
      "8/1 ถ. ลาดพร้าว แขวง สะพานสอง เขตวังทองหลาง กรุงเทพมหานคร 10310 ประเทศไทย",
      "13.7884688",
      "100.608406",
      51
    ).then((res) => {
      expect(res).to.be.a("object")
      expect(res.status != null).to.be.true
      expect(res.message).to.be.equal("เปลี่ยนที่อยู่สถานที่สำเร็จ")
    })
  })

  it("it can delete bed by id", () => {
    return deleteBedById(1).then((res) => {
      expect(res).to.be.a("object")
      expect(res.status != null).to.be.true
      expect(res.message).to.be.equal("ลบข้อมูลแล้ว")
    })
  })

  it("it can search bed", () => {
    return selectBedsSearch("%สายไหม%").then((res) => {
      expect(res).to.be.a("object")
      expect(res.status != null).to.be.true
      expect(res.message).to.be.equal("ค้นหาข้อมูลสำเร็จ")
      expect(res.beds != null)
    })
  })

  it("it can response bed ready", () => {
    return selectBedsReady().then((res) => {
      expect(res).to.be.a("object")
      expect(res.status != null).to.be.true
      expect(res.message).to.be.equal("ค้นหาข้อมูลสำเร็จ")
      expect(res.beds != null)
    })
  })
})
