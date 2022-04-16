const bedsRepo = require("../repository/beds.repo")
const userRepo = require("../repository/user.repo")
const bedsdealingRepo = require("../repository/bedsdealing.repo")

const getBedready = async (req, res) => {
  const bedsready = await bedsRepo.findBedsready()
  const user = await userRepo.findAllUser()
  const list = []

  for (let i = 0; i < bedsready.length; i++) {
    let name
    for (let y = 0; y < user.length; y++) {
      if (bedsready[i].user_id == user[y]._id + "") {
        name = user[y]
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
    })
  }

  if (bedsready.length === 0) {
    res
      .status(203)
      .json({ status: false, message: "ไม่มีเตียงที่พร้อมให้บริการ!" })
  } else {
    res
      .status(200)
      .json({ status: true, message: "การค้นหาสำเร็จ!", info: list })
  }
}

const getBedbyId = async (req, res) => {
  try {
    const bedsid = await bedsRepo.findBedsready(req.params.id)
    const userid = await userRepo.findAllUser()
    var list = []

    let name

    for (let i = 0; i < userid.length; i++) {
      if (bedsid.user_id == userid[i]._id + "") {
        name = userid[i]
      }
    }
    list.push({
      _id: bedsid._id,
      amount: bedsid.amount,
      hno: bedsid.hno,
      no: bedsid.no,
      lane: bedsid.lane,
      district: bedsid.district,
      area: bedsid.area,
      province: bedsid.province,
      zipcode: bedsid.zipcode,
      user_id: bedsid.user_id,
      createdAt: bedsid.createdAt,
      updatedAt: bedsid.updatedAt,
      user: name,
    })

    if (list.length == 0) {
      res.status(203).json({ status: false, message: "ไม่มีข้อมูล!" })
    } else {
      res
        .status(203)
        .json({ status: true, message: "การค้นหาสำเร็จ!", info: list })
    }
  } catch (err) {
    res.status(404).json({
      status: false,
      message: "ไม่มีข้อมูลหรือเกิดข้อผิดพลาดกรุณาลงทะเบียนอีกครั้งภายหลัง",
    })
  }
}

const getBedByUsersId = async (req, res) => {
  try {
    const beds = await bedsRepo.findBedsByUserId(req.params.id)
    const userby = await userRepo.findAllUser()
    const dealing = await bedsdealingRepo.findAllBedsdealing()
    var list = []
    for (let i = 0; i < beds.length; i++) {
      let name
      let datadeal = []
      for (let y = 0; y < userby.length; y++) {
        if (beds[i].user_id == userby[y]._id + "") {
          name = userby[y]
        }
      }
      for (let z = 0; z < dealing.length; z++) {
        if (beds[i]._id == dealing[z].bed_id) {
          datadeal.push(dealing[z])
        }
      }
      list.push({
        _id: beds[i]._id,
        amount: beds[i].amount,
        hno: beds[i].hno,
        no: beds[i].no,
        lane: beds[i].lane,
        district: beds[i].district,
        area: beds[i].area,
        province: beds[i].province,
        zipcode: beds[i].zipcode,
        user_id: beds[i].user_id,
        createdAt: beds[i].createdAt,
        updatedAt: beds[i].updatedAt,
        user: name,
        bedsdealing: datadeal,
      })
    }

    if (list.length === 0) {
      res.status(203).json({ status: false, message: "ไม่มีข้อมูล!" })
    } else {
      res.status(203).json({
        status: true,
        message: "การค้นหาสำเร็จ!",
        info: { bed: list },
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
  getBedready,
  getBedbyId,
  getBedByUsersId,
}
