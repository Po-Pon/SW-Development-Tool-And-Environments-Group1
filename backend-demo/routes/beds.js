const Beds = require("../models/Beds");
const User = require("../models/User");
const router = require("express").Router();

router.get("/bedsready", async (req, res) => {
    try {
      const bedsready = await Beds.find({ amount: { $gt: 0 } });
      const user = await User.find();
      const list = [];
  
      for (let i = 0; i < bedsready.length; i++) {
        let name;
        for (let y = 0; y < user.length; y++) {
          if (bedsready[i].user_id == user[y]._id + "") {
            name = user[y];
          }
        }
        list.push({
          _id: bedsready[i]._id,
          amount: bedsready[i].amount,
          hno: bedsready[i].hno,
          no: bedsready[i].no,
          lane: bedsready[i].lane,
          district: bedsready[i].district,
          area: bedsready[i].area,
          province: bedsready[i].province,
          zipcode: bedsready[i].zipcode,
          user_id: bedsready[i].user_id,
          createdAt: bedsready[i].createdAt,
          updatedAt: bedsready[i].updatedAt,
          user: name,
        });
      }
  
      if (list.length === 0) {
        res
          .status(203)
          .json({ status: false, message: "ไม่มีเตียงที่พร้อมให้บริการ!" });
      } else {
        res
          .status(200)
          .json({ status: true, message: "การค้นหาสำเร็จ!", info: list });
      }
    } catch (err) {
      res.status(404).json({
        status: false,
        message: "ไม่มีข้อมูลหรือเกิดข้อผิดพลาดกรุณาลงทะเบียนอีกครั้งภายหลัง",
      });
    }
});

module.exports = router;