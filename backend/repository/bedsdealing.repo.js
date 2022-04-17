const pool = require("../config/database")

const selectBedsdealingById = async (bedsdealing_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [[bedsdealing]] = await conn.query(
      `SELECT * FROM bedsdealing WHERE id = ?`,
      [bedsdealing_id]
    )
    conn.commit()
    return bedsdealing
  } catch (err) {
    conn.rollback()
    return
  } finally {
    conn.release()
  }
}

const updateBedsdealing = async (bedsdealing_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    await conn.query(`UPDATE bedsdealing SET state=1 WHERE id = ?`, [
      bedsdealing_id,
    ])
    conn.commit()
    return {
      status: true,
      message: "ยืนยันผู้ใช้เข้าพักสำเร็จ",
    }
  } catch (err) {
    conn.rollback()
    return {
      status: false,
      message: err.toString(),
    }
  } finally {
    conn.release()
  }
}

const customerBedsdealing = async (bed_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [customer] = await conn.query(
      `SELECT 
                bedsdealing.id AS 'bedsdealing_id',
                bedsdealing.state,
                bedsdealing.date,
                bedsdealing.timestamp,
                users.firstname,
                users.lastname,
                users.phone,
                users.email,
                users.lineid
                FROM bedsdealing
                INNER JOIN users ON bedsdealing.user_id = users.id
                WHERE bedsdealing.bed_id = ?`,
      [bed_id]
    )
    conn.commit()
    return {
      status: true,
      message: "เรียกข้อมูลสำเร็จ",
      customers: customer,
    }
  } catch (err) {
    conn.rollback()
    return {
      status: false,
      message: err.toString(),
    }
  } finally {
    conn.release()
  }
}

const bedsdealingByUserId = async (user_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [bedsdealing] = await conn.query(
      `SELECT 
                bedsdealing.id AS 'beddealings_id',
                bedsdealing.date,
                bedsdealing.state,
                bedsdealing.timestamp,
                beds.id AS 'beds_id',
                beds.amount,
                beds.address,
                beds.state AS 'beds_state',
                users.id AS 'users_id',
                users.firstname,
                users.lastname,
                users.phone,
                users.email,
                users.lineid
                FROM bedsdealing
                INNER JOIN beds ON bedsdealing.bed_id = beds.id
                INNER JOIN users ON beds.user_id = users.id
                WHERE bedsdealing.user_id = ?`,
      [user_id]
    )
    conn.commit()
    return {
      status: true,
      message: "เรียกข้อมูลสำเร็จ",
      bedsdealing: bedsdealing,
    }
  } catch (err) {
    conn.rollback()
    return {
      status: false,
      message: err.toString(),
    }
  } finally {
    conn.release()
  }
}

const selectBedsdealingBedIdByBedId = async (bed_id, user_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [bedsdealing] = await conn.query(
      "SELECT bed_id FROM bedsdealing WHERE bed_id = ? AND user_id = ?",
      [bed_id, user_id]
    )
    conn.commit()
    return bedsdealing
  } catch (err) {
    conn.rollback()
  } finally {
    conn.release()
  }
}

const insertBedsdealing = async (date, bed_id, user_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    await conn.query(
      "INSERT INTO bedsdealing(date, bed_id, user_id) VALUES (?, ?, ?)",
      [date, bed_id, user_id]
    )
    conn.commit()
    return {
      status: true,
      message: "ดำเนินการจองสำเร็จ",
    }
  } catch (err) {
    conn.rollback()
    return {
      status: false,
      message: err.toString(),
    }
  } finally {
    conn.release()
  }
}

const selectBedsdealingByBedId = async (bed_id) => {
  const conn = await pool.getConnection()
  return conn.query("SELECT * FROM bedsdealing WHERE bed_id = ?", [bed_id])
}

module.exports = {
  selectBedsdealingById,
  updateBedsdealing,
  customerBedsdealing,
  bedsdealingByUserId,
  selectBedsdealingBedIdByBedId,
  insertBedsdealing,
  selectBedsdealingByBedId,
}
