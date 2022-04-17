const chai = require("chai")
const chaiHttp = require("chai-http")

const { after, before, describe, it } = require("mocha")

const server = require("../../build/main.js").default

chai.use(chaiHttp)
chai.should()

var token
var bed_id

describe("Unit Testing beds", () => {
  before(() => {
    chai
      .request(server)
      .post("/users/signin")
      .send({
        email: "prathan@gmail.com",
        password: "15901590",
      })
      .end((err, res) => {
        token = res.body.token
      })
  })

  describe("/GET /beds/available", () => {
    it("it should have beds available response", (done) => {
      chai
        .request(server)
        .get("/beds/available")
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property("beds").a("array")
          done()
        })
    })
  })

  describe("/GET /beds/search", () => {
    it("it should have beds searched response", (done) => {
      chai
        .request(server)
        .get("/beds/search")
        .query({ search: "สายไหม" })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property("beds").a("array")
          done()
        })
    })
  })

  describe("/POST /beds", () => {
    it("it should have created beds", (done) => {
      chai
        .request(server)
        .post("/beds")
        .set("Authorization", token)
        .send({
          amount: 200,
          address:
            "ลาดพร้าว แขวง สะพานสอง เขตวังทองหลาง กรุงเทพมหานคร 10310 ประเทศไทย",
          lat: "13.7884688",
          lng: "100.608406",
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property("message").eql("เพิ่มสถานที่สำเร็จ")
          done()
        })
    })

    it("it should have status false and message response when address defined", (done) => {
      chai
        .request(server)
        .post("/beds")
        .set("Authorization", token)
        .send({
          amount: 200,
          lat: "13.7884688",
          lng: "100.608406",
        })
        .end((err, res) => {
          res.body.should.have.property("status").eql(false)
          res.body.should.have.have
            .property("message")
            .a("string")
            .eql('"address" is required')
          done()
        })
    })
  })

  describe("/GET /bedsByUser", () => {
    it("it should have beds response and status true", (done) => {
      chai
        .request(server)
        .get("/bedsByUser")
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property("status").eql(true)
          res.body.should.have.property("message").eql("เรียกข้อมูลสำเร็จ")
          res.body.should.have.property("beds").a("array")
          bed_id = res.body.beds[0].id
          done()
        })
    })
  })

  describe("/PUT /bed/state/:id", () => {
    it("it can changed bed status and have message response and status true", (done) => {
      chai
        .request(server)
        .put("/bed/state/" + bed_id)
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property("status").eql(true)
          res.body.should.have
            .property("message")
            .eql("เปลี่ยนสถานะเตียงสำเร็จ")
          done()
        })
    })
  })

  describe("/GET /bed/:id", () => {
    it("it can get bed detail", (done) => {
      chai
        .request(server)
        .get("/bed/" + bed_id)
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property("status").eql(true)
          res.body.should.have.property("message").eql("เรียกข้อมูลสำเร็จ")
          res.body.should.have.property("bed").a("object")
          done()
        })
    })
  })

  describe("/PUT /bed/amount/:id", () => {
    it("it can get bed detail", (done) => {
      chai
        .request(server)
        .put("/bed/amount/" + bed_id)
        .set("Authorization", token)
        .send({
          amount: 599,
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property("status").eql(true)
          res.body.should.have
            .property("message")
            .eql("เปลี่ยนจำนวนเตียงสำเร็จ")
          done()
        })
    })
  })

  describe("/PUT /bed/address/:id", () => {
    it("it can change bed address", (done) => {
      chai
        .request(server)
        .put("/bed/address/" + bed_id)
        .set("Authorization", token)
        .send({
          address:
            "39/2 ถ. ลาดพร้าว แขวง สะพานสอง เขตวังทองหลาง กรุงเทพมหานคร 10310 ประเทศไทย",
          lat: "13.7884688",
          lng: "100.608406",
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property("status").eql(true)
          res.body.should.have
            .property("message")
            .eql("เปลี่ยนที่อยู่สถานที่สำเร็จ")
          done()
        })
    })

    it("it can't change bed address when address not a string", (done) => {
      chai
        .request(server)
        .put("/bed/address/" + bed_id)
        .set("Authorization", token)
        .send({
          address: 100,
          lat: "13.7884688",
          lng: "100.608406",
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property("status").eql(false)
          res.body.should.have.property("message").a("string")
          done()
        })
    })
  })

  describe("/DELETE /bed/:id", () => {
    it("it can get bed detail", (done) => {
      chai
        .request(server)
        .delete("/bed/" + bed_id)
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property("status").eql(true)
          res.body.should.have.property("message").eql("ลบข้อมูลแล้ว")
          done()
        })
    })
  })
})
