import { mount, shallowMount } from "@vue/test-utils"
import Signin from "@/views/Signin.vue"
import Findbeds from "@/views/Findbeds.vue"
import Home from "@/views/Home.vue"
import Chartdaily from "@/components/Chartdaily.vue"
import Chartstats from "@/components/Chartstats.vue"
import Bedsmanage from "@/views/Bedsmanage.vue"
import Bededit from "@/views/Bededit.vue"
import Bed from "@/views/Bed.vue"
import axios from "axios"

describe("test that signin page have all elements that must be have.", () => {
  const forSignin = mount(Signin)
  it("test that signin page have input element for email and can type data.", () => {
    expect(forSignin.findAll("input").at(0).element.name).toBe("email")
    expect(forSignin.findAll("input").at(0).element.placeholder).toBe("อีเมล")
    forSignin.findAll("input").at(0).setValue("test@gmail.com")
    expect(forSignin.findAll("input").at(0).element.value).toBe(
      "test@gmail.com"
    )
  })
  it("test that signin page have input element for password and can type data.", () => {
    expect(forSignin.findAll("input").at(1).element.name).toBe("password")
    expect(forSignin.findAll("input").at(1).element.placeholder).toBe(
      "รหัสผ่าน"
    )
    forSignin.findAll("input").at(1).setValue("KKK12345678")
    expect(forSignin.findAll("input").at(1).element.value).toBe("KKK12345678")
  })
  it("test that signin page have button element for submit signin", () => {
    expect(forSignin.find("button").element.type).toBe("submit")
    expect(forSignin.find("button").element.innerHTML).toBe(
      " ลงชื่อเข้าเข้าใช้งาน "
    )
  })
})

describe("test that findbeds page have all element that must be have", () => {
  it("test that findbeds page have input element for search beds places and can type data.", () => {
    const forFindBeds = mount(Findbeds)
    expect(forFindBeds.find("input").element.type).toBe("text")
    expect(forFindBeds.find("input").element.placeholder).toBe("ค้นหา")
    forFindBeds.find("input").setValue("กรุงเทพ")
    expect(forFindBeds.find("input").element.value).toBe("กรุงเทพ")
  })
  it("test that findbeds page can display beds place when user search beds place", async () => {
    const forFindBeds = await mount(Findbeds, {
      data() {
        return {
          beds: [
            {
              address:
                "19/49 ซอย สายไหม 15 แขวง สายไหม เขตสายไหม กรุงเทพมหานคร 10220 ประเทศไทย",
              amount: "599",
              distance: 11155.936209906078,
              id: 11,
              lat: "13.9276745",
              lng: "100.6441675",
              state: 1,
              timestamp: "2022-03-21T12:34:24.000Z",
              user_id: 3,
            },
          ],
          isLoading: false,
        }
      },
    })
    forFindBeds.find("input").setValue("กรุงเทพ")
    await expect(forFindBeds.find("#test-bedplace").exists()).toBe(true)
  })
})

describe("test that all Covid - 19 statistic components have all elements that must be have.", () => {
  const mockDaily = []
  jest.spyOn(axios, "get").mockResolvedValue(mockDaily)
  it("test that Chartdaily component have daily graph of Covid - 19 statistic", async () => {
    const dailyChart = await mount(Chartdaily)
    await expect(dailyChart.find("canvas").find("#myChart").exists()).toBe(true)
  })
  it("test that Chartstats component have all static graph of Covid - 19 statistic", async () => {
    const allStatChart = await mount(Chartstats)
    await expect(allStatChart.find("#myChart").exists()).toBe(true)
    await expect(allStatChart.find("#myChart2").exists()).toBe(true)
    await expect(allStatChart.find("#myChart3").exists()).toBe(true)
  })
})

describe("test that Beds Manage page have all elements that must be have.", () => {
  const myBeds = [
    {
      address:
        "108 ซอย โยธา 1 แขวง ตลาดน้อย เขตสัมพันธวงศ์ กรุงเทพมหานคร 10100",
      amount: 299,
      customer_amount: 1,
      id: 50,
      lat: "13.7321154",
      lng: "100.5142296",
      state: "true",
      timestamp: "2022-04-10T08:14:12.000Z",
    },
  ]
  it("test that Beds Manage page have details blogs, edit bed page link button and add bed button.", async () => {
    const bedsManage = await mount(Bedsmanage, {
      data() {
        return {
          beds: myBeds,
        }
      },
    })
    await expect(bedsManage.find("table").exists()).toBe(true)
    await expect(bedsManage.findAll("button").at(2).element.innerHTML).toBe(
      "แก้ไข"
    )
    await expect(bedsManage.findAll("button").at(0).element.innerHTML).toBe(
      "เพิ่มสถานที่"
    )
  })
})
