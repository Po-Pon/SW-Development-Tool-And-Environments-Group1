/// <reference types="cypress" />

describe("ทดสอบช่องเลือกจังหวัด ในหน้าค้นหาเตียง", () => {
  it("ทำการ login และเข้าสู่หน้าค้นหาเตียง เพื่อทดสอบช่องเลือกจังหวัดสามารถใช้งานได้จริงหรือไม่", () => {
    cy.visit("/login")
    cy.get('[type="email"]')
      .type("test@gmail.com")
      .should("have.value", "test@gmail.com")
    cy.get('[type="password"]')
      .type("Passw0rd")
      .should("have.value", "Passw0rd")
    cy.get(".btn").click()
    cy.url().should("include", "/")
    cy.get(":nth-child(1) > a > .btn").click()

    cy.get(".form-select").select("กรุงเทพฯ").should("have.value", "กรุงเทพฯ")
    cy.get(":nth-child(3) > .btn").click()
    cy.get(".col-10 > :nth-child(1)").should("contain.text", "กรุงเทพฯ")
  })
})
