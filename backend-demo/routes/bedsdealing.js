const Bedsdealing = require("../models/Bedsdealing");
const Beds = require("../models/Beds");
const router = require("express").Router();
const User = require("../models/User");

router.post("/bedsdealing", async (req, res) => {
  try {
    const newdealing = await new Bedsdealing({
      date: new Date(req.body.date),
      bed_id: req.body.bed_id,
      user_id: req.body.user_id,
    });

    const oldBeds = await Beds.findById(req.body.bed_id);

    if (oldBeds.amount === 0) {
      res
        .status(201)
        .json({ status: false, message: "ไม่สามารถจองได้ เนื่องจากเตียงเต็ม" });
    } else {
      const update_Beds = await Beds.findByIdAndUpdate(
        req.body.bed_id,
        {
          $set: { amount: oldBeds.amount - 1 },
        },
        { new: true }
      );

      if (oldBeds.amount === 0) {
        res.status(201).json({
          status: false,
          message: "ไม่สามารถจองได้ เนื่องจากเตียงหมด",
        });
      } else {
        const update_Beds = await Beds.findByIdAndUpdate(
          req.body.bed_id,
          {
            $set: { amount: oldBeds.amount - 1 },
          },
          { new: true }
        );

        const New_dealing = await newdealing.save();
        res.status(201).json({ status: true, message: "จองสำเร็จ" });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "เกิดข้อผิดพลาดกรุณาลงทะเบียนอีกครั้งภายหลัง",
    });
  }
});

router.get("/bedsdealing/:id", async (req, res) => {
  try {
    const dealingall4 = await Bedsdealing.find({ _id: req.params.id });
    const bedsid = await Beds.find();
    const userid = await User.find();

    let list = [];
    let namell4;
    let bedsinfo;
    for (let y = 0; y < userid.length; y++) {
      if (dealingall4[0].user_id == userid[y]._id + "") {
        namell4 = userid[y];
      }
    }
    for (let z = 0; z < bedsid.length; z++) {
      if (dealingall4[0].bed_id == bedsid[z]._id + "") {
        bedsinfo = bedsid[z];
      }
    }

    list.push({
      _id: dealingall4[0]._id,
      bed_id: dealingall4[0].bed_id,
      user_id: dealingall4[0].user_id,
      date: dealingall4[0].date,
      user: namell4,
      bed: bedsinfo,
    });

    if (list.length === 0) {
      res.status(203).json({ status: false, message: "ไม่มีข้อมูล!" });
    } else {
      res
        .status(200)
        .json({ status: true, message: "การค้นหาสำเร็จ!", info: list });
    }
  } catch (err) {}
});

router.get("/bedsdealingbyusers/:id", async (req, res) => {
  try {
    const dealingbyuser = await Bedsdealing.find({ user_id: req.params.id });
    const userbyuser = await User.find();
    let list = [];

    for (let i = 0; i < dealingbyuser.length; i++) {
      let name;
      for (let y = 0; y < userbyuser.length; y++) {
        if (dealingbyuser[i].user_id == userbyuser[y]._id + "") {
          name = userbyuser[y];
        }
      }
      list.push({
        _id: dealingbyuser[i]._id,
        bed_id: dealingbyuser[i].bed_id,
        user_id: dealingbyuser[i].user_id,
        date: dealingbyuser[i].date,
        user: name,
      });
    }

    if (list.length === 0) {
      res.status(203).json({ status: false, message: "ไม่มีข้อมูล!" });
    } else {
      res.status(203).json({
        status: true,
        message: "การค้นหาสำเร็จ!",
        info: list,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "เกิดข้อผิดพลาดกรุณาลงทะเบียนอีกครั้งภายหลัง",
    });
  }
});

module.exports = router;
