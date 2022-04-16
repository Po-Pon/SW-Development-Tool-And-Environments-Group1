const chai = require("chai")
const chaiHttp = require("chai-http")

const { after, before, describe, it } = require("mocha")

const server = require("../../build/main").default

chai.use(chaiHttp)
chai.should()

describe("เข้าสู่ระบบ ค้นหาเตียงและจองเตียง", () => {
  it("login เข้าสู่ระบบสำเร็จ", (done) => {
    chai
      .request(server)
      .post("/login")
      .send({
        email: "test@gmail.com",
        pass: "Passw0rd",
      })
      .end((e, res) => {
        res.should.have.status(200)
        res.body.should.have.property("message").eql("เข้าสู่ระบบสำเร็จ")
        done()
      })
  })

  it("ค้นหาเตียง", (done) => {
    chai
      .request(server)
      .get("/bedsready")
      .end((e, res) => {
        res.should.have.status(200)
        res.body.should.have.property("message").eql("การค้นหาสำเร็จ!")
        done()
      })
  })

  it("จองเตียง", (done) => {
    chai
      .request(server)
      .post("/bedsdealing")
      .send({
        date: "2022-03-15",
        bed_id: "620bb28003658a53611258dd",
        user_id: "6208b3f444c7f91d395ba10e",
      })
      .end((e, res) => {
        res.should.have.status(201)
        res.body.should.have.property("message").eql("จองสำเร็จ")
        done()
      })
  })
})
