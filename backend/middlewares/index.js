const { request } = require("express")
const pool = require("../config/database")
const moment = require("moment")
const colors = require("colors")

async function logger(req, res, next) {
  const timestamp = moment(new Date()).format("Y-MM-DD h:mm:ss a")
  console.log(
    `${timestamp}`.yellow + ` | ` + `${req.method}: ${req.originalUrl}`.inverse
  )
  next()
}

async function isLoggedIn(req, res, next) {
  let authorization = req.headers.authorization

  if (!authorization) {
    return res.status(401).send("คุณยังไม่ได้ลงชื่อเข้าใช้งาน")
  }

  const [tokens] = await pool.query("SELECT * FROM tokens WHERE token = ?", [
    authorization,
  ])
  const token = tokens[0]
  if (!token) {
    return res.status(401).send("คุณยังไม่ได้ลงชื่อเข้าใช้งาน")
  }

  const [[users]] = await pool.query(
    "SELECT id, firstname, lastname, idcard, phone, email, lineid, role FROM users WHERE id = ?",
    [token.user_id]
  )
  req.user = users

  next()
}

module.exports = {
  logger,
  isLoggedIn,
}
