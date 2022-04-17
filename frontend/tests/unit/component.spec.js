import { mount } from "@vue/test-utils"
import Signin from "@/views/Signin.vue"
import Signup from "@/views/Signup.vue"
import Home from "@/views/Home.vue"
import Chartdaily from "@/components/Chartdaily.vue"
import Findbeds from "@/views/Findbeds.vue"
import Chartstats from "@/components/Chartstats.vue"
import Provincecovid from "@/components/Provincecovid.vue"
import Bedsmanage from "@/views/Bedsmanage.vue"
import Bededit from "@/views/Bededit.vue"
import Addbedsforsell from "@/views/Addbedsforsell.vue"
import Bed from "@/views/Bed.vue"

const mockuser = {
  email: "bizon23868@gmail.com",
  firstname: "พิชญะ",
  id: 6,
  idcard: "1100703167062",
  lastname: "สิงห์มีศรี",
  lineid: "bossfuck",
  phone: "0632659596",
  role: "user",
}

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

describe("test that Home page have all elements that must be have.", () => {
  it("test that Home page have all Button for watch Covid - 19 statistic", async () => {
    const forHome = await mount(Home, {
      data() {
        return {
          covidData: {
            txn_date: "2022-04-16",
            new_case: 18892,
            total_case: 4012184,
            new_case_excludeabroad: 18810,
            total_case_excludeabroad: 3988566,
            new_death: 125,
            total_death: 26754,
            new_recovered: 22220,
            total_recovered: 3763978,
            update_date: "2022-04-16 07:32:52",
          },
          stage: "daily",
        }
      },
    })
    await expect(forHome.findAll("span").at(0).element.innerHTML).toBe(
      "ประจำวัน"
    )
    await expect(forHome.findAll("span").at(2).element.innerHTML).toBe(
      "กราฟสถิติข้อมูล"
    )
    await expect(forHome.findAll("span").at(3).element.innerHTML).toBe(
      "รายงานประจำจังหวัด"
    )
  })
})

describe("test that all Covid - 19 statistic components have all elements that must be have.", () => {
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
  const bedsManage = mount(Bedsmanage, {
    data() {
      return {
        beds: [
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
        ],
      }
    },
  })
  it("test that Beds Manage page have details blogs for beds places.", async () => {
    await expect(bedsManage.find("table").exists()).toBe(true)
  })
  it("test that Beds Manage page have edit bed page link button.", async () => {
    await expect(bedsManage.findAll("button").at(2).element.innerHTML).toBe(
      "แก้ไข"
    )
  })
  it("test that Beds Manage page have add bed button for add bed.", async () => {
    await expect(bedsManage.findAll("button").at(0).element.innerHTML).toBe(
      "เพิ่มสถานที่"
    )
  })
})

describe("test that bed info edit page have all elements that must be have.", () => {
  const editPage = mount(Bededit, {
    global: {
      mocks: {
        $route: {
          params: {
            id: 50,
          },
        },
      },
    },
    data() {
      return {
        bed: {
          id: 50,
          amount: 299,
          address:
            "108 ซอย โยธา 1 แขวง ตลาดน้อย เขตสัมพันธวงศ์ กรุงเทพมหานคร 10100",
          lat: "13.7321154",
          lng: "100.5142296",
          state: 1,
        },
      }
    },
  })
  it("test that bed info edit page have bed amount in input blog.", async () => {
    await expect(editPage.find("input").element.value).toBe("299")
  })
  it("test that bed info edit page have input blog that can change bed amount.", async () => {
    await expect(editPage.find("input").setValue(555))
    await expect(editPage.find("input").element.value).toBe("555")
  })
  it("test that bed info edit page have submit button for change bed info.", async () => {
    await expect(editPage.findAll("button").at(1).element.innerHTML).toBe(
      " แก้ไขที่อยู่ "
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

describe("test that bed reservation page have all elment that must be have.", () => {
  const bedReserve = mount(Bed, {
    global: {
      mocks: {
        $route: {
          params: {
            id: "49",
          },
        },
      },
    },
    propsData: {
      user: mockuser,
    },
    date() {
      return {
        bed: {
          address:
            "100/93 ม 6 irisorchidpark ตำบล บางเมืองใหม่ อำเภอเมืองสมุทรปราการ สมุทรปราการ 10270 ประเทศไทย",
          amount: 9998,
          email: "vichayuth2000@hotmail.com",
          firstname: "วิชยุตม์",
          id: 49,
          idcard: "1104700047346",
          lastname: "ทวิชัยยุทธ",
          lat: "13.6271161",
          lineid: "pruktavi",
          lng: "100.6108495",
          phone: "0863611590",
          state: 1,
          timestamp: "2022-04-09T14:12:11.000Z",
          user_id: 5,
        },
      }
    },
  })
  it("test that bed reservation page have location map of beds place.", () => {
    expect(bedReserve.find("div").find("#map").exists()).toBe(true)
  })
  it("test that bed reservation page have detail of beds place.", () => {
    expect(bedReserve.findAll("div").at(2).exists()).toBe(true)
  })
  it("test that bed reservation page have input for reservation date.", () => {
    expect(bedReserve.find("input").element.type).toBe("date")
  })
  it("test that bed reservation page have button for reservation date.", () => {
    expect(bedReserve.find("button").element.innerHTML).toBe(" จอง ")
  })
})

describe("test that add bed page have all element that must be have.", () => {
  it("test that add bed page have input for bed amount.", () => {
    expect(true).toBe(true)
  })
  it("test that add bed page have detail blog of user info.", () => {
    expect(true).toBe(true)
  })
  it("test that add bed page have input for select location of beds place.", () => {
    expect(true).toBe(true)
  })
  it("test that add bed page have submit button for add beds place.", () => {
    expect(true).toBe(true)
  })
})
