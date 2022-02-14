const Bedsdealing = require("../models/Bedsdealing");
const Beds = require("../models/Beds");
const router = require("express").Router();



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

module.exports = router;