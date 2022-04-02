const chai = require("chai")
const chaiHttp = require("chai-http")

const { after, before, describe, it } = require("mocha")

const server = require("../build/main").default

chai.use(chaiHttp)
chai.should()

////// auto genate idcard
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}
var list = []

for (let i = 0; i < 12; i++) {
  list.push(getRandomIntInclusive(1, 9))
}

let num = 13
var list2 = list.map((val) => {
  result = val * num
  num--
  return result
})

var sum1 = list2.reduce((total, next) => {
  return total + next
})

var sum2 = 11 - (sum1 % 11)

var idc =
  list[0].toString() +
  list[1].toString() +
  list[2].toString() +
  list[3].toString() +
  list[4].toString() +
  list[5].toString() +
  list[6].toString() +
  list[7].toString() +
  list[8].toString() +
  list[9].toString() +
  list[10].toString() +
  list[11].toString() +
  sum2.toString()

const data = {
  email: "user" + idc + "@gmail.com",
  pass: "15901590",
  fname: "user" + idc,
  lname: "user" + idc,
  idcard: idc,
  lineid: "_user" + idc,
  phone: "0812345678",
}
//////////////////////

describe("Testing unit beds.js", () => {
  describe("GET /bedsready", () => {
    it("Get Beds should have message การค้นหาสำเร็จ!", (done) => {
      chai
        .request(server)
        .get("/bedsready")
        .end((e, res) => {
          res.should.have.status(200)
          res.body.should.have.property("message").eql("การค้นหาสำเร็จ!")
          done()
        })
    })
  })
  describe("GET /beds/(ไอดีของสถานที่ให้บริการเตียง)", () => {
    it("Get Beds should have message การค้นหาสำเร็จ!", (done) => {
      chai
        .request(server)
        .get("/beds/620bb28003658a53611258dd")
        .end((e, res) => {
          res.should.have.status(203)
          res.body.should.have.property("message").eql("การค้นหาสำเร็จ!")
          done()
        })
    })
  })
  describe("GET /bedsbyusers/(ไอดีของผู้ให้สถานที่บริการเตียง)", () => {
    it("Get Beds should have message การค้นหาสำเร็จ!", (done) => {
      chai
        .request(server)
        .get("/bedsbyusers/620b8dfc03658a53611258a4")
        .end((e, res) => {
          res.should.have.status(203)
          res.body.should.have.property("message").eql("การค้นหาสำเร็จ!")
          done()
        })
    })
  })
})

describe("Testing unit bedsdealing.js", () => {
  describe("GET /bedsdealing", () => {
    it("Get Bedsdealing should have message การค้นหาสำเร็จ!", (done) => {
      chai
        .request(server)
        .get("/bedsdealing")
        .end((e, res) => {
          res.should.have.status(200)
          res.body.should.have.property("message").eql("การค้นหาสำเร็จ!")
          done()
        })
    })
  })

  describe("GET /bedsdealingbyusers/(ไอดีของผู้ใช้)", () => {
    it("Get Bedsdealingbyusers should have message การค้นหาสำเร็จ!", (done) => {
      chai
        .request(server)
        .get("/bedsdealingbyusers/6208b3f444c7f91d395ba10e")
        .end((e, res) => {
          res.should.have.status(203)
          res.body.should.have.property("message").eql("การค้นหาสำเร็จ!")
          done()
        })
    })
  })

  describe("GET /bedsdealing/(ไอดีของประวัติการจองเตียง)", () => {
    it("Get Bedsdealing should have message การค้นหาสำเร็จ!", (done) => {
      chai
        .request(server)
        .get("/bedsdealing/620cb960ad5614b8ae1d208f")
        .end((e, res) => {
          res.should.have.status(200)
          res.body.should.have.property("message").eql("การค้นหาสำเร็จ!")
          done()
        })
    })
  })

  describe("GET /bedsdealingbybeds/(ไอดีของสถานที่ให้บริการเตียง)", () => {
    it("Get Bedsdealing by beds_id should have message การค้นหาสำเร็จ!", (done) => {
      chai
        .request(server)
        .get("/bedsdealingbybeds/620bb28003658a53611258dd")
        .end((e, res) => {
          res.should.have.status(203)
          res.body.should.have.property("message").eql("การค้นหาสำเร็จ!")
          done()
        })
    })
    it("Get Bedsdealing by undefind beds_id should have message ไม่มีข้อมูล!", (done) => {
      chai
        .request(server)
        .get("/bedsdealingbybeds/620bb28003658a53611258ddds")
        .end((e, res) => {
          res.should.have.status(203)
          res.body.should.have.property("message").eql("ไม่มีข้อมูล!")
          done()
        })
    })
  })

  describe("POST /bedsdealing", () => {
    it("Add Bedsdealing should have message จองสำเร็จ with POST", (done) => {
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

    it("Add Bedsdealing should have message ไม่สามารถจองได้ เนื่องจากเตียงเต็ม with POST", (done) => {
      chai
        .request(server)
        .post("/bedsdealing")
        .send({
          date: "2022-03-15",
          bed_id: "620965c5fbc1fc3411ca57cb",
          user_id: "6208b3f444c7f91d395ba10e",
        })
        .end((e, res) => {
          res.should.have.status(201)
          res.body.should.have
            .property("message")
            .eql("ไม่สามารถจองได้ เนื่องจากเตียงเต็ม")
          done()
        })
    })
  })
})

describe("Testing unit auth.js", () => {
  before((done) => {
    // Do something here before test
    done()
  })

  describe("POST /login", () => {
    it("Login with undefind email should have message อีเมลไม่มีอยู่ในระบบ กรุณาลองใหม่อีกครั้ง with POST", (done) => {
      chai
        .request(server)
        .post("/login")
        .send({
          email: "testsdsd@gmail.com",
          pass: "Passw0rd2",
        })
        .end((e, res) => {
          res.should.have.status(203)
          res.body.should.have
            .property("message")
            .eql("อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง")
          done()
        })
    })

    it("Login with wrong password should have message รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง with POST", (done) => {
      chai
        .request(server)
        .post("/login")
        .send({
          email: "test@gmail.com",
          pass: "Passw0rd2",
        })
        .end((e, res) => {
          res.should.have.status(203)
          res.body.should.have
            .property("message")
            .eql("อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง")
          done()
        })
    })

    it("Login should have message เข้าสู่ระบบสำเร็จ with POST", (done) => {
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
  })

  describe("POST /register", () => {
    it("Register with wrong data should have message เกิดข้อผิดพลาดกรุณาลงทะเบียนอีกครั้งภายหลัง with POST", (done) => {
      chai
        .request(server)
        .post("/register")
        .send({
          email: idc + "user@gmail.com",
          pass: "15901590",
          fname: "user2586274157192",
          lfame: "user2586274157192",
          idcard: idc,
          lineid: "_user2586274157192",
          phone: "0812345678",
        })
        .end((e, res) => {
          res.should.have.status(500)
          res.body.should.have
            .property("message")
            .eql("เกิดข้อผิดพลาดกรุณาลงทะเบียนอีกครั้งภายหลัง")
          done()
        })
    })

    it("Register should have message ลงทะเบียนสำเร็จ! with POST", (done) => {
      chai
        .request(server)
        .post("/register")
        .send(data)
        .end((e, res) => {
          res.should.have.status(201)
          res.body.should.have.property("message").eql("ลงทะเบียนสำเร็จ!")
          done()
        })
    })

    it("Register should have message อีเมลนี้มีในระบบอยู่แล้ว with POST", (done) => {
      chai
        .request(server)
        .post("/register")
        .send({
          email: "user2586274157192@gmail.com",
          pass: "15901590",
          fname: "user2586274157192",
          lname: "user2586274157192",
          idcard: "2586274157192",
          lineid: "_user2586274157192",
          phone: "0812345678",
        })
        .end((e, res) => {
          res.should.have.status(203)
          res.body.should.have.property("message").eql("อีเมลนี้เคยมีถูกใช้ซ้ำ")
          done()
        })
    })

    it("Register should have message เลขบัตรประจำตัวประชาชนมีการใช้ซ้ำ with POST", (done) => {
      chai
        .request(server)
        .post("/register")
        .send({
          email: idc + "user@gmail.com",
          pass: "15901590",
          fname: "user2586274157192",
          lname: "user2586274157192",
          idcard: "1100600428467",
          lineid: "_user2586274157192",
          phone: "0812345678",
        })
        .end((e, res) => {
          res.should.have.status(203)
          res.body.should.have
            .property("message")
            .eql("เลขบัตรประจำตัวตัวมีการใช้ซ้ำ")
          done()
        })
    })
  })

  after((done) => {
    // Do something here after test
    done()
  })
})

describe("Testing unit users.js", () => {
  describe("GET /users/(ไอดีของผู้ใช้)", () => {
    it("Get user details should have message ไอดีที่เรียกถูกต้อง", (done) => {
      chai
        .request(server)
        .get("/users/6208b3f444c7f91d395ba10e")
        .end((e, res) => {
          res.should.have.status(201)
          res.body.should.have.property("message").eql("ไอดีที่เรียกถูกต้อง")
          done()
        })
    })
    it("Get undefind user should have message เกิดข้อผิดพลาดกรุณาลงทะเบียนอีกครั้งภายหลัง", (done) => {
      chai
        .request(server)
        .get("/users/6208b3f444c7f91d395ba10edsad")
        .end((e, res) => {
          res.should.have.status(500)
          res.body.should.have
            .property("message")
            .eql("เกิดข้อผิดพลาดกรุณาลงทะเบียนอีกครั้งภายหลัง")
          done()
        })
    })
  })
  describe("PUT /users/(ไอดีของผู้ใช้)", () => {
    it("Put update user details should have message อัพเดทข้อมูลสำเร็จ", (done) => {
      chai
        .request(server)
        .put("/users/6208b3f444c7f91d395ba10e")
        .send({
          fname: "phalat",
        })
        .end((e, res) => {
          res.should.have.status(200)
          res.body.should.have.property("message").eql("อัพเดทข้อมูลสำเร็จ")
          done()
        })
    })

    it("Put update  undefind user should have message อัพเดทข้อมูลไม่สำเร็จ กรุณาลองใหม่ภายหลัง", (done) => {
      chai
        .request(server)
        .put("/users/6208b3f444c7f91d395ba10edsaddsad")
        .send({
          fname: "phalat",
        })
        .end((e, res) => {
          res.should.have.status(500)
          res.body.should.have
            .property("message")
            .eql("อัพเดทข้อมูลไม่สำเร็จ กรุณาลองใหม่ภายหลัง")
          done()
        })
    })
  })
  describe("PUT /changepass/(ไอดีของผู้ใช้)", () => {
    it("Put change user password should have message เปลี่ยนรหัสผ่านสำเร็จ", (done) => {
      chai
        .request(server)
        .put("/users/changepass/6208b3f444c7f91d395ba10e")
        .send({
          oldpass: "123456",
          pass: "123456",
        })
        .end((e, res) => {
          res.should.have.status(200)
          res.body.should.have.property("message").eql("เปลี่ยนรหัสผ่านสำเร็จ")
          done()
        })
    })
    it("Put change user but wrong password should have message รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง", (done) => {
      chai
        .request(server)
        .put("/users/changepass/6208b3f444c7f91d395ba10e")
        .send({
          oldpass: "1234567",
          pass: "123456",
        })
        .end((e, res) => {
          res.should.have.status(200)
          res.body.should.have
            .property("message")
            .eql("รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง")
          done()
        })
    })
  })
})
