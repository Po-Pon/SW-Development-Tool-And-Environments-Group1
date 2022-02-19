const User = require("../models/User");
const router = require("express").Router();

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res
        .status(203)
        .json({ status: false, message: "ไอดีที่เรียกไม่ถูกต้อง" });
    } else {
      res
        .status(201)
        .json({ status: true, message: "ไอดีที่เรียกถูกต้อง", info: user });
    }
    // res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;