// https://docs.cypress.io/api/table-of-contents

describe("Bestbeds - E2E Test", () => {
  const usersForSignin = [
    {
      email: "akira.ajeyb@gmail.com",
      password: "123456",
      firstname: "อคิราภ์",
      lastname: "สีแสนยง",
    },
  ]
  usersForSignin.forEach((user, index) => {
    it("signin page.", () => {
      cy.visit("http://159.65.12.177:6480/signin")
      cy.get(":nth-child(1) > .form-control").type(user.email)
      cy.get(":nth-child(2) > .form-control").type(user.password)
      cy.get(".btn").click()
      cy.get(".navbar-toggler-icon").wait(2000).click() // After Signin
      cy.get(":nth-child(6) > .nav-link").click()
      cy.get(".btn-close").click()
      cy.get(":nth-child(1) > .form-control").should(
        "have.value",
        user.firstname
      )
      cy.get(".row > :nth-child(2) > .form-control").should(
        "have.value",
        user.lastname
      )
    })
  })

  const usersForAddBed = [
    {
      email: "akira.ajeyb@gmail.com",
      password: "123456",
      firstname: "อคิราภ์",
      lastname: "สีแสนยง",
      amount: 69,
    },
  ]
  usersForAddBed.forEach((user, index) => {
    it("input data for beds reservation.", () => {
      cy.visit("http://159.65.12.177:6480/signin")
      cy.get(":nth-child(1) > .form-control").type(user.email)
      cy.get(":nth-child(2) > .form-control").type(user.password)
      cy.get(".btn").click()
      cy.get(".navbar-toggler-icon").wait(2000).click() // After Signin
      cy.get(":nth-child(7) > .nav-link").click()
      cy.get(".btn-close").click()
      cy.get(".mb-3 > a > .btn").click()
      cy.get("form > :nth-child(1) > .form-control").clear().type(user.amount)
      cy.get("form > :nth-child(1) > .form-control").should(
        "have.value",
        user.amount
      )
    })
  })

  const usersForFindBed = [
    {
      email: "test@gmail.com",
      password: "123456",
      firstname: "หยาง",
      lastname: "จื้อเทียน",
    },
  ]
  usersForFindBed.forEach((user, index) => {
    it("reach find bed places.", () => {
      cy.visit("http://159.65.12.177:6480/signin")
      cy.get(":nth-child(1) > .form-control").type(user.email)
      cy.get(":nth-child(2) > .form-control").type(user.password)
      cy.get(".btn").click()
      cy.get(".navbar-toggler-icon").wait(2000).click() // After Signin
      cy.get(":nth-child(2) > .nav-link").click()
      cy.get(".btn-close").click()
    })
  })

  const usersForToggleBed = [
    {
      email: "akira.ajeyb@gmail.com",
      password: "123456",
      firstname: "อคิราภ์",
      lastname: "สีแสนยง",
      title: "จัดการสถานที่",
    },
  ]
  usersForToggleBed.forEach((user, index) => {
    it("reach bed places management page.", () => {
      cy.visit("http://159.65.12.177:6480/signin")
      cy.get(":nth-child(1) > .form-control").type(user.email)
      cy.get(":nth-child(2) > .form-control").type(user.password)
      cy.get(".btn").click()
      cy.get(".navbar-toggler-icon").wait(2000).click() // After Signin
      cy.get(":nth-child(7) > .nav-link").click()
      cy.get(".btn-close").click()
    })
  })

  const usersForBeds = [
    {
      email: "akira.ajeyb@gmail.com",
      password: "123456",
      firstname: "อคิราภ์",
      lastname: "สีแสนยง",
      title: "การจองเตียง",
    },
  ]
  usersForBeds.forEach((user, index) => {
    it("reach bed reservation page.", () => {
      cy.visit("http://159.65.12.177:6480/signin")
      cy.get(":nth-child(1) > .form-control").type(user.email)
      cy.get(":nth-child(2) > .form-control").type(user.password)
      cy.get(".btn").click()
      cy.get(".navbar-toggler-icon").wait(2000).click() // After Signin
      cy.get(":nth-child(3) > .nav-link").click()
      cy.get(".btn-close").click()
    })
  })

  const usersForProfile = [
    {
      email: "akira.ajeyb@gmail.com",
      password: "123456",
      firstname: "อคิราภ์",
      lastname: "สีแสนยง",
      title: "ข้อมูลผู้ใช้",
    },
  ]
  usersForProfile.forEach((user, index) => {
    it("reach profile page.", () => {
      cy.visit("http://159.65.12.177:6480/signin")
      cy.get(":nth-child(1) > .form-control").type(user.email)
      cy.get(":nth-child(2) > .form-control").type(user.password)
      cy.get(".btn").click()
      cy.get(".navbar-toggler-icon").wait(2000).click() // After Signin
      cy.get(":nth-child(6) > .nav-link").click()
      cy.get(".btn-close").click()
    })
  })

  const usersForHome = [
    {
      email: "akira.ajeyb@gmail.com",
      password: "123456",
      firstname: "อคิราภ์",
      lastname: "สีแสนยง",
      title: "ค้นหาเตียง",
    },
  ]
  usersForHome.forEach((user, index) => {
    it("reach daily COVID-19 page", () => {
      cy.visit("http://159.65.12.177:6480/signin")
      cy.get(":nth-child(1) > .form-control").type(user.email)
      cy.get(":nth-child(2) > .form-control").type(user.password)
      cy.get(".btn").click()
    })
  })
})
