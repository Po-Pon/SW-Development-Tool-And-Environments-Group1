const chai = require("chai")
const chaiHttp = require("chai-http")

const { after, before, describe, it } = require("mocha")

const server = require("../../build/main.js").default

chai.use(chaiHttp)
chai.should()

const pool = require("../../config/database")

////// auto genate idcard
function randomid() {
  var id12 = ""
  for (var i = 0; i < 12; i++) {
    id12 += parseInt(Math.random() * 10)
  }
  return (num = id12 + finddigit(id12))
}
function finddigit(id) {
  var base = 100000000000 //สร้างตัวแปร เพื่อสำหรับให้หารเพื่อเอาหลักที่ต้องการ
  var basenow //สร้างตัวแปรเพื่อเก็บค่าประจำหลัก
  var sum = 0 //สร้างตัวแปรเริ่มตัวผลบวกให้เท่ากับ 0
  for (var i = 13; i > 1; i--) {
    //วนรอบตั้งแต่ 13 ลงมาจนถึง 2
    basenow = Math.floor(id / base) //หาค่าประจำตำแหน่งนั้น ๆ
    id = id - basenow * base //ลดค่า id ลงทีละหลัก
    sum += basenow * i //บวกค่า sum ไปเรื่อย ๆ ทีละหลัก
    base = base / 10 //ตัดค่าที่ใช้สำหรับการหาเลขแต่ละหลัก
  }
  var checkbit = (11 - (sum % 11)) % 10 //คำนวณค่า checkbit
  return checkbit
}

const idd = randomid()

const data = {
  email: idd + "@gmail.com",
  password: "15901590",
  c_password: "15901590",
  fname: "user" + idd,
  lname: "user" + idd,
  idcard: idd,
  lineid: "_user" + idd,
  phone: "0812345678",
}
//////////////////////

var token
var user_id
var user_token

describe("Unit Testing user", () => {
  before(() => {
    chai
      .request(server)
      .post("/users/signin")
      .send({
        email: "phalat18@gmail.com",
        password: "15901590",
      })
      .end((err, res) => {
        token = res.body.token
      })
  })

  describe("/GET /", () => {
    it("it should have message response", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })

  describe("/POST /users/signup", () => {
    it("it should have message response", (done) => {
      chai
        .request(server)
        .post("/users/signup")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.eql({ status: true, message: "ลงทะเบียนสำเร็จ" })
          done()
        })
    })

    it("it should have status false and message response if email reuse", (done) => {
      chai
        .request(server)
        .post("/users/signup")
        .send({
          fname: "พลัฏฐ์",
          lname: "วงศ์สิทธิพรรุ่ง",
          idcard: idd.substring(0, 11) + "95",
          phone: "0812345678",
          email: "phalat18@gmail.com",
          password: "15901590",
          c_password: "15901590",
          lineid: "_po_pon",
        })
        .end((err, res) => {
          res.body.should.eql({
            status: false,
            message: "อีเมลนี้ถูกใช้งานแล้ว (email)",
          })
          done()
        })
    })

    it("it should have status false and message response if idcard reuse", (done) => {
      chai
        .request(server)
        .post("/users/signup")
        .send(data)
        .end((err, res) => {
          res.body.should.eql({
            status: false,
            message: "รหัสบัตรประชาชนถูกใช้งานแล้ว (idcard)",
          })
          done()
        })
    })
  })

  describe("/POST /users/signin", () => {
    ;+it("it should have message response with token", (done) => {
      chai
        .request(server)
        .post("/users/signin")
        .send({
          email: "phalat18@gmail.com",
          password: data.password,
        })
        .end((err, res) => {
          res.body.should.have.have
            .property("message")
            .a("string")
            .eql("ลงชื่อเข้าใช้งานสำเร็จ")
          res.body.should.have.property("token")
          done()
        })
    })

    it("it should have status false and message response if email not have in database", (done) => {
      chai
        .request(server)
        .post("/users/signin")
        .send({
          email: "ponpon333@gmail.com",
          password: data.password,
        })
        .end((err, res) => {
          res.body.should.have.property("status").eql(false)
          res.body.should.have
            .property("message")
            .a("string")
            .eql("ไม่มีอีเมลนี้ในระบบ")
          done()
        })
    })

    it("it should have status false and message response if password incorrect", (done) => {
      chai
        .request(server)
        .post("/users/signin")
        .send({
          email: data.email,
          password: "159015999",
        })
        .end((err, res) => {
          res.body.should.have.property("status").eql(false)
          res.body.should.have
            .property("message")
            .a("string")
            .eql("รหัสผ่านผิด")
          done()
        })
    })

    it("it should have status false and error message response if email incorrect format", (done) => {
      chai
        .request(server)
        .post("/users/signin")
        .send({
          email: "ponponddsdasd",
          password: data.password,
        })
        .end((err, res) => {
          res.body.should.have.property("status").eql(false)
          res.body.should.have.property("message").a("string")
          done()
        })
    })
  })

  describe("/PUT /users/changepassword", () => {
    it("it should have status false and error message response if password incorrect format", (done) => {
      chai
        .request(server)
        .put("/users/changepassword")
        .set("Authorization", token)
        .send({
          oldpassword: "1",
          password: "15901590",
          c_password: "15901590",
        })
        .end((err, res) => {
          res.body.should.have.property("status").eql(false)
          res.body.should.have.have.property("message").a("string")
          done()
        })
    })

    it("it should have message response", (done) => {
      chai
        .request(server)
        .put("/users/changepassword")
        .set("Authorization", token)
        .send({
          oldpassword: "15901590",
          password: "15901590",
          c_password: "15901590",
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.have
            .property("message")
            .a("string")
            .eql("เปลี่ยนรหัสผ่านสำเร็จ")
          done()
        })
    })
  })

  describe("/PUT /users/changeprofile", () => {
    it("it should have message response", (done) => {
      chai
        .request(server)
        .put("/users/profile")
        .set("Authorization", token)
        .send({
          firstname: "พลัฏฐ์",
          lastname: "วงศ์สิทธิพรรุ่ง",
          phone: "0953901155",
          lineid: "_pon_pon",
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.have
            .property("message")
            .a("string")
            .eql("อัปเดตบัญชีสำเร็จ")
          done()
        })
    })

    it("it should have status false and error message response if profile incorrect format", (done) => {
      chai
        .request(server)
        .put("/users/profile")
        .set("Authorization", token)
        .send({
          firstname: "phalat",
          lastname: "wong",
          phone: "09539011550",
          lineid: "_pon_pon",
        })
        .end((err, res) => {
          res.body.should.have.property("status").eql(false)
          res.body.should.have.have.property("message").a("string")
          done()
        })
    })
  })

  describe("/GET /users/me", () => {
    it("it should have message response", (done) => {
      chai
        .request(server)
        .get("/users/me")
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.have.a("object")
          done()
        })
    })
  })

  describe("/POST /users/logout", () => {
    it("it should have message response", (done) => {
      chai
        .request(server)
        .post("/users/logout")
        .set("Authorization", token)
        .end(async (err, res) => {
          res.should.have.status(200)
          res.body.should.have.have
            .property("message")
            .a("string")
            .eql("ลงชื่อออกสำเร็จ")
          done()
        })
    })
  })

  after(async () => {
    await pool.query("delete from users order by id desc limit 1")
  })
})
