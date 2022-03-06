const chai = require("chai");
const chaiHttp = require("chai-http");
const {
  walletApiClient,
} = require("chia-dashboard-satellite/lib/service/stats-collection");
const { after, before, describe, it } = require("mocha");

const server = require("../build/main").default;

chai.use(chaiHttp);
chai.should();

////// auto genate idcard 
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
var list = [];

for (let i = 0; i < 12; i++) {
  list.push(getRandomIntInclusive(1, 9));
}

let num = 13;
var list2 = list.map((val) => {
  result = val * num;
  num--;
  return result;
});

var sum1 = list2.reduce((total, next) => {
  return total + next;
});

var sum2 = 11 - (sum1 % 11);

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
  sum2.toString();

const data = {
  email: "user" + idc + "@gmail.com",
  pass: "15901590",
  fname: "user" + idc,
  lname: "user" + idc,
  idcard: idc,
  lineid: "_user" + idc,
  phone: "0812345678",
};
//////////////////////

describe("Testing unit beds.js", () => {
  describe("GET /bedsready", () => {
    it("Get Beds should have message การค้นหาสำเร็จ!", (done) => {
      chai
        .request(server)
        .get("/bedsready")
        .end((e, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("การค้นหาสำเร็จ!");
          done();
        });
    });
  });
  describe("GET /beds/(ไอดีของสถานที่ให้บริการเตียง)", () => {
    it("Get Beds should have message การค้นหาสำเร็จ!", (done) => {
      chai
        .request(server)
        .get("/beds/620bb28003658a53611258dd")
        .end((e, res) => {
          res.should.have.status(203);
          res.body.should.have.property("message").eql("การค้นหาสำเร็จ!");
          done();
        });
    });
  });
  describe("GET /bedsbyusers/(ไอดีของผู้ให้สถานที่บริการเตียง)", () => {
    it("Get Beds should have message การค้นหาสำเร็จ!", (done) => {
      chai
        .request(server)
        .get("/bedsbyusers/620b8dfc03658a53611258a4")
        .end((e, res) => {
          res.should.have.status(203);
          res.body.should.have.property("message").eql("การค้นหาสำเร็จ!");
          done();
        });
    });
  });
});

describe("Testing unit bedsdealing.js", () => {
    describe("GET /bedsdealing", () => {
      it("Get Bedsdealing should have message การค้นหาสำเร็จ!", (done) => {
        chai
          .request(server)
          .get("/bedsdealing")
          .end((e, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("การค้นหาสำเร็จ!");
            done();
          });
      });
    });
  
    describe("GET /bedsdealingbyusers/(ไอดีของผู้ใช้)", () => {
      it("Get Bedsdealingbyusers should have message การค้นหาสำเร็จ!", (done) => {
        chai
          .request(server)
          .get("/bedsdealingbyusers/6208b3f444c7f91d395ba10e")
          .end((e, res) => {
            res.should.have.status(203);
            res.body.should.have.property("message").eql("การค้นหาสำเร็จ!");
            done();
          });
      });
    });
  
    describe("GET /bedsdealing/(ไอดีของประวัติการจองเตียง)", () => {
      it("Get Bedsdealing should have message การค้นหาสำเร็จ!", (done) => {
        chai
          .request(server)
          .get("/bedsdealing/620cb960ad5614b8ae1d208f")
          .end((e, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("การค้นหาสำเร็จ!");
            done();
          });
      });
    });
  
    describe("GET /bedsdealingbybeds/(ไอดีของสถานที่ให้บริการเตียง)", () => {
      it("Get Bedsdealing by beds_id should have message การค้นหาสำเร็จ!", (done) => {
        chai
          .request(server)
          .get("/bedsdealingbybeds/620bb28003658a53611258dd")
          .end((e, res) => {
            res.should.have.status(203);
            res.body.should.have.property("message").eql("การค้นหาสำเร็จ!");
            done();
          });
      });
      it("Get Bedsdealing by undefind beds_id should have message ไม่มีข้อมูล!", (done) => {
        chai
          .request(server)
          .get("/bedsdealingbybeds/620bb28003658a53611258ddds")
          .end((e, res) => {
            res.should.have.status(203);
            res.body.should.have.property("message").eql("ไม่มีข้อมูล!");
            done();
          });
      });
    });
  
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
            res.should.have.status(201);
            res.body.should.have.property("message").eql("จองสำเร็จ");
            done();
          });
      });
  
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
            res.should.have.status(201);
            res.body.should.have
              .property("message")
              .eql("ไม่สามารถจองได้ เนื่องจากเตียงเต็ม");
            done();
          });
      });
    });
});