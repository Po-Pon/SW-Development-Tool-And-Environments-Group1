const router = require("express").Router()
const User = require("../models/User")
const authRepo = require("../repository/auth.repo")
const CryptoJS = require("crypto-js")

const userRegister = async (req, res) => {
  try {
    const user = await authRepo.findUserByEmail(req.body.email)
    const idCard = await authRepo.findIdcard(req.body.idcard)

    const newUser = await new User({
      email: req.body.email,
      pass: CryptoJS.AES.encrypt(
        req.body.pass,
        process.env.PASS_SEC
      ).toString(),
      fname: req.body.fname,
      lname: req.body.lname,
      idcard: req.body.idcard,
      lineid: req.body.lineid,
      phone: req.body.phone,
    })

    if (user) {
      res.status(203).json({ status: false, message: "อีเมลนี้เคยมีถูกใช้ซ้ำ" })
    } else if (idCard) {
      res
        .status(203)
        .json({ status: false, message: "เลขบัตรประจำตัวตัวมีการใช้ซ้ำ" })
    } else {
      // save user and respond
      const New_User = await newUser.save()
      res.status(201).json({ status: true, message: "ลงทะเบียนสำเร็จ!" })
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "เกิดข้อผิดพลาดกรุณาลงทะเบียนอีกครั้งภายหลัง",
    })
  }
}

const userLogin = async (req, res) => {
  try {
    const user = await authRepo.findUserByEmail(req.body.email)
    if (!user) {
      res.status(203).json({
        status: false,
        message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง",
      })
    } else {
      const hashedPass = CryptoJS.AES.decrypt(user.pass, process.env.PASS_SEC)
      const pass = hashedPass.toString(CryptoJS.enc.Utf8)

      if (pass !== req.body.pass) {
        res.status(203).json({
          status: false,
          message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง",
        })
      } else {
        // const accessToken = jwt.sign({
        //     id: user._id,
        // }, process.env.JWT_SEC,
        // {expiresIn: "3d"}
        // );

        const { pass, ...others } = user._doc
        res.status(200).json({
          status: true,
          message: "เข้าสู่ระบบสำเร็จ",
          info: { ...others },
        })
        // res.status(200).json({"status": true, "message": "เข้าสู่ระบบสำเร็จ", "info": {...others, accessToken}});
      }
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "เกิดข้อผิดพลาดกรุณาลงทะเบียนอีกครั้งภายหลัง",
    })
  }
}

module.exports = {
  userRegister,
  userLogin,
}
