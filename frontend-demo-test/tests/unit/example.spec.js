import { mount, shallowMount } from "@vue/test-utils"
import Login from "@/pages/login.vue"

describe("Login", () => {
  test("Should render title", () => {
    const wrapper = mount(Login)
    const title = wrapper.find(['[data-test="title"]'])
    expect(title.text()).toEqual("ลงชื่อเข้าใช้งาน")
  })

  test("Should have 1 button", () => {
    const wrapper = mount(Login)
    const button = wrapper.findAll("button")
    expect(button).toHaveLength(1)
  })
})
