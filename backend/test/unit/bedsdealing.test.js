const chai = require("chai")
const chaiHttp = require("chai-http")

const pool = require("../../config/database")

const { after, before, describe, it } = require("mocha")

const server = require("../../build/main.js").default

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
var user2_id

var bed_id1 = 51

var date = new Date()
date.setDate(date.getDate() + 1)

var bedsdealing_id

describe("Unit Test bedsdealing ", () => {
  describe("/POST /bedsdealing", () => {
    it("it can't booking bed when amount bed not enough", (done) => {
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
            })
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
                .get("/users/me")
                .set("Authorization", token2)
                .end((err, res) => {
                  user2_id = res.body.id
                  chai
                    .request(server)
                    .put("/bed/amount/" + 51)
                    .set("Authorization", token1)
                    .send({
                      amount: 0,
                    })
                    .end((err, res) => {
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
                            .eql("ขออภัย ขณะนี้ไม่เหลือเตียงให้จอง")
                          res.body.should.have.property("status").eql(false)
                          done()
                        })
                    })
                })
            })
        })
    })

    it("it can booking bed", (done) => {
      chai
        .request(server)
        .put("/bed/amount/" + bed_id1)
        .set("Authorization", token1)
        .send({
          amount: 100,
        })
        .end((err, res) => {
          chai
            .request(server)
            .post("/bedsdealing")
            .set("Authorization", token2)
            .send({
              date: date,
              bed_id: bed_id1,
              user_id: user2_id,
            })
            .end((err, res) => {
              res.body.should.have.have
                .property("message")
                .a("string")
                .eql("ดำเนินการจองสำเร็จ")
              res.body.should.have.property("status").eql(true)
              done()
            })
        })
    })

    it("it can't booking bed when booking again", (done) => {
      chai
        .request(server)
        .post("/bedsdealing")
        .set("Authorization", token2)
        .send({
          date: date,
          bed_id: bed_id1,
          user_id: user2_id,
        })
        .end((err, res) => {
          res.body.should.have.have
            .property("message")
            .a("string")
            .eql("ไม่ให้จองซ้ำ คุณจองสถานที่นี้ไปแล้ว")
          res.body.should.have.property("status").eql(false)
          done()
        })
    })

    it("it can't booking bed when bed undefined", (done) => {
      chai
        .request(server)
        .post("/bedsdealing")
        .set("Authorization", token2)
        .send({
          date: date,
          bed_id: bed_id1 + 100000000,
          user_id: user2_id,
        })
        .end((err, res) => {
          res.body.should.have.have
            .property("message")
            .a("string")
            .eql("ไม่พบเตียง โปรดลองอีกครั้งในภายหลัง")
          res.body.should.have.property("status").eql(false)
          done()
        })
    })
  })

  describe("/GET /bedsdealingByUser", () => {
    it("it can get bedsdealings", (done) => {
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
          res.body.should.have.property("bedsdealing").a("array")
          bedsdealing_id = res.body.bedsdealing[0].beddealings_id
          done()
        })
    })
  })

  describe("/GET /bedsdealing/customer/:id", () => {
    it("it can get status bedsdealings", (done) => {
      chai
        .request(server)
        .get("/bedsdealing/customer/" + bed_id1)
        .set("Authorization", token2)
        .end(async (err, res) => {
          res.body.should.have.have
            .property("message")
            .a("string")
            .eql("เรียกข้อมูลสำเร็จ")
          res.body.should.have.property("status").eql(true)
          date.setDate(date.getDate() - 2)
          await pool.query("UPDATE bedsdealing SET date = ? WHERE id = ?", [
            date,
            bedsdealing_id,
          ])
          done()
        })
    })
  })

  describe("/PUT /bedsdealing/customer/:id", () => {
    it("it can change status bedsdealings", (done) => {
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
  })

  after(async () => {
    await pool.query("DELETE FROM bedsdealing WHERE id = ?", [bedsdealing_id])
  })
})
