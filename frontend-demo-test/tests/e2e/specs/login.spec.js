/// <reference types="cypress" />

describe("ทดสอบการทำงานของช่องกรอก Email และรหัสผ่านในระบบ login", () => {
  it("ทำการ login โดยการใส่รหัสผ่านผิด เพื่อทดสอบการ validate", () => {
    cy.visit("/login")
    cy.get('[type="email"]')
      .type("fake@gmail.com")
      .should("have.value", "fake@gmail.com")
    cy.get('[type="password"]')
      .type("fakepassword")
      .should("have.value", "fakepassword")
    cy.get(".btn").click()
  })

  it("ทำการ login โดยการใส่ Email และรหัสผ่านผิด เพื่อทดสอบการ validate", () => {
    cy.visit("/login")
    cy.get('[type="email"]').type("fake@.com").should("have.value", "fake@.com")
    cy.get('[type="password"]')
      .type("fakepassword")
      .should("have.value", "fakepassword")
    cy.get(".btn").click()
  })

  it("ทำการ login โดยการใส่ Email และรหัสผ่านถูกต้อง เพื่อทดสอบว่า login ได้จริงหรือไม่", () => {
    cy.visit("/login")
    cy.get('[type="email"]')
      .type("test@gmail.com")
      .should("have.value", "test@gmail.com")
    cy.get('[type="password"]')
      .type("Passw0rd")
      .should("have.value", "Passw0rd")
    cy.get(".btn").click()
    cy.url().should("include", "/")
  })
})
