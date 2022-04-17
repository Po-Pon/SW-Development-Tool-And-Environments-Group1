import { dateConverter } from "./dateConverter"
import { deg2rad } from "./deg2rad"
import { getDistanceFromLatLonInKm } from "./getDistanceFromLatLonInKm"

describe("Test to convert date to Thai format.", () => {
  for (let i = 1; i <= 31; i++) {
    test(`Enter day ${i}.`, () => {
      let initialDate = new Date("12/31/2021")
      let newDate = initialDate.setDate(initialDate.getDate() + i)
      expect(dateConverter(newDate)).toBe(`${i} มกราคม 2022`)
    })
  }
  const month = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ]
  for (let i = 1; i <= 12; i++) {
    test(`Enter Month ${month[i - 1]}.`, () => {
      let initialDate = new Date("12/01/2021")
      let newDate = initialDate.setMonth(initialDate.getMonth() + i)
      expect(dateConverter(newDate)).toBe(`1 ${month[i - 1]} 2022`)
    })
  }

  for (let i = 1; i <= 52; i++) {
    test(`Enter Year ${1969 + i}.`, () => {
      let initialDate = new Date("01/01/1969")
      let newDate = initialDate.setFullYear(initialDate.getFullYear() + i)
      expect(dateConverter(newDate)).toBe(`1 มกราคม ${1969 + i}`)
    })
  }
})

describe("Test convert degrees to radians.", () => {
  test("Enter 0 degrees.", () => {
    expect(deg2rad(0)).toBe(0)
  })
  test("Enter 90 degrees.", () => {
    expect(deg2rad(90)).toBe(1.5707963267948966)
  })
  test("Enter 180 degrees.", () => {
    expect(deg2rad(180)).toBe(3.141592653589793)
  })
  test("Enter 360 degrees.", () => {
    expect(deg2rad(360)).toBe(6.283185307179586)
  })
})

describe("Test getDistanceFromLatLonInKm.", () => {
  test("Enter Lat1 0 Lon1 0 Lat2 0 Lon2 0.", () => {
    expect(getDistanceFromLatLonInKm(0, 0, 0, 0)).toBe(0)
  })
  test("Enter Lat1 0 Lon1 0 Lat2 0 Lon2 90.", () => {
    expect(getDistanceFromLatLonInKm(0, 0, 0, 90)).toBe(10007.543398010286)
  })
  test("Enter Lat1 0 Lon1 0 Lat2 0 Lon2 180.", () => {
    expect(getDistanceFromLatLonInKm(0, 0, 0, 180)).toBe(20015.086796020572)
  })
  test("Enter Lat1 0 Lon1 0 Lat2 0 Lon2 360.", () => {
    expect(getDistanceFromLatLonInKm(0, 0, 0, 360)).toBe(1.5604449514735574e-12)
  })
})
