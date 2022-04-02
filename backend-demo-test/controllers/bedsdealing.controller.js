const bedsRepo = require("../repository/beds.repo")
const userRepo = require("../repository/user.repo")
const bedsdealingRepo = require("../repository/bedsdealing.repo")
const { model } = require("mongoose")

const createBedsdealing = async (req, res) => {
  try {
    const newdealing = await bedsdealingRepo.createBedsdealing(
      req.body.date,
      req.body.bed_id,
      req.body.user_id
    )

    const oldBeds = await bedsRepo.findBedsById(req.body.bed_id)

    if (oldBeds.amount === 0) {
      res
        .status(201)
        .json({ status: false, message: "ไม่สามารถจองได้ เนื่องจากเตียงเต็ม" })
    } else {
      const update_Beds = await bedsRepo.updatedBedamount(
        req.body.bed_id,
        oldBeds.amount
      )

      if (oldBeds.amount === 0) {
        res.status(201).json({
          status: false,
          message: "ไม่สามารถจองได้ เนื่องจากเตียงหมด",
        })
      } else {
        const update_Beds = await bedsRepo.updatedBedamount(
          req.body.bed_id,
          oldBeds.amount
        )

        const New_dealing = await newdealing.save()
        res.status(201).json({ status: true, message: "จองสำเร็จ" })
      }
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "เกิดข้อผิดพลาดกรุณาลงทะเบียนอีกครั้งภายหลัง",
    })
  }
}

const getBedsdealingById = async (req, res) => {
  const dealingall4 = await bedsdealingRepo.findBedsdealingById(req.params.id)

  if (dealingall4.length === 0) {
    res.status(203).json({ status: false, message: "ไม่มีข้อมูล!" })
  }

  var list = []
  const bedsid = await bedsRepo.findBedsById(dealingall4.bed_id)
  const userid = await userRepo.findUserById(dealingall4.user_id)

  list.push({
    _id: dealingall4._id,
    bed_id: dealingall4.bed_id,
    user_id: dealingall4.user_id,
    date: dealingall4.date,
    user: userid,
    bed: bedsid,
  })

  if (list.length === 0) {
    res.status(203).json({ status: false, message: "ไม่มีข้อมูล!" })
  } else {
    res
      .status(200)
      .json({ status: true, message: "การค้นหาสำเร็จ!", info: list })
  }
}

const getBedsdealingByUsersId = async (req, res) => {
  try {
    const dealingbyuser = await bedsdealingRepo.findBedsdealingByUserId(
      req.params.id
    )
    const userbyuser = await userRepo.findAllUser()
    let list = []

    for (let i = 0; i < dealingbyuser.length; i++) {
      let name
      for (let y = 0; y < userbyuser.length; y++) {
        if (dealingbyuser[i].user_id == userbyuser[y]._id + "") {
          name = userbyuser[y]
        }
      }
      list.push({
        _id: dealingbyuser[i]._id,
        bed_id: dealingbyuser[i].bed_id,
        user_id: dealingbyuser[i].user_id,
        date: dealingbyuser[i].date,
        user: name,
      })
    }

    if (list.length === 0) {
      res.status(203).json({ status: false, message: "ไม่มีข้อมูล!" })
    } else {
      res.status(203).json({
        status: true,
        message: "การค้นหาสำเร็จ!",
        info: list,
      })
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "เกิดข้อผิดพลาดกรุณาลงทะเบียนอีกครั้งภายหลัง",
    })
  }
}

const getAllBedsdealing = async (req, res) => {
  try {
    const dealingall3 = await bedsdealingRepo.findAllBedsdealing()
    const user = await userRepo.findAllUser()
    let list = []

    for (let i = 0; i < dealingall3.length; i++) {
      let name
      for (let y = 0; y < user.length; y++) {
        if (dealingall3[i].user_id == user[y]._id + "") {
          name = user[y]
        }
      }
      list.push({
        _id: dealingall3[i]._id,
        bed_id: dealingall3[i].bed_id,
        user_id: dealingall3[i].user_id,
        date: dealingall3[i].date,
        user: name,
      })
    }

    if (list.length === 0) {
      res.status(203).json({ status: false, message: "ไม่มีข้อมูล!" })
    } else {
      res
        .status(200)
        .json({ status: true, message: "การค้นหาสำเร็จ!", info: list })
    }
  } catch (err) {}
}

const getBedsdealingByBedsId = async (req, res) => {
  try {
    const dealingbybed = await bedsdealingRepo.findBedsdealingByBedsId(
      req.params.id
    )
    const userbybed = await userRepo.findAllUser()
    let list = []

    for (let i = 0; i < dealingbybed.length; i++) {
      let name
      for (let y = 0; y < userbybed.length; y++) {
        if (dealingbybed[i].user_id == userbybed[y]._id + "") {
          name = userbybed[y]
        }
      }
      list.push({
        _id: dealingbybed[i]._id,
        bed_id: dealingbybed[i].bed_id,
        user_id: dealingbybed[i].user_id,
        date: dealingbybed[i].date,
        user: name,
      })
    }

    if (list.length === 0) {
      res.status(203).json({ status: false, message: "ไม่มีข้อมูล!" })
    } else {
      res.status(203).json({
        status: true,
        message: "การค้นหาสำเร็จ!",
        info: list,
      })
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "เกิดข้อผิดพลาดกรุณาลงทะเบียนอีกครั้งภายหลัง",
    })
  }
}

module.exports = {
  getAllBedsdealing,
  getBedsdealingById,
  getBedsdealingByUsersId,
  getBedsdealingByBedsId,
  createBedsdealing,
}
