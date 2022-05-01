const chai = require("chai")
const chaiHttp = require("chai-http")

const pool = require("../../config/database")

const { after, before, describe, it } = require("mocha")

// const server = require("../../build/main.js").default
const server = "http://159.223.45.216:6481"

chai.use(chaiHttp)
chai.should()

var user1 = {
  email: "phalat18@gmail.com",
  password: "15901590",
}

var user2 = {
  email: "prathan@gmail.com",
  password: "15901590",
}

var token1
var token2
var user2_id = 59

var bed_id1 = 51

var date = new Date()
date.setDate(date.getDate() + 1)

var bedsdealing_id

var bed_id2

describe("e2e Test ", () => {
  describe("เข้าสู่ระบบและทำการจองเตียงและออกจากระบบ แล้วผู้จองทำการเข้าพักสถานให้บริการเตียง", () => {
    it("ผู้ใช้เข้าสู่ระบบและเข้าไปทำการจองเตียง", (done) => {
      chai
        .request(server)
        .post("/users/signin")
        .send({
          email: user1.email,
          password: user1.password,
        })
        .end((err, res) => {
          token1 = res.body.token
          chai
            .request(server)
            .get("/bedsByUser")
            .set("Authorization", token1)
            .end((err, res) => {
              bed_id1 = res.body.beds[0].id
              chai
                .request(server)
                .post("/users/signin")
                .send({
                  email: user2.email,
                  password: user2.password,
                })
                .end((err, res) => {
                  token2 = res.body.token
                  chai
                    .request(server)
                    .post("/bedsdealing")
                    .set("Authorization", token2)
                    .send({
                      date: date,
                      bed_id: bed_id1,
                      user_id: user2_id,
                    })
                    .end(async (err, res) => {
                      res.body.should.have.have
                        .property("message")
                        .a("string")
                        .eql("ดำเนินการจองสำเร็จ")
                      res.body.should.have.property("status").eql(true)
                      chai
                        .request(server)
                        .get("/bedsdealingByUser")
                        .set("Authorization", token2)
                        .end((err, res) => {
                          res.body.should.have.have
                            .property("message")
                            .a("string")
                            .eql("เรียกข้อมูลสำเร็จ")
                          res.body.should.have.property("status").eql(true)
                          res.body.should.have
                            .property("bedsdealing")
                            .a("array")
                          bedsdealing_id =
                            res.body.bedsdealing[0].beddealings_id
                          done()
                        })
                    })
                })
            })
        })
    })
    it("ผู้ใช้ออกจากระบบ", (done) => {
      chai
        .request(server)
        .post("/users/logout")
        .set("Authorization", token2)
        .end(async (err, res) => {
          res.should.have.status(200)
          res.body.should.have.have
            .property("message")
            .a("string")
            .eql("ลงชื่อออกสำเร็จ")
          date.setDate(date.getDate() - 2)
          await pool.query("UPDATE bedsdealing SET date = ? WHERE id = ?", [
            date,
            bedsdealing_id,
          ])
          done()
        })
    })

    it("เจ้าของสถานที่ให้บริการกด ยืนยันผู้ใช้เข้าพักสำเร็จ", (done) => {
      chai
        .request(server)
        .put("/bedsdealing/customer/" + bedsdealing_id)
        .set("Authorization", token1)
        .end((err, res) => {
          res.body.should.have.have
            .property("message")
            .a("string")
            .eql("ยืนยันผู้ใช้เข้าพักสำเร็จ")
          res.body.should.have.property("status").eql(true)
          done()
        })
    })

    after(async () => {
      await pool.query("delete from bedsdealing order by id desc limit 1")
    })
  })
})

describe("e2e Test ", () => {
  describe("การเพิ่มสถานที่ให้บริการเตียง", () => {
    it("ผู้ให้บริการเตียงเพิ่มสถานที่ให้บริการเตียง", (done) => {
      chai
        .request(server)
        .post("/beds")
        .set("Authorization", token1)
        .send({
          amount: 200,
          address:
            " 102 ลาดพร้าว แขวง สะพานสอง เขตวังทองหลาง กรุงเทพมหานคร 10310 ประเทศไทย",
          lat: "13.7884688",
          lng: "100.608406",
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property("message").eql("เพิ่มสถานที่สำเร็จ")
          done()
        })
    })

    after(async () => {
      await pool.query("delete from beds order by id desc limit 1")
    })
  })
})
describe("e2e Test ", () => {
  describe("การเพิ่มหรือลดจำนวนเตียงของสถานที่บริการเตียง", () => {
    it("ผู้ให้บริการเตียงเพิ่มสถานที่ให้บริการเตียง", (done) => {
      chai
        .request(server)
        .put("/bed/amount/" + bed_id1)
        .set("Authorization", token1)
        .send({
          amount: 100,
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

    after(async () => {
      chai
        .request(server)
        .post("/users/logout")
        .set("Authorization", token1)
        .end(async (err, res) => {
          done()
        })
    })
  })
})
