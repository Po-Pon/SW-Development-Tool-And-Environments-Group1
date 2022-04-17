const pool = require("../config/database")

const selectBedsReady = async () => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [beds] = await conn.query(
      "SELECT * FROM beds WHERE amount > 0 AND state = 1"
    )
    conn.commit()
    return {
      status: true,
      message: "ค้นหาข้อมูลสำเร็จ",
      beds: beds,
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

const selectBedsSearch = async (search) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    const [beds] = await conn.query(
      "SELECT * FROM beds WHERE amount > 0 AND state = 1 AND address LIKE ?",
      [search]
    )
    conn.commit()
    return {
      status: true,
      message: "ค้นหาข้อมูลสำเร็จ",
      beds: beds,
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

const deleteBedById = async (bed_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    const [bedsdealing] = await conn.query(
      `SELECT * FROM bedsdealing WHERE bed_id = ?`,
      [bed_id]
    )

    if (bedsdealing.length > 0) {
      return {
        status: false,
        message: "ไม่สามารถลบได้เนื่องจากมีผู้เข้าจองแล้ว",
      }
    }
    await conn.query("DELETE FROM beds WHERE id = ?", [bed_id])
    conn.commit()
    return {
      status: true,
      message: "ลบข้อมูลแล้ว",
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

const updateBedsAddress = async (address, lat, lng, bed_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    await conn.query("UPDATE beds SET address=?, lat=?, lng=? WHERE id = ?", [
      address,
      lat,
      lng,
      bed_id,
    ])
    conn.commit()
    return {
      status: true,
      message: "เปลี่ยนที่อยู่สถานที่สำเร็จ",
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

const updateBedsAmount = async (amount, bed_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    await conn.query("UPDATE beds SET amount=? WHERE id = ?", [amount, bed_id])
    conn.commit()
    return {
      status: true,
      message: "เปลี่ยนจำนวนเตียงสำเร็จ",
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

const selectBedsDetail = async (bed_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    const [[bed]] = await conn.query(
      `SELECT 
      beds.id, beds.amount, beds.address, beds.lat, beds.lng, beds.state, beds.user_id, beds.timestamp, 
      users.firstname, users.lastname, users.idcard, users.phone, users.email, users.lineid
      FROM beds INNER JOIN users ON user_id=users.id WHERE beds.id = ?;`,
      [bed_id]
    )
    conn.commit()
    return {
      status: true,
      message: "เรียกข้อมูลสำเร็จ",
      bed: bed,
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

const updateBedsState = async (state, bed_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    await conn.query("UPDATE beds SET state=? WHERE id = ?", [state, bed_id])

    conn.commit()
    return {
      status: true,
      message: "เปลี่ยนสถานะเตียงสำเร็จ",
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

const selectBedsByUser = async (user_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    const [beds] = await conn.query(
      `SELECT 
      beds.id AS 'id',
      beds.amount,
      beds.address,
      beds.lat,
      beds.lng,
      beds.state,
      beds.timestamp,
      COUNT(bedsdealing.id) AS 'customer_amount'
      FROM beds
      LEFT JOIN bedsdealing ON beds.id = bedsdealing.bed_id
      WHERE beds.user_id = ?
      GROUP BY beds.id`,
      [user_id]
    )
    conn.commit()
    return {
      status: true,
      message: "เรียกข้อมูลสำเร็จ",
      beds: beds,
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

const insertBed = async (amount, address, lat, lng, user_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    await conn.query(
      "INSERT INTO beds(amount, address, lat, lng, user_id) VALUES (?, ?, ?, ?, ?)",
      [amount, address, lat, lng, user_id]
    )
    conn.commit()
    return {
      status: true,
      message: "เพิ่มสถานที่สำเร็จ",
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

const selectBedById = async (bed_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [[bed]] = await conn.query(`SELECT * FROM beds WHERE id = ?`, [
      bed_id,
    ])
    conn.commit()
    return bed
  } catch (err) {
    conn.rollback()
    return
  } finally {
    conn.release()
  }
}

const selectBedAmount = async (bed_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [[bed]] = await conn.query(
      "SELECT id, amount, state FROM beds WHERE id = ?",
      [bed_id]
    )
    conn.commit()
    return bed
  } catch (err) {
    conn.rollback()
  } finally {
    conn.release()
  }
}

const reduceBedAmount = async (amount, bed_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    await conn.query("UPDATE beds SET amount=? WHERE id = ?", [
      amount - 1,
      bed_id,
    ])
    conn.commit()
  } catch (err) {
    conn.rollback()
  } finally {
    conn.release()
  }
}

module.exports = {
  selectBedsReady,
  selectBedsSearch,
  deleteBedById,
  updateBedsAddress,
  updateBedsAmount,
  selectBedsDetail,
  updateBedsState,
  selectBedsByUser,
  insertBed,
  selectBedById,
  selectBedAmount,
  reduceBedAmount,
}